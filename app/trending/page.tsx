import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function TrendingPage() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("saved_count", { ascending: false })
    .limit(20);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">Trending Perspectives</h1>
      <p className="mt-2 text-gray-400">
        Stories people are saving and returning to.
      </p>

      <div className="mt-6 space-y-4">
        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className="block rounded-xl border border-gray-700 p-4 hover:bg-gray-900"
          >
            <p className="text-sm text-purple-300">{post.category}</p>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-400">
              Saved {post.saved_count || 0} times
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}