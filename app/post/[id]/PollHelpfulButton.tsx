"use client";

import { useState } from "react";

export default function PollHelpfulButton({
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

    const res = await fetch("/api/poll-comments/helpful", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId }),
    });

    if (res.ok) {
      setCount((prev) => prev + 1);
      setClicked(true);
    }
  }

  return (
    <button
      onClick={markHelpful}
      disabled={clicked}
      className="rounded bg-neutral-700 px-3 py-1 text-sm text-white transition hover:bg-neutral-600 disabled:opacity-60"
    >
      Helpful · {count}
    </button>
  );
}