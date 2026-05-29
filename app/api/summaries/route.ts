import { NextResponse } from "next/server";
import OpenAI from "openai";
import { supabase } from "@/lib/supabase";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { postId } = await req.json();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();

  const { data: comments } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId);

  const commentText = comments?.map((c) => `- ${c.body}`).join("\n") || "";

  const summary = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: `
Summarize the perspectives on this anonymous post.

Post:
${post.title}
${post.body}

Comments:
${commentText}

Return:
1. Common advice
2. Different viewpoints
3. Practical next steps
`,
  });

  await supabase
    .from("posts")
    .update({ ai_summary: summary.output_text })
    .eq("id", postId);

  return NextResponse.json({ success: true });
}