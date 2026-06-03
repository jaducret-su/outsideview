"use client";

import { useState } from "react";
import { getAnonymousIdentity } from "@/lib/anonymousIdentity";

export default function PollChangedPerspectiveButton({
  commentId,
  initialCount,
}: {
  commentId: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [clicked, setClicked] = useState(false);

  async function markChanged() {
    if (clicked) return;

    const identity = getAnonymousIdentity();

    const res = await fetch("/api/poll-comments/changed-perspective", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentId,
        anonId: identity.anon_id,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setCount(data.count ?? count);
      setClicked(true);
    } else {
      alert(data.error || "Something went wrong.");
    }
  }

  return (
    <button
      onClick={markChanged}
      disabled={clicked}
      className="rounded bg-purple-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-purple-700 disabled:opacity-60"
    >
      {clicked
        ? `Perspective Changed · ${count}`
        : `Changed My Perspective · ${count}`}
    </button>
  );
}