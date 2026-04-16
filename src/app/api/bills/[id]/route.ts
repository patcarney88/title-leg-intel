import { NextResponse } from "next/server";

import { getBillById, getBillBySlug } from "@/lib/data";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const bill = getBillById(id) ?? getBillBySlug(id);

  if (!bill) {
    return NextResponse.json({ error: "Bill not found" }, { status: 404 });
  }

  return NextResponse.json({ bill, demoMode: true });
}
