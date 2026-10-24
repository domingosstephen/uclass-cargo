"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Service = { title: string; highlight: string; body: string; image?: string; imageAlt?: string };

const services: Service[] = [
  {
    title: "Sea Freight",
    highlight: "Best value for volume",
    image: "/images/dc-service-sea.jpg",
    imageAlt: "Container ship at sea",
    body: "Import and export by sea in full container loads (FCL) or grouped shipments (LCL). The most cost-effective solution for large volumes. We serve major ports in Europe, Asia, North America, and Latin America, with regular sailings from Genova.",
  },
  {
    title: "Air Cargo",
    highlight: "3–10 business days",
    image: "/images/dc-cargo-loading.jpg",
    imageAlt: "Cargo loading operations at airport",
    body: "Time-critical air freight with priority handling and express options. Import and export by air on consolidated or exclusive basis. Recommended for urgent, high-value, or temperature-sensitive cargo. Direct and consolidation services available.",
  },
  {
    title: "Land Transport",
    highlight: "Pan-European coverage",
    image: "/images/dc-service-road.jpg",
    imageAlt: "Freight truck on highway",
    body: "FTL and LTL road freight across Europe with express overnight delivery options. ADR-certified drivers for hazardous goods, GDP-compliant pharma transport, and cross-docking at our Genova hub. Live GPS tracking on every load.",
  },
  {
    title: "Customs Clearance",
    highlight: "Import & export",
    image: "/images/dc-warehouse.jpg",
    imageAlt: "Customs warehouse and logistics team",
    body: "Full advisory for import and export procedures: tariff classification (HS/NCM), licensing, parametrisation channels, and customs release. We handle all documentation including import and export declarations, licences, and AEO compliance.",
  },
  {
    title: "Door-to-Door",
    highlight: "Full tracking",
    body: "Collection from the sender's address, international transport, and delivery to the final recipient. Every stage is logged with date, time, and location in our tracking portal. You and your client follow the shipment in real time from pickup to delivery.",
  },
  {
    title: "Project & Special Cargo",
    highlight: "On request",
    body: "We handle cargo requiring extra care: heavy-lift up to 500+ tonnes, oversized and out-of-gauge shipments, temperature-controlled perishables, hazardous goods (DG/IMDG), and works of art. Engineering feasibility, route surveys, and permits arranged. Consult our team before dispatch.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(0,85,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#0055ff]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-4">What We Do</span>
            <h1 className="text-5xl lg:text-6xl font-bold text-[#0a1628] mb-6 leading-tight">
              End-to-End <span className="text-gradient">Logistics</span><br />
              <span className="text-gradient-gold">Solutions</span>
            </h1>
            <p className="text-lg text-[#4a6080] leading-relaxed max-w-2xl">
              From sea freight and air cargo to customs clearance and door-to-door delivery — we cover every step of your supply chain with precision and care.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
      </section>

      <div className="container-custom py-16 max-w-5xl">
        {/* Services list */}
        <div className="border-t-2 border-[#0a1628] divide-y divide-[#e2e8f4]">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="py-10 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 md:gap-16"
            >
              {/* Left: title + tag */}
              <div className="pt-1">
                <h2 className="text-xl font-semibold text-[#0a1628] mb-2">{service.title}</h2>
                <span className="inline-block text-[11px] font-mono tracking-widest text-[#0055ff] uppercase">
                  {service.highlight}
                </span>
              </div>

              {/* Right: image + description */}
              <div className="space-y-4">
                {service.image && (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.imageAlt ?? service.title}
                      className="w-full h-full object-cover"
                  />
                  </div>
                )}
                <p className="text-[#4a6080] leading-relaxed text-sm">{service.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partner band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 border border-[#e2e8f4] rounded-2xl p-8"
        >
          <p className="text-[11px] font-mono tracking-widest text-[#6a80a0] uppercase mb-4">Partners With</p>
          <div className="flex flex-wrap items-center gap-6">
            {["DC Logistics Brasil", "MSC", "MAERSK"].map((partner) => (
              <span key={partner} className="text-base font-bold text-[#0a1628] tracking-tight">{partner}</span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-10 rounded-3xl p-10 md:p-16 text-center border border-[#0055ff]/15 bg-[#f0f6ff]"
          style={{ boxShadow: "0 8px 40px rgba(0,85,255,0.08)" }}
        >
          <h2 className="text-3xl font-bold text-[#0a1628] mb-4">Need a Custom <span className="text-gradient-blue">Solution?</span></h2>
          <p className="text-[#6a80a0] mb-8 max-w-lg mx-auto">Every cargo is unique. Talk to our team and we&apos;ll build a logistics plan tailored to your exact requirements.</p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold">
            Get a Free Quote <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
