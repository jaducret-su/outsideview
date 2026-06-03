import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { commentId, anonId } = await req.json();

    if (!commentId || !anonId) {
      return NextResponse.json(
        { error: "Missing comment or anonymous identity." },
        { status: 400 }
      );
    }

    const { data: existingVote } = await supabase
      .from("comment_changed_votes")
      .select("id")
      .eq("comment_id", commentId)
      .eq("anon_id", anonId)
      .maybeSingle();

    if (existingVote) {
      const { data: comment } = await supabase
        .from("comments")
        .select("changed_perspective_count")
        .eq("id", commentId)
        .single();

      return NextResponse.json({
        success: true,
        alreadyVoted: true,
        count: comment?.changed_perspective_count || 0,
      });
    }

    const { error: voteError } = await supabase
      .from("comment_changed_votes")
      .insert({
        comment_id: commentId,
        anon_id: anonId,
      });

    if (voteError) {
      return NextResponse.json({ error: voteError.message }, { status: 500 });
    }

    const { data: comment, error: commentError } = await supabase
      .from("comments")
      .select("changed_perspective_count, anon_id")
      .eq("id", commentId)
      .single();

    if (commentError || !comment) {
      return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    }

    const newCount = (comment.changed_perspective_count || 0) + 1;

    await supabase
      .from("comments")
      .update({
        changed_perspective: true,
        changed_perspective_count: newCount,
      })
      .eq("id", commentId);

    if (comment.anon_id) {
      const { data: profile } = await supabase
        .from("anon_profiles")
        .select("changed_perspectives")
        .eq("anon_id", comment.anon_id)
        .single();

      await supabase
        .from("anon_profiles")
        .update({
          changed_perspectives: (profile?.changed_perspectives || 0) + 1,
        })
        .eq("anon_id", comment.anon_id);
    }

    return NextResponse.json({
      success: true,
      alreadyVoted: false,
      count: newCount,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}