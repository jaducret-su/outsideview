import { supabase } from "@/lib/supabase";
import CommentForm from "./comment-form";
import HelpfulButton from "./HelpfulButton";
import ChangedPerspectiveButton from "./ChangedPerspectiveButton";
import PollSection from "./PollSection";
import ReportButton from "@/app/components/ReportButton";
import Link from "next/link";

export const dynamic = "force-dynamic";

function memberSince(date?: string) {
  if (!date) return "Recently";

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post || post.status === "removed") {
    return (
      <main className="mx-auto max-w-3xl p-6 text-white">
        <Link href="/feed" className="text-sm text-gray-400 hover:text-white">
          ← Back to Feed
        </Link>

        <h1 className="mt-6 text-2xl font-bold">Post not found</h1>
      </main>
    );
  }

  const { data: profile } = await supabase
    .from("anon_profiles")
    .select("*")
    .eq("anon_id", post.anon_id)
    .single();

  const { data: comments } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", id)
    .eq("status", "active")
    .order("changed_perspective", { ascending: false })
    .order("helpful_count", { ascending: false })
    .order("created_at", { ascending: false });

  const { data: pollComments } = await supabase
    .from("poll_comments")
    .select("*")
    .eq("post_id", id)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  const { data: similarPosts } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "active")
    .eq("category", post.category)
    .neq("id", id)
    .limit(3);

  return (
    <main className="mx-auto max-w-3xl p-6 text-white">
      <Link href="/feed" className="text-sm text-gray-400 hover:text-white">
        ← Back to Feed
      </Link>

      <article className="mt-6 border-b border-neutral-800 pb-8">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-neutral-800 px-3 py-1 text-sm text-purple-300">
            {post.category || "Life"}
          </span>

          {post.is_weekly_reflection && (
            <span className="rounded-full border border-purple-500/30 px-3 py-1 text-sm text-purple-300">
              Weekly Reflection
            </span>
          )}
        </div>

        <h1 className="mt-4 text-4xl font-bold leading-tight">
          {post.title}
        </h1>

        <div className="mt-5 rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{post.anon_avatar || "🕊️"}</span>

            <div>
              <p className="font-semibold">
                {post.anonymous_name || "Anonymous"}
              </p>

              <p className="text-sm text-gray-500">
                Helpful Perspectives: {profile?.helpful_perspectives || 0}
              </p>

              <p className="text-sm text-gray-500">
                Member since {memberSince(profile?.created_at)}
              </p>
            </div>
          </div>
        </div>

        {post.perspective_request && (
          <div className="mt-5 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
            <p className="text-sm font-medium text-purple-300">
              Perspective requested
            </p>

            <p className="mt-1 text-gray-300">
              {post.perspective_request}
            </p>
          </div>
        )}

        <p className="mt-6 whitespace-pre-wrap text-lg leading-8 text-gray-200">
          {post.body}
        </p>

        <ReportButton targetType="post" targetId={post.id} />
      </article>

      {post.poll_question && (
        <PollSection
          postId={post.id}
          question={post.poll_question}
          optionA={post.poll_option_a}
          optionB={post.poll_option_b}
          votesA={post.poll_votes_a || 0}
          votesB={post.poll_votes_b || 0}
          comments={pollComments || []}
        />
      )}

      <section className="mt-8">
        <h2 className="text-2xl font-bold">
          {comments?.length || 0} Perspectives Received
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Help the poster see their situation more clearly.
        </p>

        <div className="mt-4 rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
          <CommentForm postId={post.id} />
        </div>

        <div className="mt-6 space-y-4">
          {comments?.map((comment) => (
            <div
              key={comment.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5"
            >
              <div className="mb-3 flex flex-wrap gap-2">
                {comment.perspective_tag && (
                  <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                    {comment.perspective_tag}
                  </span>
                )}

                {comment.changed_perspective && (
                  <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-200">
                    Changed someone&apos;s perspective
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500">
                {comment.anon_avatar || "🕊️"}{" "}
                {comment.anonymous_name || "Anonymous"}
              </p>

              <p className="mt-3 whitespace-pre-wrap leading-7 text-gray-200">
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

              <ReportButton targetType="comment" targetId={comment.id} />
            </div>
          ))}
        </div>
      </section>

      {similarPosts && similarPosts.length > 0 && (
        <section className="mt-10 border-t border-neutral-800 pt-8">
          <h2 className="text-2xl font-bold">Similar Stories</h2>

          <p className="mt-1 text-sm text-gray-500">
            More stories where your perspective may be useful.
          </p>

          <div className="mt-4 space-y-3">
            {similarPosts.map((similarPost) => (
              <Link
                key={similarPost.id}
                href={`/post/${similarPost.id}`}
                className="block rounded-2xl border border-neutral-800 bg-neutral-950 p-4 hover:border-purple-500/30"
              >
                <span className="rounded-full bg-neutral-800 px-2 py-1 text-xs text-purple-300">
                  {similarPost.category || "Life"}
                </span>

                <h3 className="mt-2 font-semibold">
                  {similarPost.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                  {similarPost.body}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}