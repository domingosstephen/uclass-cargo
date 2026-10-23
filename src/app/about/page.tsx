"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Anchor, MapPin, Award, Users, Globe2, TrendingUp, Star, Quote } from "lucide-react";
import Image from "next/image";

const values = [
  { icon: Award, title: "Excellence", desc: "Every shipment is handled with the highest standards of professionalism and care." },
  { icon: Globe2, title: "Global Reach", desc: "Deep partnerships across 50+ countries give your cargo access to any corner of the world." },
  { icon: Users, title: "Client First", desc: "Your dedicated account manager is your single point of contact from booking to delivery." },
  { icon: TrendingUp, title: "Innovation", desc: "We continuously invest in technology — real-time tracking, digital documentation, and more." },
];

const reviews = [
  {
    name: "Carlos Mendes",
    company: "Mendes Import & Export, São Paulo",
    rating: 5,
    text: "U-Class Cargo handled our sea freight from Genova to Santos flawlessly. Real-time tracking kept us informed every step of the way. We will definitely use them again.",
  },
  {
    name: "Lucia Ferreira",
    company: "Ferreira Global Trade, Rio de Janeiro",
    rating: 5,
    text: "Exceptional service and communication. Our shipment arrived on time and in perfect condition. The team at U-Class is professional, responsive, and truly reliable.",
  },
  {
    name: "Ahmed Al-Rashidi",
    company: "AlRashidi Commodities, Dubai",
    rating: 5,
    text: "We have been working with U-Class Cargo for over three years. Their network across the Mediterranean and Middle East is unmatched. Highly recommended for project cargo.",
  },
  {
    name: "Thomas Weber",
    company: "Weber Machinery GmbH, Frankfurt",
    rating: 5,
    text: "From customs clearance to final delivery, the process was smooth and transparent. U-Class made an otherwise complex shipment feel effortless.",
  },
];

const partnerImages = [
  {
    src: "https://dclogisticsbrasil.com/wp-content/uploads/2023/11/quem-somos-dc-logistics-brasil-v01.jpg",
    alt: "DC Logistics Brasil operations",
  },
  {
    src: "https://www.dclogisticsbrasil.br.com/cargo-loading.jpg",
    alt: "Cargo loading operations",
  },
  {
    src: "https://www.dclogisticsbrasil.br.com/warehouse.jpg",
    alt: "Warehouse operations",
  },
  {
    src: "https://www.dclogisticsbrasil.br.com/service-sea.jpg",
    alt: "Sea freight services",
  },
];

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className={className}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(0,85,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#0055ff]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-4">Our Story</span>
            <h1 className="text-5xl lg:text-6xl font-bold text-[#0a1628] mb-6 leading-tight">
              Built on <span className="text-gradient">Trust &amp;</span><br />
              <span className="text-gradient-gold">Expertise</span>
            </h1>
            <p className="text-lg text-[#4a6080] leading-relaxed max-w-2xl">
              Founded in Genova, Italy&apos;s historic port city, U-Class Cargo Logistics has grown from a
              regional freight forwarder into a global logistics partner trusted by businesses across five continents.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
      </section>

      <div className="container-custom py-16 space-y-24">
        {/* Story */}
        <Section>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0a1628] mb-6">
                15 Years of Moving the <span className="text-gradient-blue">World&apos;s Cargo</span>
              </h2>
              <div className="space-y-4 text-[#4a6080] leading-relaxed">
                <p>Established in 2009, U-Class Cargo Logistics was born from a vision to bridge the gap between Mediterranean shipping routes and global trade. Our founders, with deep roots in Genova&apos;s maritime heritage, set out to create a logistics company that combined old-world reliability with modern technology.</p>
                <p>From our headquarters at Via Dante, 2, in the heart of Genova, we&apos;ve expanded our network to cover over 50 countries, handling everything from small parcels to full-vessel project cargo.</p>
                <p>Today, U-Class is synonymous with precision, transparency, and excellence — qualities that have earned us the trust of Fortune 500 companies and ambitious SMEs alike.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "2009", label: "Year Founded" },
                { num: "50+", label: "Countries" },
                { num: "12K+", label: "Shipments/Year" },
                { num: "98%", label: "Client Retention" },
              ].map(({ num, label }) => (
                <div key={label} className="glass-card rounded-2xl p-6 text-center shadow-sm">
                  <div className="text-3xl font-bold text-gradient-blue mb-2">{num}</div>
                  <div className="text-xs text-[#6a80a0] uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Values */}
        <Section className="bg-[#f4f8ff] rounded-3xl p-10">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-3">What We Stand For</span>
            <h2 className="text-3xl font-bold text-[#0a1628]">Our Core <span className="text-gradient-blue">Values</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#0055ff]/8 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} className="text-[#0055ff]" />
                </div>
                <h3 className="font-semibold text-[#0a1628] mb-2">{v.title}</h3>
                <p className="text-xs text-[#6a80a0] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Partner operations gallery */}
        <Section>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-3">Our Network in Action</span>
            <h2 className="text-3xl font-bold text-[#0a1628]">Global Operations, <span className="text-gradient-blue">Local Expertise</span></h2>
            <p className="mt-3 text-[#6a80a0] max-w-xl mx-auto text-sm">In partnership with DC Logistics Brasil and our network of trusted operators worldwide.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {partnerImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative aspect-square rounded-2xl overflow-hidden group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                    (e.currentTarget.parentElement as HTMLElement).style.background = "#f0f4f8";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Reviews */}
        <Section>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-3">Client Testimonials</span>
            <h2 className="text-3xl font-bold text-[#0a1628]">What Our <span className="text-gradient-gold">Clients Say</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 shadow-sm flex flex-col gap-4"
              >
                <Quote size={20} className="text-[#0055ff]/30" />
                <p className="text-sm text-[#4a6080] leading-relaxed flex-1">{review.text}</p>
                <div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: review.rating }).map((_, s) => (
                      <Star key={s} size={13} className="text-[#b8941e] fill-[#b8941e]" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-[#0a1628]">{review.name}</p>
                  <p className="text-xs text-[#6a80a0]">{review.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Location */}
        <Section className="glass-card rounded-3xl p-10 md:p-16 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-3">Where We Are</span>
              <h2 className="text-3xl font-bold text-[#0a1628] mb-4">Headquartered in <span className="text-gradient">Genova</span></h2>
              <p className="text-[#4a6080] mb-6 leading-relaxed">
                Our office is at the heart of Italy&apos;s most important port city — giving us immediate access to Mediterranean shipping lanes and key European logistics hubs.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#4a6080]">
                  <MapPin size={16} className="text-[#0055ff]" />
                  Via Dante, 2, 16121 Genova GE, Italy
                </div>
                <div className="flex items-center gap-3 text-sm text-[#4a6080]">
                  <Anchor size={16} className="text-[#0055ff]" />
                  5 min from Port of Genova
                </div>
              </div>
            </div>
            <div className="bg-[#f4f8ff] rounded-2xl p-8 text-center border border-[#dde4f0]">
              <div className="w-16 h-16 rounded-2xl bg-[#0055ff]/8 flex items-center justify-center mx-auto mb-4">
                <Anchor size={32} className="text-[#0055ff]" />
              </div>
              <p className="text-[#4a6080] text-sm leading-relaxed">
                Genova has been Italy&apos;s gateway to the world for over 1,000 years. We carry that legacy forward with every shipment.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
