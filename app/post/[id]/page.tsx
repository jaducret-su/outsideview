export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";
import CommentForm from "./comment-form";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  const { data: comments } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", id)
    .order("created_at", { ascending: true });

  if (postError) {
    return (
      <main className="p-8 text-white">
        Error loading post: {postError.message}
      </main>
    );
  }

  if (!post) {
    return <main className="p-8 text-white">Post not found.</main>;
  }

  return (
    <main className="max-w-3xl mx-auto p-8 text-white">
      <span className="text-sm bg-neutral-800 text-white px-3 py-1 rounded-full">
        {post.category || "Life"}
      </span>

      <h1 className="text-4xl font-bold mt-4 mb-2">{post.title}</h1>

      <p className="text-gray-400 mb-6">
        Posted by {post.anonymous_name || "Anonymous"}
      </p>

      <p className="whitespace-pre-wrap text-lg leading-8 text-gray-200">
        {post.body}
      </p>

      <hr className="my-8 border-neutral-800" />

      <h2 className="text-2xl font-bold mb-4">Perspectives</h2>

      <div className="space-y-4 mb-8">
        {comments?.map((comment) => (
          <div
            key={comment.id}
            className="border border-neutral-800 rounded-xl p-4 bg-neutral-900"
          >
            <p className="text-sm text-gray-400 mb-2">
              {comment.anonymous_name || "Anonymous"}
            </p>
            <p className="text-gray-200">{comment.body}</p>
          </div>
        ))}
      </div>

      <CommentForm postId={id} />
    </main>
  );
}