import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function randomName() {
  const adjectives = ["Quiet", "Wandering", "Silver", "Hidden", "Brave", "Gentle"];
  const animals = ["Fox", "Owl", "River", "Maple", "Wolf", "Ocean"];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
    animals[Math.floor(Math.random() * animals.length)]
  }${Math.floor(Math.random() * 1000)}`;
}

export async function POST(req: Request) {
  try {
    const { postId, body } = await req.json();

    if (!postId || !body) {
      return NextResponse.json({ error: "Missing post or comment" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: postId,
        body,
        anonymous_name: randomName(),
      })
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}