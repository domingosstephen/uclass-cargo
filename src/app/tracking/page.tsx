"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, Clock, CheckCircle2,
  AlertCircle, Loader2, Ship, Download,
} from "lucide-react";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#f0f4f8]">
      <Loader2 className="w-8 h-8 text-[#0055ff] animate-spin" />
    </div>
  ),
});

const Barcode = dynamic(() => import("react-barcode"), { ssr: false });

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  PENDING:          { label: "Pending",          cls: "status-pending" },
  IN_TRANSIT:       { label: "In Transit",       cls: "status-in-transit" },
  DEPARTED:         { label: "Departed",         cls: "status-departed" },
  AT_PORT:          { label: "At Port",          cls: "status-at-port" },
  CUSTOMS:          { label: "In Customs",       cls: "status-customs" },
  OUT_FOR_DELIVERY: { label: "Out for Delivery", cls: "status-out-for-delivery" },
  ON_HOLD:          { label: "On Hold",          cls: "status-on-hold" },
  DELIVERED:        { label: "Delivered",        cls: "status-delivered" },
  DELAYED:          { label: "Delayed",          cls: "status-delayed" },
};

interface ShipmentEvent {
  id: string;
  location: string;
  lat: number;
  lng: number;
  description: string;
  timestamp: string;
}

