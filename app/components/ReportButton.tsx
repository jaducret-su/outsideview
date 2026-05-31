"use client";

import { useState } from "react";

export default function ReportButton({
  targetType,
  targetId,
}: {
  targetType: "post" | "comment" | "poll_comment";
  targetId: string;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("Harassment or insults");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function submitReport() {
    const res = await fetch("/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target_type: targetType,
        target_id: targetId,
        reason,
        details,
      }),
    });

    if (res.ok) {
      setSubmitted(true);
      setOpen(false);
    } else {
      const data = await res.json();
      alert(data.error || "Report failed.");
    }
  }

  if (submitted) {
    return <span className="text-xs text-gray-500">Reported</span>;
  }

  return (
    <div className="mt-3">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-xs text-gray-500 transition hover:text-red-300"
        >
          Report
        </button>
      ) : (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-sm font-medium text-white">Report content</p>

          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-3 w-full rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-sm text-white"
          >
            <option>Harassment or insults</option>
            <option>Hateful content</option>
            <option>Threatening language</option>
            <option>Private information</option>
            <option>Spam or promotion</option>
            <option>Other</option>
          </select>

          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Optional details"
            className="mt-3 h-20 w-full rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-sm text-white placeholder:text-gray-500"
          />

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={submitReport}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Submit Report
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-neutral-700 px-3 py-2 text-sm text-gray-300 hover:bg-neutral-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}