export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() || "";

  let posts: any[] = [];
  let perspectives: any[] = [];

  if (query) {
    const { data: postResults } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "active")
      .or(
        `title.ilike.%${query}%,body.ilike.%${query}%,category.ilike.%${query}%,perspective_request.ilike.%${query}%`
      )
      .order("created_at", { ascending: false })
      .limit(20);

    const { data: perspectiveResults } = await supabase
      .from("comments")
      .select("*")
      .eq("status", "active")
      .or(
        `body.ilike.%${query}%,perspective_tag.ilike.%${query}%`
      )
      .order("helpful_count", { ascending: false })
      .limit(20);

    posts = postResults || [];
    perspectives = perspectiveResults || [];
  }

  return (
    <main className="mx-auto max-w-5xl p-6 text-white">
      <section className="mb-8">
        <p className="text-sm font-medium text-purple-300">
          OutsideView Search
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Search stories and perspectives
        </h1>

        <p className="mt-3 max-w-2xl text-gray-400">
          Find situations, decisions, and viewpoints from people with different
          experiences.
        </p>
      </section>

      <form action="/search" className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input
          name="q"
          defaultValue={query}
          placeholder="Search career, relationships, moving, burnout..."
          className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-purple-500/60"
        />

        <button className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700">
          Search
        </button>
      </form>

      {!query ? (
        <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-8">
          <h2 className="text-2xl font-bold">Try searching for something</h2>

          <p className="mt-2 text-gray-400">
            Examples: career change, moving away, family pressure, college,
            burnout, long distance.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "career",
              "relationships",
              "moving",
              "college",
              "burnout",
              "family",
            ].map((term) => (
              <Link
                key={term}
                href={`/search?q=${term}`}
                className="rounded-full border border-neutral-800 px-4 py-2 text-sm text-gray-300 hover:border-purple-500/40 hover:text-white"
              >
                {term}
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Stories</h2>
              <p className="mt-1 text-sm text-gray-500">
                {posts.length} matching stories
              </p>
            </div>

            <div className="space-y-4">
              {posts.length === 0 ? (
                <p className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 text-gray-400">
                  No matching stories found.
                </p>
              ) : (
                posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/post/${post.id}`}
                    className="block rounded-2xl border border-neutral-800 bg-neutral-950 p-5 transition hover:border-purple-500/30 hover:bg-neutral-900"
                  >
                    <span className="rounded-full bg-neutral-800 px-3 py-1 text-sm text-purple-300">
                      {post.category || "Life"}
                    </span>

                    <h3 className="mt-3 text-xl font-semibold">
                      {post.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-gray-400">
                      {post.body}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </section>

          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Perspectives</h2>
              <p className="mt-1 text-sm text-gray-500">
                {perspectives.length} matching perspectives
              </p>
            </div>

            <div className="space-y-4">
              {perspectives.length === 0 ? (
                <p className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 text-gray-400">
                  No matching perspectives found.
                </p>
              ) : (
                perspectives.map((comment) => (
                  <Link
                    key={comment.id}
                    href={`/post/${comment.post_id}`}
                    className="block rounded-2xl border border-neutral-800 bg-neutral-950 p-5 transition hover:border-purple-500/30 hover:bg-neutral-900"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-sm text-gray-500">
                        {comment.anon_avatar || "🕊️"}{" "}
                        {comment.anonymous_name || "Anonymous"}
                      </span>

                      <span className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-gray-400">
                        Helpful · {comment.helpful_count || 0}
                      </span>
                    </div>

                    {comment.perspective_tag && (
                      <span className="mt-3 inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                        {comment.perspective_tag}
                      </span>
                    )}

                    <p className="mt-3 line-clamp-4 text-gray-300">
                      {comment.body}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}