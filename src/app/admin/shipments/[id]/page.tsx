export const dynamic = "force-dynamic";
import { checkAdminAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ShipmentForm from "@/components/admin/ShipmentForm";

export default async function EditShipmentPage({ params }: { params: Promise<{ id: string }> }) {
  await checkAdminAuth();
  const { id } = await params;

  const shipment = await prisma.shipment.findUnique({
    where: { id },
    include: { events: { orderBy: { timestamp: "asc" } } },
  });

  if (!shipment) notFound();

  return (
    <div className="min-h-screen bg-[#f4f8ff]">
      <header className="bg-white border-b border-[#e2e8f4] sticky top-0 z-50 shadow-sm">
        <div className="container-custom py-4 flex items-center gap-4">
          <Link href="/admin" className="text-[#6a80a0] hover:text-[#0a1628] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-base font-bold text-[#0a1628]">
              Edit Shipment{" "}
              <span className="text-[#0055ff] font-mono text-sm">{shipment.trackingNumber}</span>
            </h1>
            <p className="text-xs text-[#6a80a0]">Update location, status, and shipment details</p>
          </div>
        </div>
      </header>
      <div className="container-custom py-8 max-w-4xl">
        <ShipmentForm mode="edit" shipment={JSON.parse(JSON.stringify(shipment))} />
      </div>
    </div>
  );
}
