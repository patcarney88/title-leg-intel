import type { Bill, GuidanceDraft, ImpactSummary } from "@/lib/types";
import { generateStructuredDraft } from "@/lib/openai";

interface GeneratedBillDraft {
  impactSummary: string;
  impactLevel: "low" | "medium" | "high";
  affectedStakeholders: string[];
  citations: string[];
  guidanceSummary: string;
  guidanceActions: string[];
}

function buildPrompt(bill: Bill) {
  return `Analyze this title-insurance-relevant bill and return JSON with keys impactSummary, impactLevel, affectedStakeholders, citations, guidanceSummary, guidanceActions.\n\nBill: ${bill.billNumber} - ${bill.title}\nJurisdiction: ${bill.jurisdiction}\nStatus: ${bill.status}\nTitle relevance: ${bill.titleRelevance}\nSummary: ${bill.summary}\nSources: ${bill.sourceDocuments
    .map((source) => `${source.label} (${source.url})`)
    .join(", ")}`;
}

export async function getBillDraftContent(bill: Bill): Promise<{
  impactSummary: ImpactSummary;
  guidanceDraft?: GuidanceDraft;
}> {
  if (process.env.OPENAI_API_KEY) {
    try {
      const draft = (await generateStructuredDraft(buildPrompt(bill))) as unknown as GeneratedBillDraft;

      return {
        impactSummary: {
          summary: String(draft.impactSummary || bill.impactSummary.summary),
          impactLevel: draft.impactLevel || bill.impactSummary.impactLevel,
          affectedStakeholders:
            Array.isArray(draft.affectedStakeholders) && draft.affectedStakeholders.length > 0
              ? draft.affectedStakeholders.map(String)
              : bill.impactSummary.affectedStakeholders,
          citations:
            Array.isArray(draft.citations) && draft.citations.length > 0
              ? draft.citations.map(String)
              : bill.impactSummary.citations,
          freshnessLabel: `${bill.impactSummary.freshnessLabel} • AI refreshed`,
          draft: true,
        },
        guidanceDraft: {
          summary: String(draft.guidanceSummary || bill.guidanceDraft?.summary || bill.impactSummary.summary),
          recommendedActions:
            Array.isArray(draft.guidanceActions) && draft.guidanceActions.length > 0
              ? draft.guidanceActions.map(String)
              : bill.guidanceDraft?.recommendedActions || [],
          citations:
            Array.isArray(draft.citations) && draft.citations.length > 0
              ? draft.citations.map(String)
              : bill.guidanceDraft?.citations || bill.impactSummary.citations,
          draft: true,
        },
      };
    } catch {
      return {
        impactSummary: bill.impactSummary,
        guidanceDraft: bill.guidanceDraft,
      };
    }
  }

  return {
    impactSummary: bill.impactSummary,
    guidanceDraft: bill.guidanceDraft,
  };
}
