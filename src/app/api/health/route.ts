import { NextResponse } from "next/server";

import { seedMeta } from "@/lib/meta";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "title-leg-intel",
    demoMode: seedMeta.demoMode,
    billCount: seedMeta.billCount,
    lastSeeded: seedMeta.lastSeeded,
    source: seedMeta.source,
  });
}
