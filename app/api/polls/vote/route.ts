import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { postId, choice } = await req.json();

    const { data: post, error: fetchError } = await supabase
      .from("posts")
      .select("poll_votes_a, poll_votes_b")
      .eq("id", postId)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    const updates =
      choice === "a"
        ? { poll_votes_a: (post.poll_votes_a || 0) + 1 }
        : { poll_votes_b: (post.poll_votes_b || 0) + 1 };

    const { error } = await supabase.from("posts").update(updates).eq("id", postId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}