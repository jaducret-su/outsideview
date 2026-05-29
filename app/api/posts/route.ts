import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function randomName() {
  const adjectives = ["Quiet", "Wandering", "Silver", "Hidden", "Brave", "Gentle"];
  const animals = ["Fox", "Owl", "River", "Maple", "Wolf", "Ocean"];

  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
    animals[Math.floor(Math.random() * animals.length)]
  }${Math.floor(Math.random() * 1000)}`;
}

function guessCategory(text: string) {
  const lower = text.toLowerCase();

  if (lower.includes("friend") || lower.includes("relationship") || lower.includes("dating")) return "Relationships";
  if (lower.includes("job") || lower.includes("career") || lower.includes("work")) return "Career";
  if (lower.includes("school") || lower.includes("college") || lower.includes("class")) return "School";
  if (lower.includes("family") || lower.includes("parent")) return "Family";
  if (lower.includes("lonely") || lower.includes("anxious") || lower.includes("sad")) return "Wellbeing";

  return "Life";
}

export async function POST(req: Request) {
  try {
    const { title, body } = await req.json();

    if (!title || !body) {
      return NextResponse.json({ error: "Missing title or body" }, { status: 400 });
    }

    const category = guessCategory(`${title} ${body}`);
    const anonymous_name = randomName();

    const { data, error } = await supabase
      .from("posts")
      .insert({
        title,
        body,
        tags: [category.toLowerCase()],
        status: "approved",
        category,
        anonymous_name,
      })
      .select();

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