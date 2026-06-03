import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-neutral-900 bg-black/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/outsideview-logo.png"
            alt="OutsideView"
            width={40}
            height={40}
            priority
            className="rounded-full"
          />

          <span className="bg-gradient-to-r from-purple-400 via-purple-200 to-white bg-clip-text text-xl font-bold text-transparent">
            OutsideView
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <Link href="/feed" className="transition hover:text-white">
            Feed
          </Link>

          <Link href="/search" className="transition hover:text-white">
            Search
          </Link>

          <Link href="/perspectives" className="transition hover:text-white">
            Perspectives
          </Link>

          <Link href="/reflection" className="transition hover:text-white">
            Weekly Reflection
          </Link>

          <Link
            href="/post"
            className="rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition hover:bg-purple-700"
          >
            Share Story
          </Link>
        </div>
      </nav>
    </header>
  );
}