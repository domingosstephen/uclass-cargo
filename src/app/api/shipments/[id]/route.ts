import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

async function isAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("uclass_admin_session")?.value === "authenticated";
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending", IN_TRANSIT: "In Transit", DEPARTED: "Departed",
  AT_PORT: "At Port", CUSTOMS: "In Customs", OUT_FOR_DELIVERY: "Out for Delivery",
  ON_HOLD: "On Hold", DELIVERED: "Delivered", DELAYED: "Delayed",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const shipment = await prisma.shipment.findUnique({ where: { id } });
  if (!shipment) return NextResponse.json({ error: "Not found" }, { status: 404 });
  let events: unknown[] = [];
  try {
    events = await prisma.shipmentEvent.findMany({ where: { shipmentId: id }, orderBy: { timestamp: "asc" } });
  } catch { /* table not created yet */ }
  return NextResponse.json({ shipment: { ...shipment, events } });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const data = await req.json();

  const parseCoord = (v: unknown): number | undefined => {
    if (v === undefined || v === null || v === "") return undefined;
    const n = parseFloat(String(v));
    return isNaN(n) ? 0 : n;
  };

  try {
    // Fetch existing so partial updates (e.g. tracking-only) don't overwrite other fields
    const existing = await prisma.shipment.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const newLocation = data.currentLocation ?? existing.currentLocation;
    const newLat      = parseCoord(data.currentLat)  ?? existing.currentLat;
    const newLng      = parseCoord(data.currentLng)  ?? existing.currentLng;
    const newStatus   = data.status ?? existing.status;

    const updateData = {
      status:           newStatus,
      currentLocation:  newLocation,
      currentLat:       newLat,
      currentLng:       newLng,
      description:      data.description      ?? existing.description,
      cargoType:        data.cargoType        ?? existing.cargoType,
      weight:           data.weight           ?? existing.weight,
      estimatedArrival: data.estimatedArrival ?? existing.estimatedArrival,
      clientName:       data.clientName       ?? existing.clientName,
      clientEmail:      data.clientEmail      ?? existing.clientEmail,
      notes:            data.notes            ?? existing.notes,
      supplierName:     data.supplierName     ?? existing.supplierName,
      supplierAddress:  data.supplierAddress  ?? existing.supplierAddress,
      supplierTel:      data.supplierTel      ?? existing.supplierTel,
      consigneeName:    data.consigneeName    ?? existing.consigneeName,
      consigneeAddress: data.consigneeAddress ?? existing.consigneeAddress,
      consigneeTel:     data.consigneeTel     ?? existing.consigneeTel,
      productName:      data.productName      ?? existing.productName,
      quantity:         data.quantity         ?? existing.quantity,
      dateOfLoading:    data.dateOfLoading    ?? existing.dateOfLoading,
      vesselName:       data.vesselName       ?? existing.vesselName,
      vesselNumber:     data.vesselNumber     ?? existing.vesselNumber,
      nextTransitPort:  data.nextTransitPort  ?? existing.nextTransitPort,
    };

    // Create a tracking event:
    // - Always when a custom note is provided
    // - Auto-create when location or status changes (so history is always built)
    const locationChanged = newLocation !== existing.currentLocation;
    const statusChanged   = newStatus !== existing.status;
    const hasNote         = data.eventDescription && data.eventDescription.trim();

    if (hasNote || locationChanged || statusChanged) {
      let description: string;
      if (hasNote) {
        description = data.eventDescription.trim();
      } else if (locationChanged && statusChanged) {
        description = `${STATUS_LABELS[newStatus] || newStatus} — ${newLocation}`;
      } else if (locationChanged) {
        description = `Location updated to ${newLocation}`;
      } else {
        description = `Status changed to ${STATUS_LABELS[newStatus] || newStatus}`;
      }

      // Non-blocking: if ShipmentEvent table not yet in DB, update still succeeds
      try {
        await prisma.shipmentEvent.create({
          data: {
            shipmentId: id,
            location: newLocation,
            lat: newLat,
            lng: newLng,
            description,
          },
        });
      } catch (eventErr) {
        console.error("Event create failed (table may not exist yet):", eventErr);
      }
    }

    const shipment = await prisma.shipment.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ shipment });
  } catch (error) {
    console.error("Update shipment error:", error);
    return NextResponse.json({ error: "Failed to update shipment" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.shipment.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
