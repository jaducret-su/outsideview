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
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">Anonymous Stories</h1>
      <p className="text-gray-600 mb-8">
        Read what people are going through and share a thoughtful perspective.
      </p>

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

  <p className="text-gray-300 line-clamp-3">
    {post.body}
  </p>
</Link>
        ))}
      </div>
    </main>
  );
}