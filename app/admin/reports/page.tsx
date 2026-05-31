export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

  if (key !== process.env.ADMIN_REPORTS_KEY) {
    return (
      <main className="mx-auto max-w-3xl p-6 text-white">
        <h1 className="text-2xl font-bold">Admin access required</h1>
        <p className="mt-2 text-gray-400">
          Add your admin key to the URL to view reports.
        </p>
      </main>
    );
  }

  const { data: reports } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-4xl p-6 text-white">
      <h1 className="text-4xl font-bold">Reports</h1>
      <p className="mt-2 text-gray-400">
        Review reported posts, perspectives, and poll comments.
      </p>

      <div className="mt-8 space-y-4">
        {reports?.map((report) => (
          <div
            key={report.id}
            className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5"
          >
            <div className="flex flex-wrap justify-between gap-3">
              <p className="font-medium text-white">{report.reason}</p>
              <span className="text-sm text-gray-500">{report.status}</span>
            </div>

            <p className="mt-2 text-sm text-gray-400">
              Type: {report.target_type}
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Target ID: {report.target_id}
            </p>

            {report.details && (
              <p className="mt-3 rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-sm text-gray-300">
                {report.details}
              </p>
            )}

            {report.target_type === "post" && (
              <a
                href={`/post/${report.target_id}`}
                className="mt-4 inline-block text-sm text-purple-300 hover:text-purple-200"
              >
                Open reported post
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}