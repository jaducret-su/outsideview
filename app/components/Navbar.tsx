import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-neutral-800 bg-neutral-950 text-white px-8 py-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">
        OutsideView
      </Link>

      <div className="flex gap-4 items-center">
        <Link href="/feed" className="flex items-center text-gray-300 hover:text-white">
          Feed
        </Link>

        <Link href="/post" className="bg-white text-black px-3 py-2 rounded">
          Share
        </Link>
      </div>
    </nav>
  );
}