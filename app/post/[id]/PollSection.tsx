"use client";

import { useState } from "react";
import { getAnonymousIdentity } from "@/lib/anonymousIdentity";

type PollComment = {
  id: string;
  body: string;
  anon_name: string;
  anon_avatar: string;
};

export default function PollSection({
  postId,
  question,
  optionA,
  optionB,
  votesA,
  votesB,
  comments,
}: {
  postId: string;
  question: string;
  optionA: string;
  optionB: string;
  votesA: number;
  votesB: number;
  comments: PollComment[];
}) {
  const [a, setA] = useState(votesA);
  const [b, setB] = useState(votesB);
  const [voted, setVoted] = useState(false);
  const [body, setBody] = useState("");
  const [pollComments, setPollComments] = useState(comments);

  const total = a + b;
  const percentA = total ? Math.round((a / total) * 100) : 0;
  const percentB = total ? Math.round((b / total) * 100) : 0;

  async function vote(choice: "a" | "b") {
    if (voted) return;

    const res = await fetch("/api/polls/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, choice }),
    });

    if (res.ok) {
      if (choice === "a") setA(a + 1);
      if (choice === "b") setB(b + 1);
      setVoted(true);
    }
  }

  async function submitPollComment(e: React.FormEvent) {
    e.preventDefault();

    const identity = getAnonymousIdentity();

    const res = await fetch("/api/poll-comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id: postId, body, ...identity }),
    });

    if (res.ok) {
      setPollComments([
        {
          id: crypto.randomUUID(),
          body,
          anon_name: identity.anon_name,
          anon_avatar: identity.anon_avatar,
        },
        ...pollComments,
      ]);
      setBody("");
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
      <p className="text-sm font-medium text-purple-300">Community Poll</p>
      <h2 className="mt-2 text-2xl font-bold">{question}</h2>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <button
          onClick={() => vote("a")}
          disabled={voted}
          className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-left hover:border-purple-500/40 disabled:opacity-70"
        >
          <p className="font-medium">{optionA}</p>
          <p className="mt-2 text-sm text-gray-500">{a} votes · {percentA}%</p>
        </button>

        <button
          onClick={() => vote("b")}
          disabled={voted}
          className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-left hover:border-purple-500/40 disabled:opacity-70"
        >
          <p className="font-medium">{optionB}</p>
          <p className="mt-2 text-sm text-gray-500">{b} votes · {percentB}%</p>
        </button>
      </div>

      <form onSubmit={submitPollComment} className="mt-6">
        <label className="text-sm font-medium text-gray-300">
          Explain your vote or add context
        </label>
        <textarea
          className="mt-2 h-24 w-full rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-white"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Why did you vote that way?"
        />
        <button className="mt-3 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
          Add Poll Comment
        </button>
      </form>

      {pollComments.length > 0 && (
        <div className="mt-6 space-y-3">
          {pollComments.map((comment) => (
            <div key={comment.id} className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
              <p className="text-sm text-gray-500">
                {comment.anon_avatar} {comment.anon_name}
              </p>
              <p className="mt-2 text-gray-200">{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}