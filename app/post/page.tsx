"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAnonymousIdentity, AnonymousIdentity } from "@/lib/anonymousIdentity";

export default function CreatePost() {
  const router = useRouter();

  const [identity, setIdentity] = useState<AnonymousIdentity | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [perspectiveRequest, setPerspectiveRequest] = useState("");
  const [lifeStage, setLifeStage] = useState("");
  const [isWeeklyReflection, setIsWeeklyReflection] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptionA, setPollOptionA] = useState("");
  const [pollOptionB, setPollOptionB] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIdentity(getAnonymousIdentity());

    const params = new URLSearchParams(window.location.search);

    if (params.get("reflection") === "weekly") {
      setIsWeeklyReflection(true);
      setTitle("My response to this week's reflection");
    }
  }, []);

  async function submitPost(e: React.FormEvent) {
    e.preventDefault();

    if (!identity) return;

    if (!title.trim() || !body.trim()) {
      alert("Please add both a title and your story.");
      return;
    }

    setIsSubmitting(true);

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.trim(),
        body: body.trim(),
        perspective_request: perspectiveRequest,
        life_stage: lifeStage,
        is_weekly_reflection: isWeeklyReflection,
        poll_question: pollQuestion.trim() || null,
        poll_option_a: pollOptionA.trim() || null,
        poll_option_b: pollOptionB.trim() || null,
        anon_id: identity.anon_id,
        anonymous_name: identity.anon_name,
        anon_avatar: identity.anon_avatar,
      }),
    });

    const data = await res.json();
    setIsSubmitting(false);

    if (res.ok) {
      router.push("/feed");
    } else {
      alert(data.error || "Post failed.");
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-6 text-white">
      <Link href="/feed" className="text-sm text-gray-400 transition hover:text-white">
        ← Back to Feed
      </Link>

      <section className="mt-8">
        <p className="text-sm font-medium text-purple-300">Share anonymously</p>

        <h1 className="mt-2 text-4xl font-bold">
          What would you like another perspective on?
        </h1>

        <p className="mt-3 text-gray-400">
          Your identity stays anonymous, but your anonymous name stays consistent on this browser.
        </p>

        {identity && (
          <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-neutral-800 bg-neutral-950 px-4 py-2">
            <span className="text-xl">{identity.anon_avatar}</span>
            <span className="text-sm text-gray-300">
              Posting as {identity.anon_name}
            </span>
          </div>
        )}
      </section>

      <form onSubmit={submitPost} className="mt-8 space-y-6">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Title
          </label>

          <input
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-white outline-none placeholder:text-gray-500 focus:border-purple-500/60"
            placeholder="Example: I got the job I wanted, but I still feel lost"
            value={title}
            maxLength={120}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            What is going on?
          </label>

          <textarea
            className="h-72 w-full rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-white outline-none placeholder:text-gray-500 focus:border-purple-500/60"
            placeholder="Share the situation and what kind of perspective might help."
            value={body}
            maxLength={2500}
            onChange={(e) => setBody(e.target.value)}
          />

          <p className="mt-2 text-right text-xs text-gray-500">
            {body.length}/2500
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              What perspectives are you hoping for?
            </label>

            <select
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-white"
              value={perspectiveRequest}
              onChange={(e) => setPerspectiveRequest(e.target.value)}
            >
              <option value="">Anyone</option>
              <option value="People older than me">People older than me</option>
              <option value="People younger than me">People younger than me</option>
              <option value="Parents">Parents</option>
              <option value="Students">Students</option>
              <option value="Professionals">Professionals</option>
              <option value="Different cultures">Different cultures</option>
            </select>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Life stage, optional
            </label>

            <select
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-white"
              value={lifeStage}
              onChange={(e) => setLifeStage(e.target.value)}
            >
              <option value="">Prefer not to say</option>
              <option value="High School">High School</option>
              <option value="College">College</option>
              <option value="Early Career">Early Career</option>
              <option value="Parent">Parent</option>
              <option value="Retired">Retired</option>
            </select>
          </div>
        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={isWeeklyReflection}
              onChange={(e) => setIsWeeklyReflection(e.target.checked)}
              className="mt-1"
            />

            <span>
              <span className="block font-medium text-purple-300">
                This responds to the Weekly Reflection
              </span>

              <span className="text-sm text-gray-400">
                These posts appear in a separate reflection section.
              </span>
            </span>
          </label>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
          <p className="text-sm font-medium text-gray-300">
            Optional community poll
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Use this only if a quick vote would help people understand your situation.
          </p>

          <input
            className="mt-4 w-full rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-white"
            placeholder="Poll question"
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
          />

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input
              className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-white"
              placeholder="Option A"
              value={pollOptionA}
              onChange={(e) => setPollOptionA(e.target.value)}
            />

            <input
              className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-white"
              placeholder="Option B"
              value={pollOptionB}
              onChange={(e) => setPollOptionB(e.target.value)}
            />
          </div>
        </div>

        <button
          disabled={isSubmitting}
          className="w-full rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:opacity-60"
        >
          {isSubmitting ? "Posting..." : "Post Anonymously"}
        </button>
      </form>
    </main>
  );
}