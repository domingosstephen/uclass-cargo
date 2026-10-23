"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, MapPin, Shield, Headphones, BarChart3, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

const reasons = [
  {
    icon: Clock,
    title: "Real-Time Tracking",
    description: "Every shipment updated live on an interactive map. Know exactly where your cargo is, every step of the way.",
  },
  {
    icon: MapPin,
    title: "Strategic Location",
    description: "Based in Genova — Italy's premier port city — with direct access to Mediterranean and global shipping routes.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Comprehensive cargo insurance for every shipment. Your goods are protected from pickup to final delivery.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated operations team is available around the clock. Call, email, or chat — we're always here.",
  },
  {
    icon: BarChart3,
    title: "Performance Reports",
    description: "Detailed analytics and delivery reports to optimise your supply chain with data-driven insights.",
  },
  {
    icon: Award,
    title: "15+ Years Experience",
    description: "Over a decade of logistics expertise serving clients across Europe, Asia, and the Americas.",
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #061220 0%, #081a30 40%, #0a1f38 70%, #060e1c 100%)",
      }}
    >
      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[400px] bg-[#0055ff]/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-[#0088cc]/6 rounded-full blur-[80px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#5aaeff]/70 uppercase mb-5">
              <span className="w-8 h-px bg-[#5aaeff]/40" />
              Why Choose Us
            </span>
            <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-8">
              The U-Class<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #f0c060 0%, #e8b832 40%, #f5d070 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Advantage
              </span>
            </h2>
            <p className="text-white/45 text-lg leading-relaxed mb-10">
              We combine decades of logistics expertise with cutting-edge
              technology to deliver shipments on time, every time.
            </p>

            <div className="space-y-4 mb-12">
              {[
                "Direct access to Genova port operations",
                "Customs broker partners in 50+ countries",
                "Real-time map tracking for every shipment",
                "Dedicated account manager for each client",
              ].map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "rgba(0,85,255,0.2)", border: "1px solid rgba(0,85,255,0.4)" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#5aaeff]" />
                  </div>
                  <span className="text-white/60 text-sm">{point}</span>
                </motion.div>
              ))}
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors duration-300"
            >
              About our company
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="group rounded-xl p-5 border border-white/8 hover:border-white/15 transition-all duration-300 backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.04)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: "rgba(0,85,255,0.15)" }}
                >
                  <reason.icon size={20} className="text-[#5aaeff]" strokeWidth={1.8} />
                </div>
                <h4 className="text-sm font-bold text-white/85 mb-2">{reason.title}</h4>
                <p className="text-xs text-white/40 leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
