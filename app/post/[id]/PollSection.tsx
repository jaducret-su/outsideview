"use client";

import { useState } from "react";
import { getAnonymousIdentity } from "@/lib/anonymousIdentity";
import ReportButton from "@/app/components/ReportButton";
import PollHelpfulButton from "./PollHelpfulButton";
import PollChangedPerspectiveButton from "./PollChangedPerspectiveButton";

type PollComment = {
  id: string;
  body: string | null;
  anon_name?: string | null;
  anon_avatar?: string | null;
  selected_choice?: "a" | "b" | null;
  selected_option?: string | null;
  helpful_count?: number | null;
  changed_perspective?: boolean | null;
  changed_perspective_count?: number | null;
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
  const [selectedChoice, setSelectedChoice] = useState<"a" | "b" | null>(null);
  const [body, setBody] = useState("");
  const [pollComments, setPollComments] = useState<PollComment[]>(comments || []);

  const visiblePollComments = pollComments.filter(
    (comment) => comment.body && comment.body.trim().length > 0
  );

  const total = a + b;
  const percentA = total ? Math.round((a / total) * 100) : 0;
  const percentB = total ? Math.round((b / total) * 100) : 0;

  const leadingChoice = a > b ? "a" : b > a ? "b" : null;

  async function vote(choice: "a" | "b") {
    if (selectedChoice) return;

    const res = await fetch("/api/polls/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, choice }),
    });

    if (res.ok) {
      if (choice === "a") setA((prev) => prev + 1);
      if (choice === "b") setB((prev) => prev + 1);
      setSelectedChoice(choice);
    } else {
      const data = await res.json();
      alert(data.error || "Vote failed.");
    }
  }

  async function submitPollComment(e: React.FormEvent) {
    e.preventDefault();

    if (!body.trim()) {
      alert("Please add a short explanation first.");
      return;
    }

    if (!selectedChoice) {
      alert("Please vote before sharing the perspective behind your vote.");
      return;
    }

    const identity = getAnonymousIdentity();
    const selectedOption = selectedChoice === "a" ? optionA : optionB;

    const res = await fetch("/api/poll-comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: postId,
        body: body.trim(),
        anon_id: identity.anon_id,
        anon_name: identity.anon_name,
        anon_avatar: identity.anon_avatar,
        selected_choice: selectedChoice,
        selected_option: selectedOption,
      }),
    });

    if (res.ok) {
      setPollComments([
        {
          id: crypto.randomUUID(),
          body: body.trim(),
          anon_name: identity.anon_name,
          anon_avatar: identity.anon_avatar,
          selected_choice: selectedChoice,
          selected_option: selectedOption,
          helpful_count: 0,
          changed_perspective: false,
        },
        ...pollComments,
      ]);

      setBody("");
    } else {
      const data = await res.json();
      alert(data.error || "Poll comment failed.");
    }
  }

  function optionClass(choice: "a" | "b") {
    const isSelected = selectedChoice === choice;
    const isLeading = leadingChoice === choice;

    if (isSelected) {
      return "border-purple-500/70 bg-purple-500/20 ring-2 ring-purple-500/30";
    }

    if (isLeading) {
      return "border-purple-500/40 bg-purple-500/10";
    }

    return "border-neutral-800 bg-neutral-900 hover:border-purple-500/40";
  }

  function barClass(choice: "a" | "b") {
    if (selectedChoice === choice) return "bg-purple-500";
    if (leadingChoice === choice) return "bg-purple-500/70";
    return "bg-neutral-700";
  }

  function getSelectedOptionLabel(comment: PollComment) {
    if (comment.selected_option) return comment.selected_option;
    if (comment.selected_choice === "a") return optionA;
    if (comment.selected_choice === "b") return optionB;
    return null;
  }

  return (
    <section className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
      <p className="text-sm font-medium text-purple-300">Community Poll</p>

      <h2 className="mt-2 text-2xl font-bold">{question}</h2>

      <p className="mt-2 text-sm text-gray-500">
        Vote, then share the perspective behind your choice.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <button
          type="button"
          onClick={() => vote("a")}
          disabled={Boolean(selectedChoice)}
          className={`rounded-xl border p-4 text-left transition disabled:cursor-not-allowed ${optionClass(
            "a"
          )}`}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="font-medium text-white">{optionA}</p>

            {selectedChoice === "a" && (
              <span className="rounded-full bg-purple-600 px-2 py-1 text-xs text-white">
                Your vote
              </span>
            )}

            {selectedChoice !== "a" && leadingChoice === "a" && (
              <span className="rounded-full border border-purple-500/30 px-2 py-1 text-xs text-purple-300">
                Leading
              </span>
            )}
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-800">
            <div
              className={`h-full rounded-full transition-all ${barClass("a")}`}
              style={{ width: `${percentA}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-gray-400">
            {a} votes · {percentA}%
          </p>
        </button>

        <button
          type="button"
          onClick={() => vote("b")}
          disabled={Boolean(selectedChoice)}
          className={`rounded-xl border p-4 text-left transition disabled:cursor-not-allowed ${optionClass(
            "b"
          )}`}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="font-medium text-white">{optionB}</p>

            {selectedChoice === "b" && (
              <span className="rounded-full bg-purple-600 px-2 py-1 text-xs text-white">
                Your vote
              </span>
            )}

            {selectedChoice !== "b" && leadingChoice === "b" && (
              <span className="rounded-full border border-purple-500/30 px-2 py-1 text-xs text-purple-300">
                Leading
              </span>
            )}
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-800">
            <div
              className={`h-full rounded-full transition-all ${barClass("b")}`}
              style={{ width: `${percentB}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-gray-400">
            {b} votes · {percentB}%
          </p>
        </button>
      </div>

      <form onSubmit={submitPollComment} className="mt-6">
        <label className="text-sm font-medium text-gray-300">
          Share the perspective behind your vote
        </label>

        <textarea
          className="mt-2 h-28 w-full rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-white outline-none placeholder:text-gray-500 focus:border-purple-500/60"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Why did you vote that way? What experience shaped your answer?"
        />

        <p className="mt-2 text-xs text-gray-500">
          Poll posts use this section instead of a separate comment area.
        </p>

        <button className="mt-3 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
          Add Poll Perspective
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold">Poll Perspectives</h3>

        <p className="mt-1 text-sm text-gray-500">
          Why people voted the way they did.
        </p>

        {visiblePollComments.length === 0 ? (
          <p className="mt-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-gray-500">
            No poll perspectives yet. Vote and share the first one.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {visiblePollComments.map((comment) => {
              const selectedOptionLabel = getSelectedOptionLabel(comment);

              return (
                <div
                  key={comment.id}
                  className="rounded-xl border border-neutral-800 bg-neutral-900 p-4"
                >
                  <div className="mb-3 flex flex-wrap gap-2">
                    {selectedOptionLabel && (
                      <span className="inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                        Voted: {selectedOptionLabel}
                      </span>
                    )}

                    {(comment.changed_perspective_count || 0) > 0 && (
                      <span className="inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-200">
                        Changed {comment.changed_perspective_count} perspective
                        {comment.changed_perspective_count === 1 ? "" : "s"}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-500">
                    {comment.anon_avatar || "🕊️"}{" "}
                    {comment.anon_name || "Anonymous"}
                  </p>

                  <p className="mt-2 whitespace-pre-wrap leading-7 text-gray-200">
                    {comment.body}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <PollHelpfulButton
                      commentId={comment.id}
                      initialCount={comment.helpful_count || 0}
                    />

                    <PollChangedPerspectiveButton
                      commentId={comment.id}
                      initialCount={comment.changed_perspective_count || 0}
                    />
                  </div>

                  <ReportButton
                    targetType="poll_comment"
                    targetId={comment.id}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}