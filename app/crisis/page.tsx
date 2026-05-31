import Link from "next/link";

export default function CrisisPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 text-white">
      <section className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
        <p className="text-sm font-medium text-red-300">Immediate support</p>

        <h1 className="mt-2 text-4xl font-bold">
          If you are in danger, seek help now.
        </h1>

        <p className="mt-4 text-gray-300">
          OutsideView is not an emergency, crisis, medical, or mental health service.
          If you may hurt yourself or someone else, contact emergency services immediately.
        </p>
      </section>

      <section className="mt-8 space-y-6 text-gray-300">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
          <h2 className="text-2xl font-semibold text-white">United States and Canada</h2>
          <p className="mt-2">
            Call or text <strong>988</strong> for the Suicide & Crisis Lifeline.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
          <h2 className="text-2xl font-semibold text-white">Emergency danger</h2>
          <p className="mt-2">
            If there is immediate danger, call your local emergency number now.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
          <h2 className="text-2xl font-semibold text-white">Outside the U.S. or Canada</h2>
          <p className="mt-2">
            Contact your local emergency services or a crisis hotline in your country.
          </p>
        </div>
      </section>

      <Link href="/" className="mt-10 inline-block text-purple-300 hover:text-purple-200">
        ← Back to OutsideView
      </Link>
    </main>
  );
}