interface Shipment {
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
  updatedAt: string;
  events: ShipmentEvent[];
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

function TrackingContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [loading, setLoading] = useState(false);
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) { setQuery(q); fetchShipment(q); }
  }, [searchParams]);

  async function fetchShipment(trackingNum: string) {
    setLoading(true);
    setError(null);
    setShipment(null);
    try {
      const res = await fetch(`/api/tracking?id=${encodeURIComponent(trackingNum.trim().toUpperCase())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Shipment not found");
      setShipment(data.shipment);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) fetchShipment(query);
  }

  const status = shipment ? (STATUS_MAP[shipment.status] || { label: shipment.status, cls: "" }) : null;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#f4f8ff]">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-3">
            Real-Time Tracking
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-[#0a1628] mb-4">
            Track Your <span className="text-gradient-blue">Shipment</span>
          </h1>
          <p className="text-[#6a80a0] max-w-lg mx-auto">
            Enter your U-Class tracking number to see live location, status, and full journey history on an interactive map.
          </p>
        </motion.div>

        {/* Search */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-10"
        >
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a0b0c8]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter tracking number (e.g. UCL-2024XXXXX)"
              className="input-field w-full pl-11 pr-4 py-4 rounded-xl text-sm shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <><Search size={16} />Track</>}
          </button>
        </motion.form>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto mb-8 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3"
            >
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <p className="text-red-600 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {shipment && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-5 gap-6"
            >
              {/* Details panel */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {/* Print header — hidden on screen */}
                <div className="hidden print:block mb-4">
                  <p className="text-xl font-bold text-[#0a1628]">U-Class Cargo Logistics</p>
                  <p className="text-xs text-[#6a80a0]">Via Dante, 2 · 16121 Genova GE, Italy · contact@uclasscargo.com</p>
                  <div className="border-t border-[#dde4f0] mt-3" />
                </div>

                <div className="glass-card rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-[#6a80a0] mb-1">Tracking Number</p>
                      <p className="text-lg font-bold text-[#0055ff] font-mono">{shipment.trackingNumber}</p>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${status?.cls}`}>
                      {status?.label}
                    </span>
                  </div>
                  <div className="flex justify-center pt-2 border-t border-[#e2e8f4]">
                    <Barcode
                      value={shipment.trackingNumber}
                      format="CODE128"
                      width={1.4}
                      height={48}
                      fontSize={11}
                      margin={0}
                      background="transparent"
                      lineColor="#0a1628"
                    />
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="no-print mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#0055ff]/30 text-[#0055ff] text-sm font-semibold hover:bg-[#0055ff]/5 transition-colors"
                  >
                    <Download size={15} />
                    Download PDF
                  </button>
                </div>

                {/* Route */}
                <div className="glass-card rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xs font-semibold tracking-widest text-[#6a80a0] uppercase mb-4">Route</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#00a050] mt-1 shrink-0" />
                      <div>
                        <p className="text-xs text-[#6a80a0]">Origin</p>
                        <p className="text-sm text-[#0a1628] font-medium">{shipment.origin}</p>
                      </div>
                    </div>
                    <div className="pl-1.5"><div className="w-px h-6 bg-[#dde4f0]" /></div>
                    <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-[#0055ff] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-[#6a80a0]">Current Location</p>
                        <p className="text-sm text-[#0055ff] font-medium">{shipment.currentLocation}</p>
                      </div>
                    </div>
                    {shipment.nextTransitPort && (
                      <>
                        <div className="pl-1.5"><div className="w-px h-6 bg-[#dde4f0]" /></div>
                        <div className="flex items-start gap-3">
                          <div className="w-3 h-3 rounded-full bg-[#b8941e] mt-1 shrink-0" />
                          <div>
                            <p className="text-xs text-[#6a80a0]">Next Transit Port</p>
                            <p className="text-sm text-[#0a1628] font-medium">{shipment.nextTransitPort}</p>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="pl-1.5"><div className="w-px h-6 bg-[#dde4f0] border-dashed" /></div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#cc2020] mt-1 shrink-0" />
                      <div>
                        <p className="text-xs text-[#6a80a0]">Destination</p>
                        <p className="text-sm text-[#0a1628] font-medium">{shipment.destination}</p>
                      </div>
                    </div>
                  </div>
                  {shipment.estimatedArrival && (
                    <div className="mt-5 pt-5 border-t border-[#e2e8f4] flex items-center gap-2">
                      <Clock size={14} className="text-[#b8941e]" />
                      <div>
                        <p className="text-xs text-[#6a80a0]">Estimated Arrival</p>
                        <p className="text-sm text-[#b8941e] font-medium">{shipment.estimatedArrival}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Supplier & Consignee */}
                {(shipment.supplierName || shipment.consigneeName) && (
                  <div className="glass-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xs font-semibold tracking-widest text-[#6a80a0] uppercase mb-4">Supplier &amp; Consignee</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {shipment.supplierName && (
                        <div>
                          <p className="text-[10px] font-semibold text-[#0055ff] uppercase tracking-wider mb-1.5">Supplier</p>
                          <p className="text-xs text-[#0a1628] font-medium">{shipment.supplierName}</p>
                          {shipment.supplierAddress && <p className="text-[10px] text-[#6a80a0] mt-0.5">{shipment.supplierAddress}</p>}
                          {shipment.supplierTel && <p className="text-[10px] text-[#6a80a0]">{shipment.supplierTel}</p>}
                        </div>
                      )}
                      {shipment.consigneeName && (
                        <div>
                          <p className="text-[10px] font-semibold text-[#0055ff] uppercase tracking-wider mb-1.5">Consignee</p>
                          <p className="text-xs text-[#0a1628] font-medium">{shipment.consigneeName}</p>
                          {shipment.consigneeAddress && <p className="text-[10px] text-[#6a80a0] mt-0.5">{shipment.consigneeAddress}</p>}
                          {shipment.consigneeTel && <p className="text-[10px] text-[#6a80a0]">{shipment.consigneeTel}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Vessel & Product */}
                {(shipment.vesselName || shipment.productName || shipment.weight) && (
                  <div className="glass-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xs font-semibold tracking-widest text-[#6a80a0] uppercase mb-4">Product &amp; Vessel</h3>
                    <div className="space-y-2">
                      {shipment.productName && (
                        <div className="flex justify-between">
                          <span className="text-xs text-[#6a80a0]">Product</span>
                          <span className="text-xs text-[#0a1628] font-medium">{shipment.productName}</span>
                        </div>
                      )}
                      {shipment.quantity && (
                        <div className="flex justify-between">
                          <span className="text-xs text-[#6a80a0]">Quantity</span>
                          <span className="text-xs text-[#0a1628]">{shipment.quantity}</span>
                        </div>
                      )}
                      {shipment.weight && (
                        <div className="flex justify-between">
                          <span className="text-xs text-[#6a80a0]">Weight</span>
                          <span className="text-xs text-[#0a1628]">{shipment.weight}</span>
                        </div>
                      )}
                      {shipment.dateOfLoading && (
                        <div className="flex justify-between">
                          <span className="text-xs text-[#6a80a0]">Date of Loading</span>
                          <span className="text-xs text-[#0a1628]">{shipment.dateOfLoading}</span>
                        </div>
                      )}
                      {shipment.vesselName && (
                        <div className="flex justify-between">
                          <span className="text-xs text-[#6a80a0]">Vessel</span>
                          <span className="text-xs text-[#0a1628] font-medium">{shipment.vesselName}</span>
                        </div>
                      )}
                      {shipment.vesselNumber && (
                        <div className="flex justify-between">
                          <span className="text-xs text-[#6a80a0]">Voyage / IMO</span>
                          <span className="text-xs text-[#0a1628]">{shipment.vesselNumber}</span>
                        </div>
                      )}
                      {shipment.nextTransitPort && (
                        <div className="flex justify-between">
                          <span className="text-xs text-[#6a80a0]">Next Transit Port</span>
                          <span className="text-xs text-[#0a1628]">{shipment.nextTransitPort}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Events timeline */}
                {shipment.events.length > 0 && (
                  <div className="glass-card rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xs font-semibold tracking-widest text-[#6a80a0] uppercase mb-4">Journey History · {shipment.events.length} update{shipment.events.length !== 1 ? "s" : ""}</h3>
                    <div className="space-y-4">
                      {[...shipment.events].reverse().map((event, i) => (
                        <div key={event.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${i === 0 ? "border-[#0055ff] bg-[#0055ff]/8" : "border-[#dde4f0] bg-[#f4f8ff]"}`}>
                              {i === 0 ? (
                                <div className="w-2 h-2 rounded-full bg-[#0055ff]" />
                              ) : (
                                <CheckCircle2 size={12} className="text-[#a0b0c8]" />
                              )}
                            </div>
                            {i < shipment.events.length - 1 && (
                              <div className="w-px flex-1 bg-[#e2e8f4] mt-1" />
                            )}
                          </div>
                          <div className="pb-4">
                            <p className="text-xs font-semibold text-[#0a1628]">{event.location}</p>
                            <p className="text-xs text-[#6a80a0] mt-0.5">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Map */}
              <div className="lg:col-span-3">
                <div className="glass-card rounded-2xl overflow-hidden shadow-sm border border-[#e2e8f4]" style={{ height: "600px" }}>
                  <MapView
                    originLat={shipment.originLat} originLng={shipment.originLng} originName={shipment.origin}
                    destinationLat={shipment.destinationLat} destinationLng={shipment.destinationLng} destinationName={shipment.destination}
                    currentLat={shipment.currentLat} currentLng={shipment.currentLng} currentLocation={shipment.currentLocation}
                    events={shipment.events}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-5 mt-4 px-1">
                  {[
                    { color: "#00a050", label: "Origin" },
                    { color: "#0055ff", label: "Current" },
                    { color: "#cc2020", label: "Destination" },
                  ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                      <span className="text-xs text-[#6a80a0]">{label}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <div className="w-8 border-t-2 border-[#0055ff]" />
                    <span className="text-xs text-[#6a80a0]">Route</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 border-t-2 border-[#a0b0c8] border-dashed" />
                    <span className="text-xs text-[#6a80a0]">Planned</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!shipment && !loading && !error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-[#0055ff]/8 border border-[#0055ff]/15 flex items-center justify-center mx-auto mb-4">
              <Ship size={28} className="text-[#0055ff]" />
            </div>
            <p className="text-[#6a80a0] text-sm">Enter a tracking number above to view your shipment</p>
            <p className="text-[#a0b0c8] text-xs mt-2">Format: UCL-XXXXXXXXXX</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-16 bg-[#f4f8ff] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#0055ff] animate-spin" />
      </div>
    }>
      <TrackingContent />
    </Suspense>
  );
}
