"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Ship, Plane, Truck, Package, Warehouse, FileCheck, ChevronDown, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Ship, title: "Sea Freight", color: "#0055ff",
    shortDesc: "Full and partial container shipping worldwide via major sea routes.",
    details: ["FCL and LCL shipping", "Port-to-port and door-to-door", "Regular sailings from Genova", "Reefer containers available", "Hazardous materials handling", "Real-time container tracking"],
    process: ["Booking & Documentation", "Export Clearance", "Loading at Port", "Ocean Transit", "Import Clearance", "Final Delivery"],
  },
  {
    icon: Plane, title: "Air Cargo", color: "#0088cc",
    shortDesc: "Time-critical air freight with priority handling and express options.",
    details: ["Express, standard, and economy tiers", "Direct and consolidation services", "Dangerous goods handling", "Temperature-controlled transport", "Airport-to-airport options", "Charter flights available"],
    process: ["Booking", "Collection & Packing", "Air Export Docs", "Flight", "Air Import Clearance", "Last Mile Delivery"],
  },
  {
    icon: Truck, title: "Land Transport", color: "#b8941e",
    shortDesc: "Pan-European road freight with FTL and LTL solutions.",
    details: ["FTL and LTL throughout Europe", "Express overnight deliveries", "GDP-compliant pharma transport", "ADR certified drivers", "Cross-docking at Genova hub", "Live GPS tracking"],
    process: ["Order Placement", "Collection", "Sorting Hub", "Line Haul", "Regional Hub", "Delivery"],
  },
  {
    icon: FileCheck, title: "Customs Clearance", color: "#0055ff",
    shortDesc: "Expert customs brokerage and trade compliance services.",
    details: ["EU and non-EU declarations", "Tariff classification", "AEO status benefits", "Bonded warehouse regimes", "Intrastat reporting", "Compliance for controlled goods"],
    process: ["Document Review", "Classification", "Duty Calculation", "Filing", "Inspection Support", "Release"],
  },
  {
    icon: Warehouse, title: "Warehousing & Distribution", color: "#0088cc",
    shortDesc: "Secure storage and distribution near Genova port.",
    details: ["Bonded and non-bonded storage", "WMS integration", "Pick & pack and kitting", "B2B and B2C fulfillment", "Ambient, chilled, and frozen", "Direct transport connection"],
    process: ["Goods Receipt", "Quality Check", "Storage", "Order Processing", "Pick & Pack", "Dispatch"],
  },
  {
    icon: Package, title: "Project Cargo", color: "#b8941e",
    shortDesc: "Specialized handling for heavy-lift, oversized, and complex cargo.",
    details: ["Engineering feasibility studies", "Heavy lift up to 500+ tonnes", "Modular and out-of-gauge cargo", "Lashing and securing plans", "Multimodal coordination", "Site delivery support"],
    process: ["Feasibility Study", "Route Survey", "Permits", "Specialized Equipment", "Controlled Move", "Site Delivery"],
  },
];

function ServiceCard({ service, idx }: { service: typeof services[0]; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08 }}
      className="glass-card rounded-2xl overflow-hidden shadow-sm"
    >
      <button onClick={() => setOpen(!open)} className="w-full p-6 text-left flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${service.color}10` }}>
          <service.icon size={24} style={{ color: service.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-[#0a1628] mb-1">{service.title}</h3>
          <p className="text-sm text-[#6a80a0]">{service.shortDesc}</p>
        </div>
        <ChevronDown size={20} className="text-[#a0b0c8] shrink-0 mt-1 transition-transform duration-300" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" as const }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="border-t border-[#e2e8f4] pt-5">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold tracking-widest text-[#6a80a0] uppercase mb-3">Service Includes</h4>
                    <ul className="space-y-2">
                      {service.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-[#4a6080]">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: service.color }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold tracking-widest text-[#6a80a0] uppercase mb-3">Process</h4>
                    <div className="flex flex-col gap-2">
                      {service.process.map((step, i) => (
                        <div key={step} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                            style={{ background: `${service.color}12`, color: service.color, border: `1px solid ${service.color}25` }}>
                            {i + 1}
                          </div>
                          <span className="text-sm text-[#4a6080]">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-[#e2e8f4]">
                  <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: service.color }}>
                    Request a Quote <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="hero-bg grid-bg pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#0055ff]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-4">What We Do</span>
            <h1 className="text-5xl lg:text-6xl font-black text-[#0a1628] mb-6 leading-tight">
              End-to-End <span className="text-gradient">Logistics</span><br />
              <span className="text-gradient-gold">Solutions</span>
            </h1>
            <p className="text-lg text-[#4a6080] leading-relaxed max-w-2xl">
              From sea freight and air cargo to customs clearance and warehousing — we cover every step of your supply chain with precision and care.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <div className="container-custom py-16">
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {services.map((service, i) => <ServiceCard key={service.title} service={service} idx={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-16 rounded-3xl p-10 md:p-16 text-center max-w-3xl mx-auto border border-[#0055ff]/15 bg-[#f0f6ff]"
          style={{ boxShadow: "0 8px 40px rgba(0,85,255,0.08)" }}
        >
          <h2 className="text-3xl font-black text-[#0a1628] mb-4">Need a Custom <span className="text-gradient-blue">Solution?</span></h2>
          <p className="text-[#6a80a0] mb-8 max-w-lg mx-auto">Every cargo is unique. Talk to our team and we&apos;ll build a logistics plan tailored to your exact requirements.</p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold">
            Get a Free Quote <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
