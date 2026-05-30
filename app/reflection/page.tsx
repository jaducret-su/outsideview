export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ReflectionPage() {
  const { data: reflectionPosts } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "active")
    .eq("is_weekly_reflection", true)
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-4xl p-6 text-white">
      <section className="mb-8 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">
        <p className="text-sm font-medium text-purple-300">
          💭 Weekly Reflection
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          What decision are you struggling with that someone else might see differently?
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400">
          A shared prompt for the community. Read how different people interpret
          the same question through their own experiences.
        </p>

        <Link
          href="/post?reflection=weekly"
          className="mt-6 inline-block rounded-lg bg-purple-600 px-5 py-2.5 font-medium text-white hover:bg-purple-700"
        >
          Respond to Reflection
        </Link>
      </section>

      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            Reflection Responses
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Different lives, different angles, one shared question.
          </p>
        </div>

        <span className="text-sm text-gray-500">
          {reflectionPosts?.length || 0} responses
        </span>
      </div>

      {!reflectionPosts || reflectionPosts.length === 0 ? (
        <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-8 text-center">
          <h2 className="text-2xl font-bold">No responses yet</h2>

          <p className="mt-2 text-gray-400">
            Be the first to respond to this week&apos;s reflection.
          </p>

          <Link
            href="/post?reflection=weekly"
            className="mt-5 inline-block rounded-lg bg-purple-600 px-5 py-2.5 font-medium text-white hover:bg-purple-700"
          >
            Write First Response
          </Link>
        </section>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {reflectionPosts.map((post) => (
            <Link
              href={`/post/${post.id}`}
              key={post.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 transition hover:border-purple-500/30 hover:bg-neutral-900"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-sm text-gray-500">
                  {post.anon_avatar || "🕊️"}{" "}
                  {post.anonymous_name || "Anonymous"}
                </span>

                <span className="rounded-full border border-purple-500/30 px-3 py-1 text-xs text-purple-300">
                  Reflection
                </span>
              </div>

              <h3 className="text-xl font-semibold">{post.title}</h3>

              <p className="mt-3 line-clamp-4 text-gray-300">
                {post.body}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}