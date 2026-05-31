import Link from "next/link";

export default function GuidelinesPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 text-white">
      <h1 className="text-4xl font-bold">Community Guidelines</h1>

      <p className="mt-4 text-gray-400">
        OutsideView exists to help people gain thoughtful perspectives from people outside
        their normal world.
      </p>

      <section className="mt-8 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">
        <h2 className="text-2xl font-semibold text-white">Core Rule</h2>
        <p className="mt-2 text-gray-300">
          Share perspectives that help people see more clearly. Do not attack, shame,
          threaten, or dehumanize others.
        </p>
      </section>

      <section className="mt-8 space-y-6 text-gray-300">
        <div>
          <h2 className="text-2xl font-semibold text-white">Allowed</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Personal experiences</li>
            <li>Thoughtful disagreement</li>
            <li>Questions that help someone reflect</li>
            <li>Different viewpoints shared respectfully</li>
            <li>Perspectives based on your own life experience</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Not Allowed</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Personal insults such as calling someone stupid, dumb, pathetic, or worthless</li>
            <li>Harassment, bullying, or repeated attacks</li>
            <li>Hate speech or identity-based attacks</li>
            <li>Threats or encouragement of harm</li>
            <li>Doxxing or posting private identifying information</li>
            <li>Spam, scams, promotions, or irrelevant links</li>
            <li>Impersonating professionals or presenting opinions as professional advice</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Crisis and Safety</h2>
          <p className="mt-2">
            OutsideView is not a crisis service. If you are in immediate danger or may harm yourself
            or others, contact emergency services. In the U.S. and Canada, call or text 988.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Professional Advice</h2>
          <p className="mt-2">
            Do not present your comments as medical, legal, financial, mental health, or emergency
            advice. Share personal perspective, not professional direction.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Reporting</h2>
          <p className="mt-2">
            If you see content that violates these guidelines, use the Report button. Reports help
            keep the community thoughtful and safe.
          </p>
        </div>
      </section>

      <Link href="/" className="mt-10 inline-block text-purple-300 hover:text-purple-200">
        ← Back to OutsideView
      </Link>
    </main>
  );
}