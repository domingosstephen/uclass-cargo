import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const trackingNumber = searchParams.get("id");

  if (!trackingNumber) {
    return NextResponse.json({ error: "Tracking number required" }, { status: 400 });
  }

  try {
    const shipment = await prisma.shipment.findUnique({
      where: { trackingNumber: trackingNumber.toUpperCase() },
      include: {
        events: {
          orderBy: { timestamp: "asc" },
        },
      },
    });

    if (!shipment) {
      return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
    }

    return NextResponse.json({ shipment });
  } catch (error) {
    console.error("Tracking error:", error);
    return NextResponse.json({ error: "Failed to fetch shipment" }, { status: 500 });
  }
}
