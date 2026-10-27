export const dynamic = "force-dynamic";
import { checkAdminAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, Plus, Search } from "lucide-react";
import DeleteShipmentButton from "@/components/admin/DeleteShipmentButton";
import UpdateTrackingModal from "@/components/admin/UpdateTrackingModal";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "status-pending", IN_TRANSIT: "status-in-transit", DEPARTED: "status-departed",
  AT_PORT: "status-at-port", CUSTOMS: "status-customs", OUT_FOR_DELIVERY: "status-out-for-delivery",
  ON_HOLD: "status-on-hold", DELIVERED: "status-delivered", DELAYED: "status-delayed",
};
const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending", IN_TRANSIT: "In Transit", DEPARTED: "Departed",
  AT_PORT: "At Port", CUSTOMS: "In Customs", OUT_FOR_DELIVERY: "Out for Delivery",
  ON_HOLD: "On Hold", DELIVERED: "Delivered", DELAYED: "Delayed",
};

export default async function AllShipmentsPage() {
  await checkAdminAuth();

  const shipments = await prisma.shipment.findMany({
    orderBy: { updatedAt: "desc" },
    include: { events: { orderBy: { timestamp: "desc" }, take: 1 } },
  });

  return (
    <div className="min-h-screen bg-[#f4f8ff]">
      <header className="bg-white border-b border-[#e2e8f4] sticky top-0 z-50 shadow-sm">
        <div className="container-custom py-4 flex items-center gap-4">
          <Link href="/admin" className="text-[#6a80a0] hover:text-[#0a1628] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex-1">
            <h1 className="text-base font-bold text-[#0a1628]">All Shipments</h1>
            <p className="text-xs text-[#6a80a0]">{shipments.length} total shipment{shipments.length !== 1 ? "s" : ""}</p>
          </div>
          <Link href="/admin/shipments/new" className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold">
            <Plus size={16} />New Shipment
          </Link>
        </div>
      </header>

      <div className="container-custom py-8">
        <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e2e8f4] bg-[#f8fafc]">
                  {["Tracking #", "Description", "Origin → Destination", "Current Location", "Status", "Updated", "Actions"].map((h) => (
                    <th key={h} className="text-left text-xs text-[#6a80a0] font-medium px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shipments.map((s) => (
                  <tr key={s.id} className="border-b border-[#f0f4f8] hover:bg-[#f8fafc] transition-colors">
                    <td className="px-5 py-4 font-mono text-[#0055ff] text-xs whitespace-nowrap">{s.trackingNumber}</td>
                    <td className="px-5 py-4 text-[#0a1628] max-w-[180px] truncate">{s.description}</td>
                    <td className="px-5 py-4 text-[#6a80a0] text-xs whitespace-nowrap">{s.origin} → {s.destination}</td>
                    <td className="px-5 py-4 text-[#6a80a0] text-xs max-w-[140px] truncate">{s.currentLocation}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[s.status] || ""}`}>
                        {STATUS_LABELS[s.status] || s.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[#a0b0c8] text-xs whitespace-nowrap">{new Date(s.updatedAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <UpdateTrackingModal id={s.id} trackingNumber={s.trackingNumber} currentLocation={s.currentLocation} currentStatus={s.status} />
                        <Link
                          href={`/admin/shipments/${s.id}`}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#0055ff] border border-[#0055ff]/20 hover:bg-[#0055ff]/5 transition-colors bg-white"
                        >
                          <Search size={12} />
                          Edit
                        </Link>
                        <DeleteShipmentButton id={s.id} trackingNumber={s.trackingNumber} />
                      </div>
                    </td>
                  </tr>
                ))}
                {shipments.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-[#a0b0c8]">
                      No shipments yet.{" "}
                      <Link href="/admin/shipments/new" className="text-[#0055ff] hover:underline">Create one</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
