"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "IN_TRANSIT", label: "In Transit" },
  { value: "DEPARTED", label: "Departed" },
  { value: "AT_PORT", label: "At Port" },
  { value: "CUSTOMS", label: "In Customs" },
  { value: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
  { value: "ON_HOLD", label: "On Hold" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "DELAYED", label: "Delayed" },
];

interface Props {
  id: string;
  trackingNumber: string;
  currentLocation: string;
  currentStatus: string;
}

export default function UpdateTrackingModal({ id, trackingNumber, currentLocation, currentStatus }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(currentLocation);
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "found" | "error">("idle");
  const [error, setError] = useState("");

  function handleOpen() {
    setLocation(currentLocation);
    setStatus(currentStatus);
    setNote("");
    setLat("");
    setLng("");
    setGeoStatus("idle");
    setError("");
    setOpen(true);
  }

  async function geocode(locationName: string) {
    if (!locationName.trim()) return;
    setGeoStatus("loading");
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`,
        { headers: { "Accept-Language": "en", "User-Agent": "UClassCargo/1.0" } }
      );
      const data = await res.json();
      if (data.length > 0) {
        setLat(data[0].lat);
        setLng(data[0].lon);
        setGeoStatus("found");
      } else {
        setGeoStatus("error");
      }
    } catch {
      setGeoStatus("error");
    }
  }

  async function handleSave() {
    if (!location.trim()) { setError("Location is required"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/shipments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentLocation: location,
          currentLat: lat,
          currentLng: lng,
          status,
          eventDescription: note.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to update");
      }
      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setLoading(false);
    }
  }

  const fieldClass = "input-field w-full px-4 py-3 rounded-xl text-sm";
  const labelClass = "block text-xs text-[#6a80a0] mb-1.5";

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#0088cc] border border-[#0088cc]/20 hover:bg-[#0088cc]/5 transition-colors bg-white whitespace-nowrap"
      >
        <MapPin size={12} />
        Update
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-bold text-[#0a1628]">Update Tracking</h2>
                <p className="text-xs text-[#0055ff] font-mono mt-0.5">{trackingNumber}</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-[#a0b0c8] hover:text-[#0a1628] transition-colors">
                <X size={18} />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs">{error}</div>
            )}

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Current Location *</label>
                <div className="relative">
                  <input
                    value={location}
                    onChange={(e) => { setLocation(e.target.value); setGeoStatus("idle"); }}
                    onBlur={() => geocode(location)}
                    placeholder="e.g. Port Said, Egypt"
                    className={`${fieldClass} pr-28`}
                  />
                  {geoStatus === "loading" && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <Loader2 size={14} className="text-[#0055ff] animate-spin" />
                    </div>
                  )}
                  {geoStatus === "found" && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <CheckCircle2 size={14} className="text-[#00a050]" />
                      <span className="text-[10px] text-[#00a050]">Located</span>
                    </div>
                  )}
                  {geoStatus === "error" && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <AlertCircle size={14} className="text-[#cc2020]" />
                      <span className="text-[10px] text-[#cc2020]">Not found</span>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-[#a0b0c8] mt-1">Map pin updates automatically when you leave the field.</p>
              </div>

              <div>
                <label className={labelClass}>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={fieldClass}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Tracking Note <span className="text-[#a0b0c8]">(optional — auto-generated if blank)</span>
                </label>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Vessel departed Genova — now transiting Suez Canal"
                  className={fieldClass}
                />
                <p className="text-[10px] text-[#a0b0c8] mt-1">This appears in the client&apos;s shipment history timeline.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 btn-primary flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <MapPin size={16} />}
                Save Update
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-3 rounded-xl text-sm font-semibold text-[#6a80a0] border border-[#e2e8f4] hover:bg-[#f4f8ff] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
