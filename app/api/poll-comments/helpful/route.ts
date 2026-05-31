import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { commentId } = await req.json();

    const { data: comment, error: fetchError } = await supabase
      .from("poll_comments")
      .select("helpful_count, anon_id")
      .eq("id", commentId)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    await supabase
      .from("poll_comments")
      .update({ helpful_count: (comment.helpful_count || 0) + 1 })
      .eq("id", commentId);

    if (comment.anon_id) {
      const { data: profile } = await supabase
        .from("anon_profiles")
        .select("helpful_perspectives")
        .eq("anon_id", comment.anon_id)
        .single();

      await supabase
        .from("anon_profiles")
        .update({
          helpful_perspectives: (profile?.helpful_perspectives || 0) + 1,
        })
        .eq("anon_id", comment.anon_id);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}