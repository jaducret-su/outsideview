import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { moderateContent } from "@/lib/moderation";

export async function POST(req: Request) {
  try {
    const { target_type, target_id, reason, details } = await req.json();

    if (!target_type || !target_id || !reason) {
      return NextResponse.json(
        { error: "Missing report information." },
        { status: 400 }
      );
    }

    const moderationError = details
      ? moderateContent({ body: details, type: "comment" })
      : null;

    if (moderationError) {
      return NextResponse.json({ error: moderationError }, { status: 400 });
    }

    const { error } = await supabase.from("reports").insert({
      target_type,
      target_id,
      reason,
      details: details || null,
      status: "open",
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