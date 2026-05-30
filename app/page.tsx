import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-black px-5 py-10 text-white sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-140px)] max-w-5xl flex-col items-center justify-center text-center">

        <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Get perspectives beyond your own world.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg md:text-xl">
          Share anonymously, receive thoughtful viewpoints, and help others see
          their situations from a new angle.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <Link
            href="/feed"
            className="rounded-xl bg-purple-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-purple-700"
          >
            Browse Stories
          </Link>

          <Link
            href="/post"
            className="rounded-xl border border-neutral-700 px-6 py-3 text-center font-semibold text-gray-300 transition hover:bg-neutral-900 hover:text-white"
          >
            Share Anonymously
          </Link>
        </div>

        <div className="mt-12 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 text-left">
            <p className="text-sm font-medium text-purple-300">
              Anonymous
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Share honestly without attaching your real-world identity.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 text-left">
            <p className="text-sm font-medium text-purple-300">
              Perspective-first
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Responses are built around insight, not likes or followers.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 text-left">
            <p className="text-sm font-medium text-purple-300">
              Welcoming
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Find people who see your situation from a different angle.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}