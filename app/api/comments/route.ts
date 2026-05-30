import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function checkBasicModeration(body: string) {
  const text = body.toLowerCase();

  const blocked = ["kill yourself", "kys", "dox", "phone number is", "address is"];
  const spam = ["http://", "https://", "www.", "crypto giveaway", "free money"];

  if (body.length > 1500) return "Please keep perspectives under 1,500 characters.";
  if (body.length < 10) return "Please write a more thoughtful perspective.";
  if (blocked.some((word) => text.includes(word))) return "This perspective appears harmful or identifying.";
  if (spam.some((word) => text.includes(word))) return "This perspective looks like spam or promotion.";

  return null;
}

export async function POST(req: Request) {
  try {
    const { post_id, body, perspective_tag, anon_id, anonymous_name, anon_avatar } = await req.json();

    if (!post_id || !body || !anon_id || !anonymous_name) {
      return NextResponse.json({ error: "Missing perspective information." }, { status: 400 });
    }

    const moderationError = checkBasicModeration(body);
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
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}