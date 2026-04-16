export type BillJurisdiction = "federal" | "CA" | "TX" | "FL" | "VA" | "NY";

export type BillStatus =
  | "introduced"
  | "in_committee"
  | "on_floor"
  | "passed"
  | "enacted";

export type ImpactLevel = "low" | "medium" | "high";

export interface SourceDocument {
  id: string;
  label: string;
  url: string;
  publishedAt: string;
  sourceType: "bill_text" | "summary" | "analysis";
}

export interface ImpactSummary {
  summary: string;
  impactLevel: ImpactLevel;
  affectedStakeholders: string[];
  citations: string[];
  freshnessLabel: string;
  draft: true;
}

export interface GuidanceDraft {
  summary: string;
  recommendedActions: string[];
  citations: string[];
  draft: true;
}

export interface AuditEvent {
  id: string;
  at: string;
  actor: string;
  action: string;
  detail: string;
}

export interface Bill {
  id: string;
  slug: string;
  title: string;
  jurisdiction: BillJurisdiction;
  billNumber: string;
  status: BillStatus;
  lastUpdated: string;
  hearingDate?: string;
  titleRelevance: string;
  summary: string;
  sourceDocuments: SourceDocument[];
  impactSummary: ImpactSummary;
  guidanceDraft?: GuidanceDraft;
  auditTrail: AuditEvent[];
}
