"use client";

import { useState } from "react";
import { getAnonymousIdentity } from "@/lib/anonymousIdentity";

export default function CommentForm({ postId }: { postId: string }) {
  const [body, setBody] = useState("");
  const [perspectiveTag, setPerspectiveTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitComment(e: React.FormEvent) {
    e.preventDefault();

    const identity = getAnonymousIdentity();

    if (!body.trim()) {
      alert("Please write a perspective first.");
      return;
    }

    setIsSubmitting(true);

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: postId,
        body: body.trim(),
        perspective_tag: perspectiveTag,
        anon_id: identity.anon_id,
        anonymous_name: identity.anon_name,
        anon_avatar: identity.anon_avatar,
      }),
    });

    setIsSubmitting(false);

    if (res.ok) {
      setBody("");
      setPerspectiveTag("");
      window.location.reload();
    } else {
      const data = await res.json();
      alert(data.error || "Perspective failed.");
    }
  }

  return (
    <form onSubmit={submitComment} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-300">
          Add a perspective
        </label>
        <textarea
          className="mt-2 h-32 w-full rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-white placeholder:text-gray-500"
          placeholder="Share a thoughtful viewpoint, personal experience, or question that may help them see this differently."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <select
        className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-white"
        value={perspectiveTag}
        onChange={(e) => setPerspectiveTag(e.target.value)}
      >
        <option value="">Perspective type</option>
        <option value="Been Through This">Been Through This</option>
        <option value="Different Viewpoint">Different Viewpoint</option>
        <option value="Professional Experience">Professional Experience</option>
        <option value="Parent Perspective">Parent Perspective</option>
        <option value="Student Perspective">Student Perspective</option>
        <option value="Career Perspective">Career Perspective</option>
        <option value="Relationship Perspective">Relationship Perspective</option>
      </select>

      <button
        disabled={isSubmitting}
        className="rounded-lg bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700 disabled:opacity-60"
      >
        {isSubmitting ? "Posting..." : "Share Perspective"}
      </button>
    </form>
  );
}