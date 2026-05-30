"use client";

import { useState } from "react";

export default function SavePostButton({
  postId,
  initialCount,
}: {
  postId: string;
  initialCount: number;
}) {
  const [saved, setSaved] = useState(false);
  const [count, setCount] = useState(initialCount);

  async function savePost() {
    if (saved) return;

    const res = await fetch("/api/posts/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    });

    if (res.ok) {
      setSaved(true);
      setCount(count + 1);
    }
  }

  return (
    <button
      onClick={savePost}
      className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
    >
      {saved ? "Saved" : "Save Post"} · {count}
    </button>
  );
}