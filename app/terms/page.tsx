import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 text-white">
      <h1 className="text-4xl font-bold">Terms of Service</h1>

      <p className="mt-4 text-gray-400">
        Last updated: May 31, 2026
      </p>

      <section className="mt-8 space-y-6 text-gray-300">
        <div>
          <h2 className="text-2xl font-semibold text-white">1. What OutsideView Is</h2>
          <p className="mt-2">
            OutsideView is a community platform where users can anonymously share situations
            and receive perspectives from other users. The platform is intended for reflection,
            discussion, and personal viewpoints.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">2. Not Professional Advice</h2>
          <p className="mt-2">
            Content on OutsideView is not medical, mental health, legal, financial, therapeutic,
            or emergency advice. Users should not rely on OutsideView as a substitute for qualified
            professional support.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">3. Crisis Situations</h2>
          <p className="mt-2">
            OutsideView is not a crisis service. If you may hurt yourself or someone else, contact
            emergency services immediately. In the U.S. and Canada, call or text 988 for crisis support.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">4. User Responsibility</h2>
          <p className="mt-2">
            You are responsible for what you post. Do not post threats, harassment, hate speech,
            private identifying information, spam, or content that encourages harm.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">5. Content Removal</h2>
          <p className="mt-2">
            We may remove posts, comments, poll comments, or other content at our discretion,
            especially if it violates our guidelines or creates safety concerns.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">6. No Guarantee of Accuracy</h2>
          <p className="mt-2">
            User-generated content may be incomplete, inaccurate, biased, or inappropriate.
            OutsideView does not verify the accuracy of user perspectives.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">7. Anonymous Use</h2>
          <p className="mt-2">
            OutsideView uses anonymous identities, but users should still avoid posting private
            information about themselves or others.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">8. Contact</h2>
          <p className="mt-2">
            For questions or concerns, use the reporting tools on the platform or contact the site owner.
          </p>
        </div>
      </section>

      <Link href="/" className="mt-10 inline-block text-purple-300 hover:text-purple-200">
        ← Back to OutsideView
      </Link>
    </main>
  );
}