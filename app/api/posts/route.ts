import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function randomName() {
  const adjectives = ["Quiet", "Silver", "Wandering", "Bright", "Hidden"];
  const animals = ["Fox", "Maple", "Owl", "River", "Wolf"];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
    animals[Math.floor(Math.random() * animals.length)]
  }${Math.floor(Math.random() * 900 + 100)}`;
}

function guessCategory(text: string) {
  const lower = text.toLowerCase();

  if (lower.includes("job") || lower.includes("career") || lower.includes("work")) {
    return "Career";
  }

  if (lower.includes("school") || lower.includes("college") || lower.includes("class")) {
    return "School";
  }

  if (lower.includes("friend") || lower.includes("dating") || lower.includes("relationship")) {
    return "Relationships";
  }

  if (lower.includes("family") || lower.includes("parent") || lower.includes("sibling")) {
    return "Family";
  }

  if (lower.includes("anxious") || lower.includes("stress") || lower.includes("mental")) {
    return "Wellbeing";
  }

  return "Life";
}

export async function POST(req: Request) {
  try {
    const {
      title,
      body,
      perspective_request,
      life_stage,
      poll_question,
      poll_option_a,
      poll_option_b,
      prompt,
    } = await req.json();

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          body,
          category: guessCategory(`${title} ${body}`),
          anonymous_name: randomName(),
          status: "active",
          perspective_request: perspective_request || null,
          life_stage: life_stage || null,
          poll_question: poll_question || null,
          poll_option_a: poll_option_a || null,
          poll_option_b: poll_option_b || null,
          prompt: prompt || null,
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