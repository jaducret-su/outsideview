import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { commentId } = await req.json();

    const { data: comment } = await supabase
      .from("poll_comments")
      .select("anon_id, changed_perspective")
      .eq("id", commentId)
      .single();

    if (!comment) {
      return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    }

    if (!comment.changed_perspective) {
      await supabase
        .from("poll_comments")
        .update({ changed_perspective: true })
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
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}