export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function PerspectivesPage() {
  const { data: trendingPerspectives } = await supabase
    .from("comments")
    .select("*")
    .eq("status", "active")
    .not("post_id", "is", null)
    .order("changed_perspective", { ascending: false })
    .order("helpful_count", { ascending: false })
    .limit(20);

  return (
    <main className="mx-auto max-w-4xl p-6 text-white">
      <section className="mb-8">
        <p className="text-sm font-medium text-purple-300">
          OutsideView Perspectives
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Trending Perspectives
        </h1>

        <p className="mt-3 max-w-2xl text-gray-400">
          Not trending posts. These are perspectives that people found helpful
          or perspective-changing.
        </p>
      </section>

      {!trendingPerspectives || trendingPerspectives.length === 0 ? (
        <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-8 text-center">
          <h2 className="text-2xl font-bold">No trending perspectives yet</h2>

          <p className="mt-2 text-gray-400">
            As people mark comments helpful or perspective-changing, they will
            appear here.
          </p>

          <Link
            href="/feed"
            className="mt-5 inline-block rounded-lg bg-purple-600 px-5 py-2.5 font-medium text-white hover:bg-purple-700"
          >
            Find Stories to Help
          </Link>
        </section>
      ) : (
        <div className="space-y-5">
          {trendingPerspectives.map((comment) => (
            <Link
              href={`/post/${comment.post_id}`}
              key={comment.id}
              className="block rounded-2xl border border-neutral-800 bg-neutral-950 p-5 transition hover:border-purple-500/30 hover:bg-neutral-900"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm text-gray-500">
                  {comment.anon_avatar || "🕊️"}{" "}
                  {comment.anonymous_name || "Anonymous"}
                </span>

                <span className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-gray-400">
                  Helpful · {comment.helpful_count || 0}
                </span>
              </div>

              {comment.perspective_tag && (
                <span className="inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                  {comment.perspective_tag}
                </span>
              )}

              <p className="mt-4 line-clamp-4 text-gray-200">
                {comment.body}
              </p>

              {comment.changed_perspective && (
                <p className="mt-4 text-sm text-purple-300">
                  Changed someone&apos;s perspective
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}