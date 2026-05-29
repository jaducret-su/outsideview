import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">OutsideView</h1>
      <p className="text-lg mb-6">
        Share what you are going through anonymously and get perspectives from people around the world.
      </p>

      <div className="flex gap-4">
        <Link href="/post" className="bg-black text-white px-4 py-2 rounded">
          Share Anonymously
        </Link>

        <Link href="/feed" className="border px-4 py-2 rounded">
          Read Stories
        </Link>
      </div>
    </main>
  );
}