export const dynamic = "force-dynamic";
import { checkAdminAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import AdminLogout from "@/components/admin/AdminLogout";
import { Package, Plus, Mail, TrendingUp, Search } from "lucide-react";
import DeleteShipmentButton from "@/components/admin/DeleteShipmentButton";

export default async function AdminDashboard() {
  await checkAdminAuth();

  let shipmentCount = 0, pendingCount = 0, inTransitCount = 0, contactCount = 0;
  let recentShipments: Awaited<ReturnType<typeof prisma.shipment.findMany>> = [];
  let dbError: string | null = null;

  try {
    [shipmentCount, pendingCount, inTransitCount, contactCount] = await Promise.all([
      prisma.shipment.count(),
      prisma.shipment.count({ where: { status: "PENDING" } }),
      prisma.shipment.count({ where: { status: "IN_TRANSIT" } }),
      prisma.contactSubmission.count({ where: { read: false } }),
    ]);
    recentShipments = await prisma.shipment.findMany({
      take: 8,
      orderBy: { updatedAt: "desc" },
    });
  } catch (e) {
    dbError = e instanceof Error ? e.message : "Database connection failed";
  }

  const STATUS_COLORS: Record<string, string> = {
    PENDING: "status-pending", IN_TRANSIT: "status-in-transit", AT_PORT: "status-at-port",
    CUSTOMS: "status-customs", DELIVERED: "status-delivered", DELAYED: "status-delayed",
  };
  const STATUS_LABELS: Record<string, string> = {
    PENDING: "Pending", IN_TRANSIT: "In Transit", AT_PORT: "At Port",
    CUSTOMS: "In Customs", DELIVERED: "Delivered", DELAYED: "Delayed",
  };

  return (
    <div className="min-h-screen bg-[#f4f8ff]">
      <header className="bg-white border-b border-[#e2e8f4] sticky top-0 z-50 shadow-sm">
        <div className="container-custom py-4 flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-[#0a1628]">Admin Dashboard</h1>
            <p className="text-xs text-[#6a80a0]">U-Class Cargo Logistics</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/shipments/new" className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold">
              <Plus size={16} />New Shipment
            </Link>
            <AdminLogout />
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {dbError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
            <strong>Database error:</strong> {dbError}
            <p className="mt-1 text-xs text-red-500">Make sure DATABASE_URL is set in Vercel environment variables and the tables have been created.</p>
          </div>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Shipments", value: shipmentCount, icon: Package, color: "#0055ff" },
            { label: "In Transit", value: inTransitCount, icon: TrendingUp, color: "#0088cc" },
            { label: "Pending", value: pendingCount, icon: Package, color: "#b8941e" },
            { label: "Unread Messages", value: contactCount, icon: Mail, color: "#cc2020" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="glass-card rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#6a80a0]">{label}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}12` }}>
                  <Icon size={16} style={{ color }} />
                </div>
              </div>
              <div className="text-2xl font-black" style={{ color }}>{value}</div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[#e2e8f4] flex items-center justify-between">
            <h2 className="font-bold text-[#0a1628]">Recent Shipments</h2>
            <Link href="/admin/shipments" className="text-xs text-[#0055ff] hover:underline">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e2e8f4] bg-[#f8fafc]">
                  {["Tracking #", "Description", "Origin → Destination", "Status", "Updated", "Action"].map((h) => (
                    <th key={h} className="text-left text-xs text-[#6a80a0] font-medium px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentShipments.map((s) => (
                  <tr key={s.id} className="border-b border-[#f0f4f8] hover:bg-[#f8fafc] transition-colors">
                    <td className="px-6 py-4 font-mono text-[#0055ff] text-xs">{s.trackingNumber}</td>
                    <td className="px-6 py-4 text-[#0a1628] max-w-xs truncate">{s.description}</td>
                    <td className="px-6 py-4 text-[#6a80a0] text-xs">{s.origin} → {s.destination}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[s.status] || ""}`}>
                        {STATUS_LABELS[s.status] || s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#a0b0c8] text-xs">{new Date(s.updatedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/shipments/${s.id}`}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#0055ff] border border-[#0055ff]/20 hover:bg-[#0055ff]/5 transition-colors bg-white"
                        >
                          <Search size={12} />Edit
                        </Link>
                        <DeleteShipmentButton id={s.id} trackingNumber={s.trackingNumber} />
                      </div>
                    </td>
                  </tr>
                ))}
                {recentShipments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#a0b0c8]">
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
