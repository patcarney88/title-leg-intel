import { seedBills } from "@/lib/seed-data";
import type { Bill } from "@/lib/types";

export function getBills(): Bill[] {
  return seedBills;
}

export function getBillBySlug(slug: string): Bill | undefined {
  return seedBills.find((bill) => bill.slug === slug);
}
