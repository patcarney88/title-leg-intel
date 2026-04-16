import Link from "next/link";

import { getBills } from "@/lib/data";

const statusClasses: Record<string, string> = {
  introduced: "bg-slate-800 text-slate-200",
  in_committee: "bg-amber-500/20 text-amber-200",
  on_floor: "bg-sky-500/20 text-sky-200",
  passed: "bg-emerald-500/20 text-emerald-200",
  enacted: "bg-violet-500/20 text-violet-200",
};

export default function Home() {
  const bills = getBills();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="border-b border-white/10 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
              Title Legislative Intelligence, demo seed mode
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              One dashboard for the bills that can punch the title industry in the face.
            </h1>
            <p className="text-lg leading-8 text-slate-300">
              Monitor high-impact federal and state legislation, see citation-backed draft analysis,
              and prepare compliance guidance before the rules land on your ops team.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-slate-400">Tracked bills</div>
              <div className="mt-2 text-3xl font-semibold">{bills.length}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-slate-400">Jurisdictions</div>
              <div className="mt-2 text-3xl font-semibold">5 + federal</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-slate-400">Guidance-ready bills</div>
              <div className="mt-2 text-3xl font-semibold">1</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Bills that matter now</h2>
            <p className="mt-2 text-sm text-slate-400">
              Freshness and draft labels stay visible so Pat can demo this without pretending AI is law.
            </p>
          </div>
          <div className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-200">
            AI outputs are draft with citations
          </div>
        </div>

        <div className="grid gap-4">
          {bills.map((bill) => (
            <Link
              key={bill.id}
              href={`/bills/${bill.slug}`}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/40 hover:bg-white/[0.05]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">
                      {bill.jurisdiction}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide ${statusClasses[bill.status]}`}
                    >
                      {bill.status.replace("_", " ")}
                    </span>
                    <span>{bill.billNumber}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white transition group-hover:text-cyan-200">
                    {bill.title}
                  </h3>
                  <p className="max-w-3xl text-sm leading-7 text-slate-300">{bill.titleRelevance}</p>
                </div>
                <div className="min-w-64 space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Impact</div>
                    <div className="mt-2 text-lg font-medium capitalize text-white">
                      {bill.impactSummary.impactLevel}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Freshness</div>
                    <div className="mt-2 text-sm text-slate-300">{bill.impactSummary.freshnessLabel}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
