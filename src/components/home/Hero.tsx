"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search, Ship, Globe2, Shield, ChevronDown } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const stats = [
  { value: "50+", label: "Countries Served" },
  { value: "12K+", label: "Shipments Delivered" },
  { value: "99.4%", label: "On-Time Rate" },
  { value: "24/7", label: "Live Support" },
];

const heroImages = [
  "/images/dc-service-sea.jpg",
  "/images/dc-cargo-loading.jpg",
  "/images/dc-warehouse.jpg",
  "/images/dc-service-road.jpg",
  "/images/dc-operations.jpg",
];

export default function Hero() {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden bg-[#050f1e] pt-[88px]">

      {/* Background image slideshow */}
      <div className="absolute inset-0">
        {heroImages.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === activeImg ? 1 : 0 }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" aria-hidden="true" />
          </div>
        ))}
        {/* Light scrim — just enough contrast for text, images stay bright */}
        <div className="absolute inset-0 bg-[#050f1e]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050f1e]/20 via-transparent to-[#050f1e]/50" />
      </div>

      {/* Atmospheric glow layers */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-[700px] h-[500px] bg-[#0055ff]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[400px] bg-[#0088cc]/8 rounded-full blur-[100px]" />
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(i)}
            className="transition-all duration-300"
            aria-label={`Slide ${i + 1}`}
          >
            <div className={`rounded-full transition-all duration-300 ${i === activeImg ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/35"}`} />
          </button>
        ))}
      </div>

      <div className="container-custom relative z-10 flex-1 flex flex-col pt-12 pb-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-5xl"
        >
          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
                Genova, Italy · Est. 2008
              </span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 tracking-wide"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.8)" }}
          >
            <span className="text-white">Delivering </span>
            <span
              style={{
                background: "linear-gradient(135deg, #5aaeff 0%, #a8d4ff 50%, #7bbeff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Excellence
            </span>
            <br />
            <span className="text-white/90">Across </span>
            <span
              style={{
                background: "linear-gradient(135deg, #f0c060 0%, #e8b832 40%, #f5d070 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Every Ocean
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={item}
            className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl mb-10 font-light"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}
          >
            End-to-end freight solutions by sea, air, and land.
            Track your shipment in real time and trust your cargo to
            expert hands across 50+ countries.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href="/tracking"
              className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold bg-[#0055ff] hover:bg-[#0044dd] text-white transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,85,255,0.45)] hover:-translate-y-0.5"
            >
              <Search size={18} />
              Track Your Shipment
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold border border-white/20 text-white/80 hover:text-white hover:bg-white/8 hover:border-white/35 transition-all duration-300 backdrop-blur-sm"
            >
              Get a Free Quote
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={item} className="flex flex-wrap gap-6">
            {[
              { icon: Ship, label: "ISO 9001 Certified" },
              { icon: Globe2, label: "50+ Countries" },
              { icon: Shield, label: "Full Cargo Insurance" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-white/75" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>
                <Icon size={15} className="text-white/60" />
                {label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" as const }}
        className="relative z-10 w-full mt-16"
      >
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-[#071828]/70 backdrop-blur-sm px-6 py-7 text-center hover:bg-white/8 transition-colors"
              >
                <div
                  className="text-3xl md:text-4xl font-black mb-1.5"
                  style={{
                    background: i % 2 === 0
                      ? "linear-gradient(135deg, #5aaeff, #a8d4ff)"
                      : "linear-gradient(135deg, #f0c060, #d4aa30)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-white/35 uppercase tracking-widest font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex justify-center pt-6 pb-8"
        >
          <div className="flex flex-col items-center gap-1 text-white/20">
            <span className="text-[9px] uppercase tracking-[0.25em]">Scroll</span>
            <ChevronDown size={13} className="animate-bounce" />
          </div>
        </motion.div>
      </motion.div>

      {/* Fade to white at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
