import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { moderateContent } from "@/lib/moderation";

export async function POST(req: Request) {
  try {
    const { post_id, body, perspective_tag, anon_id, anonymous_name, anon_avatar } =
      await req.json();

    if (!post_id || !body || !anon_id || !anonymous_name) {
      return NextResponse.json(
        { error: "Missing perspective information." },
        { status: 400 }
      );
    }

    const moderationError = moderateContent({
      body,
      type: "comment",
    });

    if (moderationError) {
      return NextResponse.json({ error: moderationError }, { status: 400 });
    }

    await supabase.from("anon_profiles").upsert({
      anon_id,
      anon_name: anonymous_name,
      anon_avatar,
    });

    const { error } = await supabase.from("comments").insert({
      post_id,
      body,
      anonymous_name,
      anon_id,
      anon_avatar,
      helpful_count: 0,
      perspective_tag: perspective_tag || null,
      changed_perspective: false,
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