import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

async function isAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("uclass_admin_session")?.value === "authenticated";
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const shipment = await prisma.shipment.findUnique({
    where: { id },
    include: { events: { orderBy: { timestamp: "asc" } } },
  });
  if (!shipment) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ shipment });
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

  try {
    const updateData: Record<string, unknown> = {
      status: data.status,
      currentLocation: data.currentLocation,
      currentLat: parseFloat(data.currentLat),
      currentLng: parseFloat(data.currentLng),
      description: data.description,
      cargoType: data.cargoType,
      weight: data.weight,
      estimatedArrival: data.estimatedArrival,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      notes: data.notes,
      supplierName: data.supplierName,
      supplierAddress: data.supplierAddress,
      supplierTel: data.supplierTel,
      consigneeName: data.consigneeName,
      consigneeAddress: data.consigneeAddress,
      consigneeTel: data.consigneeTel,
      productName: data.productName,
      quantity: data.quantity,
      dateOfLoading: data.dateOfLoading,
      vesselName: data.vesselName,
      vesselNumber: data.vesselNumber,
      nextTransitPort: data.nextTransitPort,
    };

    // Add an event if location changed
    if (data.addEvent && data.eventDescription) {
      await prisma.shipmentEvent.create({
        data: {
          shipmentId: id,
          location: data.currentLocation,
          lat: parseFloat(data.currentLat),
          lng: parseFloat(data.currentLng),
          description: data.eventDescription,
        },
      });
    }

    const shipment = await prisma.shipment.update({
      where: { id },
      data: updateData,
      include: { events: { orderBy: { timestamp: "asc" } } },
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
