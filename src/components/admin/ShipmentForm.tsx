"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, Trash2, MapPin, Loader2, ChevronDown } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "IN_TRANSIT", label: "In Transit" },
  { value: "AT_PORT", label: "At Port" },
  { value: "CUSTOMS", label: "In Customs" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "DELAYED", label: "Delayed" },
];

interface ShipmentData {
  id: string;
  trackingNumber: string;
  description: string;
  origin: string;
  originLat: number;
  originLng: number;
  destination: string;
  destinationLat: number;
  destinationLng: number;
  currentLocation: string;
  currentLat: number;
  currentLng: number;
  status: string;
  cargoType: string;
  weight: string | null;
  estimatedArrival: string | null;
  clientName: string | null;
  clientEmail: string | null;
  notes: string | null;
  supplierName: string | null;
  supplierAddress: string | null;
  supplierTel: string | null;
  consigneeName: string | null;
  consigneeAddress: string | null;
  consigneeTel: string | null;
  productName: string | null;
  quantity: string | null;
  dateOfLoading: string | null;
  vesselName: string | null;
  vesselNumber: string | null;
  nextTransitPort: string | null;
}

interface Props { mode: "create" | "edit"; shipment?: ShipmentData; }

export default function ShipmentForm({ mode, shipment }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [addEvent, setAddEvent] = useState(false);
  const [eventDescription, setEventDescription] = useState("");
  const [showCoords, setShowCoords] = useState(false);

  const [form, setForm] = useState({
    description:      shipment?.description      ?? "",
    origin:           shipment?.origin           ?? "",
    originLat:        String(shipment?.originLat       ?? ""),
    originLng:        String(shipment?.originLng       ?? ""),
    destination:      shipment?.destination      ?? "",
    destinationLat:   String(shipment?.destinationLat  ?? ""),
    destinationLng:   String(shipment?.destinationLng  ?? ""),
    currentLocation:  shipment?.currentLocation  ?? "",
    currentLat:       String(shipment?.currentLat      ?? ""),
    currentLng:       String(shipment?.currentLng      ?? ""),
    status:           shipment?.status           ?? "PENDING",
    cargoType:        shipment?.cargoType        ?? "",
    weight:           shipment?.weight           ?? "",
    estimatedArrival: shipment?.estimatedArrival ?? "",
    clientName:       shipment?.clientName       ?? "",
    clientEmail:      shipment?.clientEmail      ?? "",
    notes:            shipment?.notes            ?? "",
    supplierName:     shipment?.supplierName     ?? "",
    supplierAddress:  shipment?.supplierAddress  ?? "",
    supplierTel:      shipment?.supplierTel      ?? "",
    consigneeName:    shipment?.consigneeName    ?? "",
    consigneeAddress: shipment?.consigneeAddress ?? "",
    consigneeTel:     shipment?.consigneeTel     ?? "",
    productName:      shipment?.productName      ?? "",
    quantity:         shipment?.quantity         ?? "",
    dateOfLoading:    shipment?.dateOfLoading    ?? "",
    vesselName:       shipment?.vesselName       ?? "",
    vesselNumber:     shipment?.vesselNumber     ?? "",
    nextTransitPort:  shipment?.nextTransitPort  ?? "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const body = { ...form, addEvent, eventDescription };
      let res: Response;
      if (mode === "create") {
        res = await fetch("/api/shipments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      } else {
        res = await fetch(`/api/shipments/${shipment!.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      }
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Failed to save"); }
      const data = await res.json();
      setSaved(true);
      if (mode === "create") {
        router.push(`/admin/shipments/${data.shipment.id}`);
      } else {
        setTimeout(() => setSaved(false), 3000);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!shipment || !confirm("Delete this shipment? This cannot be undone.")) return;
    setDeleting(true);
    await fetch(`/api/shipments/${shipment.id}`, { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  }

  const fieldClass = "input-field w-full px-4 py-3 rounded-xl text-sm";
  const labelClass = "block text-xs text-[#6a80a0] mb-1.5";
  const cardClass = "glass-card rounded-2xl p-6 shadow-sm";
  const sectionTitle = "text-xs font-semibold tracking-widest text-[#6a80a0] uppercase mb-5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {saved && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
          Shipment saved successfully!
        </motion.div>
      )}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
      )}

      {/* Cargo Info */}
      <div className={cardClass}>
        <h3 className={sectionTitle}>Shipment Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelClass}>Description *</label>
            <input name="description" value={form.description} onChange={handleChange} required placeholder="e.g. Industrial machinery components" className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Product</label>
            <input name="cargoType" value={form.cargoType} onChange={handleChange} placeholder="e.g. Electronics, Machinery, Textiles…" className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Weight</label>
            <input name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 2.4 tonnes" className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={fieldClass}>
              {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Estimated Arrival</label>
            <input name="estimatedArrival" value={form.estimatedArrival} onChange={handleChange} placeholder="e.g. 15 Dec 2024" className={fieldClass} />
          </div>
        </div>
      </div>

      {/* Origin & Destination */}
      <div className={cardClass}>
        <h3 className={`${sectionTitle} flex items-center gap-2`}>
          <span className="w-2.5 h-2.5 rounded-full bg-[#00a050]" />Origin
        </h3>
        <div className="mb-6">
          <label className={labelClass}>City / Port *</label>
          <input name="origin" value={form.origin} onChange={handleChange} required placeholder="e.g. Genova, Italy" className={fieldClass} />
        </div>

        <h3 className={`${sectionTitle} flex items-center gap-2`}>
          <span className="w-2.5 h-2.5 rounded-full bg-[#cc2020]" />Destination
        </h3>
        <div className="mb-6">
          <label className={labelClass}>City / Port *</label>
          <input name="destination" value={form.destination} onChange={handleChange} required placeholder="e.g. Shanghai, China" className={fieldClass} />
        </div>

        {/* Map coordinates — expandable */}
        <button type="button" onClick={() => setShowCoords(!showCoords)}
          className="flex items-center gap-1.5 text-xs text-[#0055ff] hover:text-[#0044dd] transition-colors">
          <ChevronDown size={13} className={`transition-transform ${showCoords ? "rotate-180" : ""}`} />
          {showCoords ? "Hide" : "Set"} map coordinates (optional — enables live map for clients)
        </button>

        {showCoords && (
          <div className="mt-4 pt-4 border-t border-[#e2e8f4] grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Origin Lat</label>
              <input name="originLat" value={form.originLat} onChange={handleChange} type="number" step="any" placeholder="44.4056" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Origin Lng</label>
              <input name="originLng" value={form.originLng} onChange={handleChange} type="number" step="any" placeholder="8.9463" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Destination Lat</label>
              <input name="destinationLat" value={form.destinationLat} onChange={handleChange} type="number" step="any" placeholder="31.2304" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Destination Lng</label>
              <input name="destinationLng" value={form.destinationLng} onChange={handleChange} type="number" step="any" placeholder="121.4737" className={fieldClass} />
            </div>
          </div>
        )}
      </div>

      {/* Current Location */}
      <div className={cardClass}>
        <h3 className={`${sectionTitle} flex items-center gap-2`}>
          <MapPin size={14} className="text-[#0055ff]" />Current Location (Live Position)
        </h3>
        <div className="mb-4">
          <label className={labelClass}>Location Name *</label>
          <input name="currentLocation" value={form.currentLocation} onChange={handleChange} required placeholder="e.g. Suez Canal, Egypt" className={fieldClass} />
        </div>

        {showCoords && (
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClass}>Current Lat</label>
              <input name="currentLat" value={form.currentLat} onChange={handleChange} type="number" step="any" placeholder="30.5234" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Current Lng</label>
              <input name="currentLng" value={form.currentLng} onChange={handleChange} type="number" step="any" placeholder="32.3455" className={fieldClass} />
            </div>
          </div>
        )}

        {!showCoords && (
          <input type="hidden" name="currentLat" value={form.currentLat} />
        )}
        {!showCoords && (
          <input type="hidden" name="currentLng" value={form.currentLng} />
        )}

        {mode === "edit" && (
          <div className="mt-4 pt-4 border-t border-[#e2e8f4]">
            <label className="flex items-center gap-2 cursor-pointer mb-3">
              <input type="checkbox" checked={addEvent} onChange={(e) => setAddEvent(e.target.checked)} className="w-4 h-4 rounded accent-[#0055ff]" />
              <span className="text-sm text-[#4a6080]">Add a tracking event for this location update</span>
            </label>
            {addEvent && (
              <input value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="e.g. Cargo passed through Suez Canal inspection" className={fieldClass} />
            )}
          </div>
        )}
      </div>

      {/* Supplier & Consignee */}
      <div className={cardClass}>
        <h3 className={sectionTitle}>Supplier & Consignee</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-[#0a1628] uppercase tracking-wider">Supplier</p>
            <div>
              <label className={labelClass}>Name</label>
              <input name="supplierName" value={form.supplierName} onChange={handleChange} placeholder="Supplier company name" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <input name="supplierAddress" value={form.supplierAddress} onChange={handleChange} placeholder="Full address" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Tel</label>
              <input name="supplierTel" value={form.supplierTel} onChange={handleChange} placeholder="+1 555 000 0000" className={fieldClass} />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold text-[#0a1628] uppercase tracking-wider">Consignee</p>
            <div>
              <label className={labelClass}>Name</label>
              <input name="consigneeName" value={form.consigneeName} onChange={handleChange} placeholder="Consignee company name" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <input name="consigneeAddress" value={form.consigneeAddress} onChange={handleChange} placeholder="Full address" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Tel</label>
              <input name="consigneeTel" value={form.consigneeTel} onChange={handleChange} placeholder="+1 555 000 0000" className={fieldClass} />
            </div>
          </div>
        </div>
      </div>

      {/* Vessel & Transit */}
      <div className={cardClass}>
        <h3 className={sectionTitle}>Product & Vessel Details</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Product Name</label>
            <input name="productName" value={form.productName} onChange={handleChange} placeholder="e.g. Industrial machinery" className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Quantity</label>
            <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g. 12 units / 3 pallets" className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Date of Loading</label>
            <input name="dateOfLoading" value={form.dateOfLoading} onChange={handleChange} placeholder="e.g. 10 Jan 2025" className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Vessel Name</label>
            <input name="vesselName" value={form.vesselName} onChange={handleChange} placeholder="e.g. MSC OSCAR" className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Vessel Number / Voyage</label>
            <input name="vesselNumber" value={form.vesselNumber} onChange={handleChange} placeholder="e.g. 9ZE2345 / VOY 123" className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Next Transit Port</label>
            <input name="nextTransitPort" value={form.nextTransitPort} onChange={handleChange} placeholder="e.g. Port Said, Egypt" className={fieldClass} />
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className={cardClass}>
        <h3 className={sectionTitle}>Client Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Client Name</label>
            <input name="clientName" value={form.clientName} onChange={handleChange} placeholder="Company or person name" className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Client Email</label>
            <input name="clientEmail" value={form.clientEmail} onChange={handleChange} type="email" placeholder="client@company.com" className={fieldClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Internal notes..." className={`${fieldClass} resize-none`} />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-4">
        <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold">
          {loading ? <Loader2 size={18} className="animate-spin" /> : <><Save size={18} />{mode === "create" ? "Create Shipment" : "Save Changes"}</>}
        </button>

        {mode === "edit" && (
          <button type="button" onClick={handleDelete} disabled={deleting}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors bg-white">
            {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}Delete
          </button>
        )}
      </div>

      {mode === "create" && (
        <p className="text-xs text-[#a0b0c8] text-center">
          A unique tracking number (UCL-XXXXXXXXX) will be automatically generated.
        </p>
      )}
    </form>
  );
}
