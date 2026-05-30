"use client";

import { useState } from "react";

export default function HelpfulButton({
  commentId,
  initialCount,
}: {
  commentId: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [clicked, setClicked] = useState(false);

  async function markHelpful() {
    if (clicked) return;

    const res = await fetch("/api/comments/helpful", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId }),
    });

    if (res.ok) {
      setCount(count + 1);
      setClicked(true);
    }
  }

  return (
    <button
      onClick={markHelpful}
      className="rounded bg-neutral-700 px-3 py-1 text-sm text-white transition hover:bg-neutral-600 disabled:opacity-60"
      disabled={clicked}
    >
      Helpful · {count}
    </button>
  );
}