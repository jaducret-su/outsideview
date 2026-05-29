"use client";

import { useRouter } from "next/navigation";

export default function HelpfulButton({
  commentId,
  currentCount,
}: {
  commentId: string;
  currentCount: number;
}) {
  const router = useRouter();

  async function voteHelpful() {
    await fetch("/api/comments/helpful", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId, currentCount }),
    });

    router.refresh();
  }

  return (
    <button
      onClick={voteHelpful}
      className="mt-3 text-sm border border-neutral-700 px-3 py-1 rounded text-gray-300 hover:bg-neutral-800"
    >
      Helpful · {currentCount || 0}
    </button>
  );
}