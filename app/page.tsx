import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [
    postsResult,
    commentsResult,
    pollCommentsResult,
    changedCommentsResult,
    changedPollCommentsResult,
  ] = await Promise.all([
    supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),

    supabase
      .from("comments")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),

    supabase
      .from("poll_comments")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),

    supabase
      .from("comments")
      .select("changed_perspective_count")
      .eq("status", "active"),

    supabase
      .from("poll_comments")
      .select("changed_perspective_count")
      .eq("status", "active"),
  ]);

  const storyCount = postsResult.count ?? 0;

  const perspectiveCount =
    (commentsResult.count ?? 0) + (pollCommentsResult.count ?? 0);

  const changedCount = [
    ...(changedCommentsResult.data ?? []),
    ...(changedPollCommentsResult.data ?? []),
  ].reduce(
    (sum, item) => sum + (item.changed_perspective_count ?? 0),
    0
  );

  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-black px-5 py-10 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-24 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[140px]" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-140px)] max-w-5xl flex-col items-center justify-center text-center">

        <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
            Get perspectives
          </span>
          <br />
          <span className="bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
            beyond your own world.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg md:text-xl">
          Share anonymously, receive thoughtful viewpoints, and help others see
          their situations from a new angle.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <Link
            href="/feed"
            className="rounded-xl bg-purple-600 px-6 py-3 text-center font-semibold text-white shadow-lg shadow-purple-900/30 transition hover:bg-purple-700"
          >
            Browse Stories
          </Link>

          <Link
            href="/post"
            className="rounded-xl border border-purple-500/30 px-6 py-3 text-center font-semibold text-gray-300 transition hover:bg-purple-500/10 hover:text-white"
          >
            Share Anonymously
          </Link>
        </div>

        <div className="mt-12 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-950/40 to-black p-5 text-left backdrop-blur-sm">
            <p className="text-sm font-medium text-purple-300">Anonymous</p>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Share honestly without attaching your real-world identity.
            </p>
          </div>

          <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-950/40 to-black p-5 text-left backdrop-blur-sm">
            <p className="text-sm font-medium text-purple-300">
              Perspective-first
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Responses are built around insight, not likes or followers.
            </p>
          </div>

          <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-950/40 to-black p-5 text-left backdrop-blur-sm">
            <p className="text-sm font-medium text-purple-300">Welcoming</p>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Find people who see your situation from a different angle.
            </p>
          </div>
        </div>

        <div className="mt-10 w-full max-w-4xl rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-950/50 via-violet-950/40 to-fuchsia-950/50 p-6 backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
            <div>
              <p className="bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
                {storyCount}
              </p>
              <p className="mt-2 text-sm text-gray-400">Stories Shared</p>
            </div>

            <div>
              <p className="bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
                {perspectiveCount}
              </p>
              <p className="mt-2 text-sm text-gray-400">Perspectives Given</p>
            </div>

            <div>
              <p className="bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
                {changedCount}
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Perspectives Changed
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}