import { NextResponse } from "next/server";

import { getBills } from "@/lib/data";

export async function GET() {
  return NextResponse.json({
    bills: getBills(),
    count: getBills().length,
    demoMode: true,
  });
}
