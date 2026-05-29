"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentForm({ postId }: { postId: string }) {
  const router = useRouter();
  const [body, setBody] = useState("");

  async function submitComment(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, body }),
    });

    const data = await res.json();

    if (res.ok) {
      setBody("");
      router.refresh();
    } else {
      alert(data.error || "Comment failed.");
    }
  }

  return (
    <form onSubmit={submitComment} className="space-y-3">
      <textarea
        className="w-full border p-4 rounded-xl h-32"
        placeholder="Share a thoughtful perspective..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <button className="bg-black text-white px-5 py-3 rounded">
        Share Perspective
      </button>
    </form>
  );
}