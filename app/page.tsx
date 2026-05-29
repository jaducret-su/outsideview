import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="max-w-5xl mx-auto px-8 py-24 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
          Anonymous global perspectives
        </p>

        <h1 className="text-5xl font-bold mb-6">
          Get perspectives beyond your own world.
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Share what you are going through anonymously and hear from people with different life experiences.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/post" className="bg-white text-black px-6 py-3 rounded font-medium">
  Share Your Story
</Link>

<Link
  href="/feed"
  className="border border-neutral-700 text-white px-6 py-3 rounded bg-neutral-900 font-medium"
>
  Browse Perspectives
</Link>
        </div>
      </section>
    </main>
  );
}