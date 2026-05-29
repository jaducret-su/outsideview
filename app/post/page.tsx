"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function submitPost(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    const data = await res.json();

    console.log("API response:", data);

    if (res.ok) {
      router.push("/feed");
    } else {
      alert(data.error || "Post failed.");
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Share Anonymously</h1>

      <form onSubmit={submitPost} className="space-y-4">
        <input
  className="w-full border border-neutral-700 bg-neutral-900 text-white p-3 rounded placeholder-gray-400"
  placeholder="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

<textarea
  className="w-full border border-neutral-700 bg-neutral-900 text-white p-3 rounded h-64 placeholder-gray-400"
  placeholder="What is going on?"
  value={body}
  onChange={(e) => setBody(e.target.value)}
/>

<button className="bg-white text-black px-4 py-2 rounded font-medium">
  Post
</button>
      </form>
    </main>
  );
}