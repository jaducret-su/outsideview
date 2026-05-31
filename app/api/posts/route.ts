import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { moderateContent } from "@/lib/moderation";

function guessCategory(text: string) {
  const lower = text.toLowerCase();

  if (lower.includes("job") || lower.includes("career") || lower.includes("work")) return "Career";
  if (lower.includes("school") || lower.includes("college") || lower.includes("class")) return "School";
  if (lower.includes("friend") || lower.includes("dating") || lower.includes("relationship")) return "Relationships";
  if (lower.includes("family") || lower.includes("parent") || lower.includes("sibling")) return "Family";
  if (lower.includes("anxious") || lower.includes("stress") || lower.includes("mental")) return "Wellbeing";

  return "Life";
}

export async function POST(req: Request) {
  try {
    const {
      title,
      body,
      perspective_request,
      life_stage,
      is_weekly_reflection,
      poll_question,
      poll_option_a,
      poll_option_b,
      anon_id,
      anonymous_name,
      anon_avatar,
    } = await req.json();

    if (!title || !body || !anon_id || !anonymous_name) {
      return NextResponse.json(
        { error: "Missing required post information." },
        { status: 400 }
      );
    }

    const moderationError = moderateContent({
      title,
      body,
      type: "post",
    });

    if (moderationError) {
      return NextResponse.json({ error: moderationError }, { status: 400 });
    }

    if (poll_question || poll_option_a || poll_option_b) {
      const pollText = `${poll_question || ""} ${poll_option_a || ""} ${poll_option_b || ""}`;

      const pollModerationError = moderateContent({
        body: pollText,
        type: "poll_comment",
      });

      if (pollModerationError) {
        return NextResponse.json(
          { error: `Poll issue: ${pollModerationError}` },
          { status: 400 }
        );
      }
    }

    await supabase.from("anon_profiles").upsert({
      anon_id,
      anon_name: anonymous_name,
      anon_avatar,
    });

    const validPoll = poll_question && poll_option_a && poll_option_b;

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          body,
          category: guessCategory(`${title} ${body}`),
          anonymous_name,
          anon_id,
          anon_avatar,
          status: "active",
          perspective_request: perspective_request || null,
          life_stage: life_stage || null,
          is_weekly_reflection: Boolean(is_weekly_reflection),
          poll_question: validPoll ? poll_question : null,
          poll_option_a: validPoll ? poll_option_a : null,
          poll_option_b: validPoll ? poll_option_b : null,
          poll_votes_a: 0,
          poll_votes_b: 0,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}