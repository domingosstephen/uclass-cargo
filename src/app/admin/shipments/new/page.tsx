export const dynamic = "force-dynamic";
import { checkAdminAuth } from "@/lib/auth";
import ShipmentForm from "@/components/admin/ShipmentForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewShipmentPage() {
  await checkAdminAuth();
  return (
    <div className="min-h-screen bg-[#f4f8ff]">
      <header className="bg-white border-b border-[#e2e8f4] sticky top-0 z-50 shadow-sm">
        <div className="container-custom py-4 flex items-center gap-4">
          <Link href="/admin" className="text-[#6a80a0] hover:text-[#0a1628] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-base font-bold text-[#0a1628]">New Shipment</h1>
            <p className="text-xs text-[#6a80a0]">Create and register a new cargo shipment</p>
          </div>
        </div>
      </header>
      <div className="container-custom py-8 max-w-4xl">
        <ShipmentForm mode="create" />
      </div>
    </div>
  );
}
