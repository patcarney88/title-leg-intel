import { notFound } from "next/navigation";

import { getBillById } from "@/lib/data";

interface BillPageProps {
  params: Promise<{ id: string }>;
}

export default async function BillPage({ params }: BillPageProps) {
  const { id } = await params;
  const bill = getBillById(id);

  if (!bill) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span>{bill.jurisdiction}</span>
            <span>•</span>
            <span>{bill.billNumber}</span>
            <span>•</span>
            <span>Last updated {new Date(bill.lastUpdated).toLocaleDateString()}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-white">{bill.title}</h1>
          <p className="mt-4 max-w-4xl text-lg text-slate-300">{bill.summary}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-white">Draft impact summary</h2>
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-200">
                  Draft with citations
                </span>
              </div>
              <p className="mt-4 text-base leading-8 text-slate-300">{bill.impactSummary.summary}</p>
              <div className="mt-6">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Affected stakeholders</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {bill.impactSummary.affectedStakeholders.map((stakeholder) => (
                    <span key={stakeholder} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-100">
                      {stakeholder}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {bill.guidanceDraft ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-white">Compliance guidance draft</h2>
                  <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-200">
                    Draft guidance
                  </span>
                </div>
                <p className="mt-4 text-base leading-8 text-slate-300">{bill.guidanceDraft.summary}</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  {bill.guidanceDraft.recommendedActions.map((action) => (
                    <li key={action} className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3">
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-lg font-semibold text-white">Status + provenance</h2>
              <dl className="mt-4 space-y-4 text-sm text-slate-300">
                <div>
                  <dt className="text-slate-500">Current status</dt>
                  <dd className="mt-1 font-medium text-white">{bill.status.replace("_", " ")}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Freshness</dt>
                  <dd className="mt-1">{bill.impactSummary.freshnessLabel}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Source documents</dt>
                  <dd className="mt-2 space-y-2">
                    {bill.sourceDocuments.map((source) => (
                      <a key={source.id} href={source.url} className="block rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-2 hover:border-cyan-400/30 hover:text-cyan-200">
                        {source.label}
                      </a>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-lg font-semibold text-white">Audit trail</h2>
              <div className="mt-4 space-y-3">
                {bill.auditTrail.map((event) => (
                  <div key={event.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{event.action}</div>
                    <p className="mt-2 text-sm text-slate-300">{event.detail}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      {event.actor} • {new Date(event.at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
