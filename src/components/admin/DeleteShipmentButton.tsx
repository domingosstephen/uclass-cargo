"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteShipmentButton({ id, trackingNumber }: { id: string; trackingNumber: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete shipment ${trackingNumber}? This cannot be undone.`)) return;
    setLoading(true);
    await fetch(`/api/shipments/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors bg-white disabled:opacity-50"
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
      Delete
    </button>
  );
}
