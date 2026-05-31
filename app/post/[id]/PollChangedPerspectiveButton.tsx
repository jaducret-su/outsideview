"use client";

import { useState } from "react";

export default function PollChangedPerspectiveButton({
  commentId,
  initialValue,
}: {
  commentId: string;
  initialValue: boolean;
}) {
  const [changed, setChanged] = useState(initialValue);

  async function markChanged() {
    if (changed) return;

    const res = await fetch("/api/poll-comments/changed-perspective", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId }),
    });

    if (res.ok) {
      setChanged(true);
    }
  }

  return (
    <button
      onClick={markChanged}
      disabled={changed}
      className="rounded bg-purple-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-purple-700 disabled:opacity-60"
    >
      {changed ? "Changed Perspective" : "Changed My Perspective"}
    </button>
  );
}