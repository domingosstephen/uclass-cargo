"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Ship, Plane, Truck, Package, Warehouse, FileCheck, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Ship,
    title: "Sea Freight",
    description: "FCL and LCL services connecting major ports worldwide with competitive rates and full cargo visibility.",
    accent: "#0055ff",
    features: ["FCL & LCL", "Port-to-Port", "Door-to-Door"],
  },
  {
    icon: Plane,
    title: "Air Cargo",
    description: "Expedited air freight for time-sensitive shipments with priority handling and real-time tracking.",
    accent: "#0088cc",
    features: ["Express Delivery", "Charter Flights", "Temperature Control"],
  },
  {
    icon: Truck,
    title: "Land Transport",
    description: "Reliable road freight across Europe and beyond. FTL and LTL options with live GPS tracking.",
    accent: "#b8941e",
    features: ["FTL & LTL", "Cross-Docking", "GPS Tracked"],
  },
  {
    icon: FileCheck,
    title: "Customs Clearance",
    description: "Expert handling of all customs documentation, import/export permits, and compliance worldwide.",
    accent: "#0055ff",
    features: ["Import & Export", "Duty Management", "Compliance"],
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description: "Secure warehousing near Genova port with inventory management, cross-docking, and distribution.",
    accent: "#0088cc",
    features: ["Bonded Storage", "Inventory Mgmt", "Distribution"],
  },
  {
    icon: Package,
    title: "Project Cargo",
    description: "Specialized handling for oversized, heavy-lift, and complex projects requiring custom solutions.",
    accent: "#b8941e",
    features: ["Heavy Lift", "Oversized Cargo", "Turnkey Solutions"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 bg-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(0,85,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#0055ff] uppercase mb-5">
            <span className="w-8 h-px bg-[#0055ff]" />
            What We Offer
          </span>
          <h2 className="text-5xl lg:text-6xl font-black text-[#0a1628] leading-tight mb-6">
            Comprehensive<br />
            <span className="text-gradient-blue">Logistics Services</span>
          </h2>
          <p className="text-[#6a80a0] text-lg leading-relaxed">
            From a single parcel to full vessel charters — every solution
            engineered for reliability and speed.
          </p>
        </motion.div>

        {/* Service grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-2xl p-7 cursor-pointer overflow-hidden border border-[#e8eef8] hover:border-transparent transition-all duration-300"
              style={{
                boxShadow: "0 2px 16px rgba(0,40,120,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px rgba(0,40,120,0.12), 0 0 0 1.5px ${service.accent}30`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,40,120,0.06)";
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${service.accent}, ${service.accent}60)` }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${service.accent}10` }}
              >
                <service.icon size={26} style={{ color: service.accent }} strokeWidth={1.8} />
              </div>

              <h3 className="text-xl font-bold text-[#0a1628] mb-3">{service.title}</h3>
              <p className="text-sm text-[#6a80a0] leading-relaxed mb-5">{service.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((f) => (
                  <span
                    key={f}
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{
                      background: `${service.accent}08`,
                      color: service.accent,
                      border: `1px solid ${service.accent}18`,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all"
                style={{ color: service.accent }}
              >
                Learn more
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-center mt-14"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold border-2 border-[#0055ff] text-[#0055ff] hover:bg-[#0055ff] hover:text-white transition-all duration-300"
          >
            View All Services
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
