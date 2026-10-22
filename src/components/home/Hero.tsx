"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search, Ship, Globe2, Shield } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stats = [
  { value: "50+", label: "Countries Served" },
  { value: "12K+", label: "Shipments Delivered" },
  { value: "99.4%", label: "On-Time Rate" },
  { value: "24/7", label: "Live Support" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center hero-bg grid-bg overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#0055ff]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#0088cc]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10 pt-28 pb-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={item} className="flex mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0055ff]/20 bg-[#0055ff]/5 text-xs font-semibold tracking-widest text-[#0055ff] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0055ff] animate-pulse" />
              Global Cargo &amp; Logistics — Genova, Italy
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tight"
          >
            <span className="text-[#0a1628]">Delivering </span>
            <span className="text-gradient">Excellence</span>
            <br />
            <span className="text-[#0a1628]">Across </span>
            <span className="text-gradient-gold">Every Ocean</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={item}
            className="text-lg text-[#4a6080] leading-relaxed max-w-2xl mb-10"
          >
            U-Class Cargo Logistics provides end-to-end freight solutions — sea,
            air, and land. Track your shipment in real time and trust your cargo
            to our expert hands.
          </motion.p>

          {/* Actions */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href="/tracking"
              className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold"
            >
              <Search size={18} />
              Track Your Shipment
            </Link>
            <Link
              href="/contact"
              className="btn-outline flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold"
            >
              Get a Free Quote
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={item} className="flex flex-wrap gap-6 mb-16">
            {[
              { icon: Ship, label: "ISO 9001 Certified" },
              { icon: Globe2, label: "50+ Countries" },
              { icon: Shield, label: "Full Cargo Insurance" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-[#6a80a0]">
                <Icon size={16} className="text-[#0055ff]" />
                {label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" as const }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-5 text-center">
              <div className="text-3xl font-black text-gradient-blue mb-1">{stat.value}</div>
              <div className="text-xs text-[#6a80a0] uppercase tracking-wider font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
