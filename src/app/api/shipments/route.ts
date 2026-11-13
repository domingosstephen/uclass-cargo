import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

async function isAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("uclass_admin_session")?.value === "authenticated";
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const shipments = await prisma.shipment.findMany({
    orderBy: { updatedAt: "desc" },
    include: { events: { orderBy: { timestamp: "desc" }, take: 1 } },
  });
  return NextResponse.json({ shipments });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  // Use operator-provided tracking number or auto-generate one
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 90000) + 10000;
  const trackingNumber = (data.trackingNumber && data.trackingNumber.trim())
    ? data.trackingNumber.trim()
    : `UCL-${year}${rand}`;

  const parseLat = (v: string) => { const n = parseFloat(v); return isNaN(n) ? 0 : n; };
  const parseLng = (v: string) => { const n = parseFloat(v); return isNaN(n) ? 0 : n; };

  try {
    const shipment = await prisma.shipment.create({
      data: {
        trackingNumber,
        description: data.description,
        origin: data.origin,
        originLat: parseLat(data.originLat),
        originLng: parseLng(data.originLng),
        destination: data.destination,
        destinationLat: parseLat(data.destinationLat),
        destinationLng: parseLng(data.destinationLng),
        currentLocation: data.origin,
        currentLat: parseLat(data.originLat),
        currentLng: parseLng(data.originLng),
        status: data.status || "PENDING",
        cargoType: data.cargoType || "General",
        weight: data.weight || null,
        estimatedArrival: data.estimatedArrival || null,
        clientName: data.clientName || null,
        clientEmail: data.clientEmail || null,
        notes: data.notes || null,
        supplierName: data.supplierName || null,
        supplierAddress: data.supplierAddress || null,
        supplierTel: data.supplierTel || null,
        consigneeName: data.consigneeName || null,
        consigneeAddress: data.consigneeAddress || null,
        consigneeTel: data.consigneeTel || null,
        productName: data.productName || null,
        quantity: data.quantity || null,
        dateOfLoading: data.dateOfLoading || null,
        vesselName: data.vesselName || null,
        vesselNumber: data.vesselNumber || null,
        nextTransitPort: data.nextTransitPort || null,
        events: {
          create: {
            location: data.origin,
            lat: parseLat(data.originLat),
            lng: parseLng(data.originLng),
            description: "Shipment registered and awaiting pickup",
          },
        },
      },
    });
    return NextResponse.json({ shipment, trackingNumber }, { status: 201 });
  } catch (error) {
    console.error("Create shipment error:", error);
    if (typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002") {
      return NextResponse.json({ error: "That tracking number is already in use by another shipment." }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create shipment" }, { status: 500 });
  }
}
