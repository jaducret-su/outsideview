export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function Feed() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-4xl p-6 text-white">
      <section className="mb-8">
        <p className="text-sm font-medium text-purple-300">OutsideView Feed</p>

        <h1 className="mt-2 text-4xl font-bold">
          People Looking for Perspective
        </h1>

        <p className="mt-3 max-w-2xl text-gray-400">
          Read what people are going through and share a thoughtful viewpoint
          from your own experience.
        </p>
      </section>

      <section className="mb-8 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">
        <p className="text-sm font-medium text-purple-300">
          💭 Weekly Reflection
        </p>

        <h2 className="mt-3 text-2xl font-bold">
          What decision are you struggling with that someone else might see differently?
        </h2>

        <p className="mt-3 text-gray-400">
          Explore how different people respond to the same reflection prompt.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/post?reflection=weekly"
            className="rounded-lg bg-purple-600 px-5 py-2.5 font-medium text-white hover:bg-purple-700"
          >
            Respond
          </Link>

          <Link
            href="/reflection"
            className="rounded-lg border border-neutral-700 px-5 py-2.5 font-medium text-gray-300 hover:bg-neutral-900 hover:text-white"
          >
            View Responses
          </Link>
        </div>
      </section>

      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">
            Stories Seeking Perspective
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            New stories from people looking for thoughtful viewpoints.
          </p>
        </div>

        <span className="text-sm text-gray-500">
          {posts?.length || 0} stories
        </span>
      </div>

      {!posts || posts.length === 0 ? (
        <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-8 text-center">
          <h2 className="text-2xl font-bold">No stories yet</h2>

          <p className="mt-2 text-gray-400">
            Be the first to share something and invite outside perspectives.
          </p>

          <Link
            href="/post"
            className="mt-5 inline-block rounded-lg bg-purple-600 px-5 py-2.5 font-medium text-white hover:bg-purple-700"
          >
            Share First Story
          </Link>
        </section>
      ) : (
        <div className="space-y-5">
          {posts.map((post) => (
            <Link
              href={`/post/${post.id}`}
              key={post.id}
              className="block rounded-2xl border border-neutral-800 bg-neutral-950 p-5 transition hover:border-purple-500/30 hover:bg-neutral-900"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-neutral-800 px-3 py-1 text-sm text-purple-300">
                  {post.category || "Life"}
                </span>

                <span className="text-sm text-gray-500">
                  {post.anon_avatar || "🕊️"}{" "}
                  {post.anonymous_name || "Anonymous"}
                </span>
              </div>

              <h2 className="text-2xl font-semibold">{post.title}</h2>

              <p className="mt-3 line-clamp-3 text-gray-300">
                {post.body}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
                {post.perspective_request && (
                  <span className="rounded-full border border-neutral-800 px-3 py-1">
                    Looking for: {post.perspective_request}
                  </span>
                )}

                {post.is_weekly_reflection && (
                  <span className="rounded-full border border-purple-500/30 px-3 py-1 text-purple-300">
                    Weekly Reflection
                  </span>
                )}

                {post.poll_question && (
                  <span className="rounded-full border border-neutral-800 px-3 py-1">
                    Community Poll
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}