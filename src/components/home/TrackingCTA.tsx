"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

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
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#0055ff]/4 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-10 md:p-16 text-center max-w-3xl mx-auto border border-[#0055ff]/15 bg-[#f0f6ff]"
          style={{ boxShadow: "0 8px 40px rgba(0,85,255,0.08)" }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-4">
            Live Tracking
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0a1628] mb-4">
            Track Your Shipment{" "}
            <span className="text-gradient-blue">in Real Time</span>
          </h2>
          <p className="text-[#6a80a0] mb-8 max-w-md mx-auto">
            Enter your U-Class tracking number to see your cargo location on a
            live interactive map.
          </p>

          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-6">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a0b0c8]" />
              <input
                type="text"
                value={trackingNum}
                onChange={(e) => setTrackingNum(e.target.value)}
                placeholder="e.g. UCL-20241234"
                className="input-field w-full pl-11 pr-4 py-4 rounded-xl text-sm"
              />
            </div>
            <button
              type="submit"
              className="btn-primary px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Track Now
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-xs text-[#a0b0c8]">
            Don&apos;t have a tracking number?{" "}
            <a href="/contact" className="text-[#0055ff] hover:underline">
              Contact us
            </a>{" "}
            and we&apos;ll help you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
