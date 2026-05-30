"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentForm({ postId }: { postId: string }) {
  const router = useRouter();
  const [body, setBody] = useState("");

  async function submitComment(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, body }),
    });

    const data = await res.json();

    if (res.ok) {
      setBody("");
      router.refresh();
    } else {
      alert(data.error || "Comment failed.");
    }
  }

  return (
    <form onSubmit={submitComment} className="space-y-3">
      <textarea
        className="w-full border p-4 rounded-xl h-32"
        placeholder="Share a thoughtful perspective..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

        <select name="perspective_tag" className="w-full rounded p-3 text-black">
  <option value="">Choose a perspective tag</option>
  <option value="Been Through This">Been Through This</option>
  <option value="Different Viewpoint">Different Viewpoint</option>
  <option value="Professional Experience">Professional Experience</option>
  <option value="Parent Perspective">Parent Perspective</option>
  <option value="Student Perspective">Student Perspective</option>
  <option value="Career Perspective">Career Perspective</option>
  <option value="Relationship Perspective">Relationship Perspective</option>
</select>

      <button className="bg-black text-white px-5 py-3 rounded">
        Share Perspective
      </button>
    </form>
  );
}