import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-900 px-6 py-8 text-sm text-gray-500">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 OutsideView</p>

        <div className="flex flex-wrap gap-4">
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>

          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>

          <Link href="/guidelines" className="hover:text-white">
            Guidelines
          </Link>

          <Link href="/crisis" className="hover:text-white">
            Crisis Resources
          </Link>
        </div>
      </div>
    </footer>
  );
}