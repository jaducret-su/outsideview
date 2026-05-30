import { supabase } from "@/lib/supabase";
import CommentForm from "./comment-form";
import HelpfulButton from "./HelpfulButton";
import Link from "next/link";
import ChangedPerspectiveButton from "./ChangedPerspectiveButton";

export const dynamic = "force-dynamic";

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

  if (!post || postError) {
    return (
      <main className="mx-auto max-w-3xl p-6 text-white">
        <Link
        href="/feed"
        className="text-sm text-gray-400 hover:text-white transition"> ← Back to Feed</Link>

        <h1 className="mt-6 text-2xl font-bold">Post not found</h1>
      </main>
    );
  }

  const { data: comments } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", id)
    .order("created_at", { ascending: false });

  const { data: similarPosts } = await supabase
    .from("posts")
    .select("*")
    .eq("category", post.category)
    .neq("id", id)
    .limit(3);

  return (
    <main className="mx-auto max-w-3xl p-6 text-white">
      <Link
        href="/feed"
        className="text-sm text-gray-400 hover:text-white transition"> ← Back to Feed</Link>

      <article className="mt-6 border-b border-neutral-800 pb-8">
        <span className="inline-block rounded-full bg-neutral-800 px-3 py-1 text-sm text-purple-300">{post.category}</span>

        <h1 className="mt-2 text-4xl font-bold text-white">{post.title}</h1>

        <p className="mt-2 text-sm text-gray-400">
          Shared by {post.anonymous_name}
        </p>

        {post.perspective_request && (
          <p className="mt-4 text-sm text-gray-400">
            Looking for perspectives from: {post.perspective_request}
          </p>
        )}

        {post.life_stage && (
          <p className="mt-1 text-sm text-gray-400">
            Life stage: {post.life_stage}
          </p>
        )}

        <p className="mt-6 whitespace-pre-wrap text-lg leading-8 text-gray-200">
          {post.body}
        </p>
      </article>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-white">
          {comments?.length || 0} Perspectives Received
        </h2>

        <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-950 p-5">
          <CommentForm postId={post.id} />
        </div>

        <div className="mt-6 space-y-4">
          {comments?.map((comment) => (
            <div
              key={comment.id}
              className="rounded-xl border border-neutral-800 bg-neutral-950 p-5"
            >
              {comment.perspective_tag && (
                <p className="mb-3 inline-block rounded-full bg-neutral-800 px-3 py-1 text-xs text-purple-300">
                  {comment.perspective_tag}
                </p>
              )}

              <p className="text-sm text-gray-400">
                {comment.anonymous_name}
              </p>

              <p className="mt-3 whitespace-pre-wrap text-gray-200">
                {comment.body}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <HelpfulButton
                  commentId={comment.id}
                  initialCount={comment.helpful_count || 0}
                />

                <ChangedPerspectiveButton
                  commentId={comment.id}
                  initialValue={comment.changed_perspective || false}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {similarPosts && similarPosts.length > 0 && (
        <section className="mt-10 border-t border-neutral-800 pt-8">
          <h2 className="text-2xl font-bold text-white">Similar Stories</h2>

          <div className="mt-4 space-y-3">
            {similarPosts.map((similarPost) => (
              <Link
                key={similarPost.id}
                href={`/post/${similarPost.id}`}
                className="block rounded-xl border border-neutral-800 bg-neutral-950 p-4 hover:bg-neutral-900"
              >
                <span className="inline-block rounded-full bg-neutral-800 px-2 py-1 text-xs text-purple-300">
  {similarPost.category}
</span>
                <h3 className="mt-1 font-semibold text-white">
                  {similarPost.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}