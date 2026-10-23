"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, MapPin } from "lucide-react";

export default function TrackingCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [trackingNum, setTrackingNum] = useState("");
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNum.trim()) {
      router.push(`/tracking?q=${encodeURIComponent(trackingNum.trim())}`);
    }
  };

  return (
    <section ref={ref} className="py-28 bg-white relative overflow-hidden">
      {/* Decorative dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: "radial-gradient(rgba(0,85,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Radial glow center */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[#0055ff]/5 rounded-full blur-[80px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Card */}
          <div
            className="rounded-3xl overflow-hidden border border-[#0055ff]/12"
            style={{
              background: "linear-gradient(135deg, #0a1628 0%, #0d2044 50%, #0a1628 100%)",
              boxShadow: "0 24px 80px rgba(0,85,255,0.15), 0 0 0 1px rgba(0,85,255,0.1)",
            }}
          >
            <div className="px-10 md:px-16 py-14 md:py-18 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8"
                style={{ background: "rgba(0,85,255,0.2)", border: "1px solid rgba(0,85,255,0.3)" }}
              >
                <MapPin size={28} className="text-[#5aaeff]" strokeWidth={1.8} />
              </motion.div>

              <span className="block text-xs font-bold tracking-[0.25em] text-[#5aaeff]/60 uppercase mb-4">
                Live Tracking
              </span>

              <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
                Where Is Your<br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #5aaeff 0%, #a8d4ff 60%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Cargo Right Now?
                </span>
              </h2>

              <p className="text-white/45 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                Enter your U-Class tracking number to see your shipment
                location on a live interactive map with full event history.
              </p>

              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6">
                <div className="flex-1 relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                  <input
                    type="text"
                    value={trackingNum}
                    onChange={(e) => setTrackingNum(e.target.value)}
                    placeholder="e.g. UCL-20241234"
                    className="w-full pl-11 pr-4 py-4 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#0055ff]/50"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.border = "1px solid rgba(0,85,255,0.5)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)";
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold bg-[#0055ff] hover:bg-[#0044dd] text-white transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,85,255,0.4)] whitespace-nowrap"
                >
                  Track Now
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <p className="text-xs text-white/25">
                No tracking number?{" "}
                <a href="/contact" className="text-[#5aaeff]/70 hover:text-[#5aaeff] transition-colors underline underline-offset-2">
                  Contact us
                </a>{" "}
                and we&apos;ll help you locate your shipment.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
