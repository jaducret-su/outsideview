import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 text-white">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>

      <p className="mt-4 text-gray-400">
        Last updated: May 31, 2026
      </p>

      <section className="mt-8 space-y-6 text-gray-300">
        <div>
          <h2 className="text-2xl font-semibold text-white">1. What We Collect</h2>
          <p className="mt-2">
            OutsideView stores the content users submit, including stories, perspectives,
            poll responses, reports, anonymous profile information, and related timestamps.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">2. Anonymous Identity</h2>
          <p className="mt-2">
            OutsideView creates a browser-based anonymous identity using local storage.
            This identity may include an anonymous name, anonymous avatar, and anonymous ID.
            It is not intended to reveal your real-world identity.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">3. Local Storage</h2>
          <p className="mt-2">
            Your browser may store your anonymous identity so your anonymous name remains consistent
            on the same device and browser. Clearing browser storage may reset this identity.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">4. Public Content</h2>
          <p className="mt-2">
            Stories, perspectives, polls, and reflection responses may be publicly visible.
            Do not post information you want to keep private.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">5. Reports and Moderation</h2>
          <p className="mt-2">
            Reports may be stored so content can be reviewed and moderated. Reports help keep
            OutsideView respectful and safe.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">6. Third-Party Services</h2>
          <p className="mt-2">
            OutsideView uses services such as Vercel for hosting and Supabase for database storage.
            These services may process technical information needed to operate the website.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">7. No Sensitive Information</h2>
          <p className="mt-2">
            Users should not submit sensitive personal information, private addresses, phone numbers,
            financial information, medical records, or identifying details about others.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">8. Changes</h2>
          <p className="mt-2">
            This policy may change as OutsideView develops. Continued use of the website means you
            accept the current version of this policy.
          </p>
        </div>
      </section>

      <Link href="/" className="mt-10 inline-block text-purple-300 hover:text-purple-200">
        ← Back to OutsideView
      </Link>
    </main>
  );
}