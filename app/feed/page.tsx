export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function Feed() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <main className="p-8">Error loading posts: {error.message}</main>;
  }

  return (
    <main className="max-w-4xl mx-auto p-8 text-white">
      <h1 className="text-4xl font-bold mb-2">Anonymous Stories</h1>
      <p className="text-gray-300 mb-8">
        Read what people are going through and share a thoughtful perspective.
      </p>

      <section className="mb-8 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 shadow-lg">
        <p className="text-sm font-medium text-purple-300">
          💭 Weekly Reflection
        </p>

        <h2 className="mt-3 text-2xl font-bold text-white">
          What decision are you struggling with that someone else might see differently?
        </h2>

        <p className="mt-3 text-gray-400">
          Share your situation anonymously and get perspectives from people outside your own world.
        </p>

        <Link
          href="/post"
          className="mt-5 inline-block rounded-lg bg-purple-600 px-5 py-2.5 font-medium text-white hover:bg-purple-700"
        >
          Share Your Story
        </Link>
      </section>

      <div className="space-y-5">
        {posts?.map((post) => (
          <Link
            href={`/post/${post.id}`}
            key={post.id}
            className="block border border-neutral-800 rounded-xl p-5 bg-neutral-900 hover:bg-neutral-800"
          >
            <div className="flex justify-between mb-3">
              <span className="text-sm bg-neutral-800 text-white px-3 py-1 rounded-full">
                {post.category || "Life"}
              </span>

              <span className="text-sm text-gray-400">
                {post.anonymous_name || "Anonymous"}
              </span>
            </div>

            <h2 className="text-2xl font-semibold mb-2 text-white">
              {post.title}
            </h2>

            <p className="text-gray-300 line-clamp-3">{post.body}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}