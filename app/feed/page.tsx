import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function Feed() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Anonymous Stories</h1>

      <div className="space-y-4">
        {posts?.map((post) => (
          <Link
            href={`/post/${post.id}`}
            key={post.id}
            className="block border p-4 rounded"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";