import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { postId } = await req.json();

  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("saved_count")
    .eq("id", postId)
    .single();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const { error } = await supabase
    .from("posts")
    .update({ saved_count: (post.saved_count || 0) + 1 })
    .eq("id", postId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}