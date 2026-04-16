import { NextResponse } from "next/server";

import { getBillBySlug } from "@/lib/data";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const bill = getBillBySlug(slug);

  if (!bill) {
    return NextResponse.json({ error: "Bill not found" }, { status: 404 });
  }

  return NextResponse.json({ bill, demoMode: true });
}
