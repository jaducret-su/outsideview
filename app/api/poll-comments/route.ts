import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { moderateContent } from "@/lib/moderation";

export async function POST(req: Request) {
  try {
    const { post_id, body, anon_id, anon_name, anon_avatar } = await req.json();

    if (!post_id || !body || !anon_id) {
      return NextResponse.json(
        { error: "Missing poll comment information." },
        { status: 400 }
      );
    }

    const moderationError = moderateContent({
      body,
      type: "poll_comment",
    });

    if (moderationError) {
      return NextResponse.json({ error: moderationError }, { status: 400 });
    }

    const { error } = await supabase.from("poll_comments").insert({
      post_id,
      body,
      anon_id,
      anon_name,
      anon_avatar,
      status: "active",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}