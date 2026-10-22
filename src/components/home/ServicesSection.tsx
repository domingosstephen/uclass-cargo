"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Ship, Plane, Truck, Package, Warehouse, FileCheck, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Ship,
    title: "Sea Freight",
    description: "Full container load (FCL) and less-than-container load (LCL) services connecting major ports worldwide with competitive rates.",
    color: "#0055ff",
    features: ["FCL & LCL", "Port-to-Port", "Door-to-Door"],
  },
  {
    icon: Plane,
    title: "Air Cargo",
    description: "Expedited air freight solutions for time-sensitive shipments, with priority handling and real-time tracking from pickup to delivery.",
    color: "#0088cc",
    features: ["Express Delivery", "Charter Flights", "Temperature Control"],
  },
  {
    icon: Truck,
    title: "Land Transport",
    description: "Reliable road freight across Europe and beyond. FTL and LTL options with live GPS tracking and professional drivers.",
    color: "#b8941e",
    features: ["FTL & LTL", "Cross-Docking", "GPS Tracked"],
  },
  {
    icon: FileCheck,
    title: "Customs Clearance",
    description: "Expert handling of all customs documentation, import/export permits, and compliance with international trade regulations.",
    color: "#0055ff",
    features: ["Import & Export", "Duty Management", "Compliance"],
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description: "Secure, modern warehousing facilities near Genova port with inventory management, cross-docking, and distribution services.",
    color: "#0088cc",
    features: ["Bonded Storage", "Inventory Mgmt", "Distribution"],
  },
  {
    icon: Package,
    title: "Project Cargo",
    description: "Specialized handling for oversized, heavy-lift, and complex project shipments requiring customized logistics solutions.",
    color: "#b8941e",
    features: ["Heavy Lift", "Oversized Cargo", "Turnkey Solutions"],
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-3">
            What We Offer
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0a1628] mb-4">
            Our <span className="text-gradient-blue">Core Services</span>
          </h2>
          <p className="text-[#6a80a0] max-w-xl mx-auto leading-relaxed">
            Comprehensive logistics solutions tailored to your cargo needs —
            from a single parcel to full vessel charters.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card glass-card-hover rounded-2xl p-6 group cursor-pointer"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${service.color}12` }}
              >
                <service.icon size={24} style={{ color: service.color }} />
              </div>
              <h3 className="text-lg font-bold text-[#0a1628] mb-3">{service.title}</h3>
              <p className="text-sm text-[#6a80a0] leading-relaxed mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {service.features.map((f) => (
                  <span
                    key={f}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      background: `${service.color}10`,
                      color: service.color,
                      border: `1px solid ${service.color}20`,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
              <Link
                href="/services"
                className="flex items-center gap-1.5 text-sm font-medium"
                style={{ color: service.color }}
              >
                Learn more
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/services" className="btn-outline inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold">
            View All Services
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
