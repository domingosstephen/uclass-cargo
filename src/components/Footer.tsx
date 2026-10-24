"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Anchor, MapPin, Phone, Mail, Globe, ArrowRight } from "lucide-react";

const services = [
  "Sea Freight",
  "Air Cargo",
  "Land Transport",
  "Customs Clearance",
  "Warehousing",
  "Project Cargo",
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/tracking", label: "Track Shipment" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="relative bg-[#0a1628] text-white border-t border-white/5">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0055ff] to-[#0088cc] flex items-center justify-center">
                <Anchor className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-bold tracking-[0.2em] text-[#60a0ff] uppercase">
                  U-Class
                </span>
                <span className="text-[11px] tracking-[0.15em] text-white/40 uppercase">
                  Cargo Logistics
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-6">
              Premium cargo logistics solutions from Genova, Italy. Connecting
              your business to the world with precision and reliability.
            </p>
            <div className="flex gap-3">
              {[Globe, Globe, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-[#60a0ff] hover:border-[#60a0ff]/30 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-[#60a0ff] uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
                  >
                    <ArrowRight size={12} className="text-[#0055ff] group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-[#60a0ff] uppercase mb-5">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
                  >
                    <ArrowRight size={12} className="text-[#0055ff] group-hover:translate-x-1 transition-transform" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-[#60a0ff] uppercase mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-[#0055ff] mt-0.5 shrink-0" />
                <span className="text-sm text-white/40 leading-relaxed">
                  Via Dante, 2<br />16121 Genova GE, Italy
                </span>
              </li>
              <li>
                <a href="tel:+393508405884" className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors">
                  <Phone size={16} className="text-[#0055ff] shrink-0" />
                  +39 350 840 5884
                </a>
              </li>
              <li>
                <a href="mailto:contact@uclasscargo.com" className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors break-all">
                  <Mail size={16} className="text-[#0055ff] shrink-0" />
                  contact@uclasscargo.com
                </a>
              </li>
              <li>
                <a href="mailto:uclasscargologistics@ukr.net" className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors break-all">
                  <Mail size={16} className="text-[#0055ff] shrink-0" />
                  uclasscargologistics@ukr.net
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <p>&copy; 2025 U-Class Cargo Logistics. All rights reserved.</p>
          <p>Via Dante, 2 · 16121 Genova GE, Italy · VAT Registered</p>
        </div>
      </div>
    </footer>
  );
}
