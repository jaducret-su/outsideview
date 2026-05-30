"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [perspectiveRequest, setPerspectiveRequest] = useState("");
  const [lifeStage, setLifeStage] = useState("");

  async function submitPost(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        perspectiveRequest,
        lifeStage,}),
    });

    const data = await res.json();

    console.log("API response:", data);

    if (res.ok) {
      router.push("/feed");
    } else {
      alert(data.error || "Post failed.");
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Share Anonymously</h1>

      <form onSubmit={submitPost} className="space-y-4">
        <input
  className="w-full border border-neutral-700 bg-neutral-900 text-white p-3 rounded placeholder-gray-400"
  placeholder="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

<textarea
  className="w-full border border-neutral-700 bg-neutral-900 text-white p-3 rounded h-64 placeholder-gray-400"
  placeholder="What is going on?"
  value={body}
  onChange={(e) => setBody(e.target.value)}
/>

<div>
  <label className="block mb-2 text-sm text-gray-300">
    What perspectives are you looking for?
  </label>

  <select
    className="w-full border border-neutral-700 bg-neutral-900 text-white p-3 rounded"
    value={perspectiveRequest}
    onChange={(e) => setPerspectiveRequest(e.target.value)}
  >
    <option value="">Anyone</option>
    <option value="People older than me">
      People older than me
    </option>
    <option value="People younger than me">
      People younger than me
    </option>
    <option value="Parents">
      Parents
    </option>
    <option value="Students">
      Students
    </option>
    <option value="Professionals">
      Professionals
    </option>
    <option value="Different cultures">
      Different cultures
    </option>
  </select>
</div>

<div>
  <label className="block mb-2 text-sm text-gray-300">
    Life Stage (Optional)
  </label>

  <select
    className="w-full border border-neutral-700 bg-neutral-900 text-white p-3 rounded"
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

<button className="bg-white text-black px-4 py-2 rounded font-medium">
  Post
</button>
      </form>
    </main>
  );
}