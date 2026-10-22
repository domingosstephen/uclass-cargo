"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, MapPin, Shield, Headphones, BarChart3, Award } from "lucide-react";

const reasons = [
  {
    icon: Clock,
    title: "Real-Time Tracking",
    description: "Every shipment updated live on an interactive map. Know exactly where your cargo is, every minute of every day.",
  },
  {
    icon: MapPin,
    title: "Strategic Location",
    description: "Based in Genova — Italy's premier port city — giving us direct access to Mediterranean and global shipping routes.",
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
    description: "Detailed analytics and delivery reports. Optimise your supply chain with data-driven logistics insights.",
  },
  {
    icon: Award,
    title: "15+ Years Experience",
    description: "Over a decade and a half of logistics expertise serving clients across Europe, Asia, and the Americas.",
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-[#f4f8ff] relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-3">
              Why Choose Us
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0a1628] mb-6 leading-tight">
              The U-Class <span className="text-gradient">Advantage</span>
            </h2>
            <p className="text-[#4a6080] leading-relaxed mb-8 text-lg">
              We combine decades of logistics expertise with cutting-edge
              technology to deliver shipments on time, every time.
            </p>
            <div className="space-y-4">
              {[
                "Direct access to Genova port operations",
                "Customs broker partners in 50+ countries",
                "Real-time map tracking for every shipment",
                "Dedicated account manager for each client",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0055ff]/10 border border-[#0055ff]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#0055ff]" />
                  </div>
                  <span className="text-[#4a6080] text-sm">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card glass-card-hover rounded-xl p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0055ff]/8 flex items-center justify-center mb-3">
                  <reason.icon size={20} className="text-[#0055ff]" />
                </div>
                <h4 className="text-sm font-bold text-[#0a1628] mb-2">{reason.title}</h4>
                <p className="text-xs text-[#6a80a0] leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
