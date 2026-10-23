"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Anchor, MapPin, Award, Users, Globe2, TrendingUp } from "lucide-react";

const values = [
  { icon: Award, title: "Excellence", desc: "Every shipment is handled with the highest standards of professionalism and care." },
  { icon: Globe2, title: "Global Reach", desc: "Deep partnerships across 50+ countries give your cargo access to any corner of the world." },
  { icon: Users, title: "Client First", desc: "Your dedicated account manager is your single point of contact from booking to delivery." },
  { icon: TrendingUp, title: "Innovation", desc: "We continuously invest in technology — real-time tracking, digital documentation, and more." },
];

const team = [
  { name: "Marco Ferretti", role: "CEO & Founder", years: "20+ yrs" },
  { name: "Giulia Romano", role: "Operations Director", years: "15+ yrs" },
  { name: "Aleksei Shevchenko", role: "Logistics Manager", years: "12+ yrs" },
  { name: "Sara Conti", role: "Customs & Compliance", years: "10+ yrs" },
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
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(0,85,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#0055ff]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-4">Our Story</span>
            <h1 className="text-5xl lg:text-6xl font-black text-[#0a1628] mb-6 leading-tight">
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
              <h2 className="text-3xl font-black text-[#0a1628] mb-6">
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
                  <div className="text-3xl font-black text-gradient-blue mb-2">{num}</div>
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
            <h2 className="text-3xl font-black text-[#0a1628]">Our Core <span className="text-gradient-blue">Values</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#0055ff]/8 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} className="text-[#0055ff]" />
                </div>
                <h3 className="font-bold text-[#0a1628] mb-2">{v.title}</h3>
                <p className="text-xs text-[#6a80a0] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Team */}
        <Section>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-3">The People Behind It</span>
            <h2 className="text-3xl font-black text-[#0a1628]">Meet the <span className="text-gradient-gold">Team</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-[#0055ff]/8 border border-[#0055ff]/15 flex items-center justify-center mx-auto mb-4">
                  <Users size={24} className="text-[#0055ff]" />
                </div>
                <h3 className="font-bold text-[#0a1628] text-sm mb-1">{member.name}</h3>
                <p className="text-xs text-[#0055ff] mb-1">{member.role}</p>
                <p className="text-xs text-[#a0b0c8]">{member.years} experience</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Location */}
        <Section className="glass-card rounded-3xl p-10 md:p-16 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-3">Where We Are</span>
              <h2 className="text-3xl font-black text-[#0a1628] mb-4">Headquartered in <span className="text-gradient">Genova</span></h2>
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
