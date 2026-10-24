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
    });

    if (!shipment) {
      return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
    }

    let events: unknown[] = [];
    try {
      events = await prisma.shipmentEvent.findMany({
        where: { shipmentId: shipment.id },
        orderBy: { timestamp: "asc" },
      });
    } catch { /* ShipmentEvent table not yet created */ }

    return NextResponse.json({ shipment: { ...shipment, events } });
  } catch (error) {
    console.error("Tracking error:", error);
    return NextResponse.json({ error: "Failed to fetch shipment" }, { status: 500 });
  }
}
