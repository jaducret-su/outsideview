export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";
import CommentForm from "./comment-form";
import HelpfulButton from "./HelpfulButton";

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

  if (postError || !post) {
    return <main className="p-8 text-white">Post not found.</main>;
  }

  const { data: comments } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", id)
    .order("helpful_count", { ascending: false });

  const { data: similarPosts } = await supabase
    .from("posts")
    .select("*")
    .eq("category", post.category)
    .neq("id", id)
    .limit(3);

  return (
    <main className="max-w-3xl mx-auto p-4 sm:p-8 text-white">
      <span className="text-sm bg-neutral-800 text-white px-3 py-1 rounded-full">
        {post.category || "Life"}
      </span>

      <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-2">
        {post.title}
      </h1>

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

            <p className="text-gray-200 whitespace-pre-wrap">{comment.body}</p>

            <HelpfulButton
              commentId={comment.id}
              currentCount={comment.helpful_count || 0}
            />
          </div>
        ))}
      </div>

      <CommentForm postId={id} />

      {similarPosts && similarPosts.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Similar Stories</h2>

          <div className="space-y-3">
            {similarPosts.map((similar) => (
              <a
                key={similar.id}
                href={`/post/${similar.id}`}
                className="block border border-neutral-800 bg-neutral-900 p-4 rounded-xl hover:bg-neutral-800"
              >
                <p className="font-semibold text-white">{similar.title}</p>
                <p className="text-gray-400 line-clamp-2">{similar.body}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}