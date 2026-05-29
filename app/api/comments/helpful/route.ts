import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { commentId, currentCount } = await req.json();

  const { error } = await supabase
    .from("comments")
    .update({ helpful_count: currentCount + 1 })
    .eq("id", commentId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}