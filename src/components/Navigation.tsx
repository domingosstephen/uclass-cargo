"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Anchor } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/tracking", label: "Tracking" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  const isDarkHero = pathname === "/" && !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-nav shadow-sm"
            : isDarkHero
            ? "bg-transparent border-b border-white/5"
            : "bg-white/90 backdrop-blur-md border-b border-[#e2e8f4]/60"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0055ff] to-[#0088cc] flex items-center justify-center glow-blue">
                <Anchor className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className={`text-[13px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${isDarkHero ? "text-white" : "text-[#0055ff]"}`}>
                  U-Class
                </span>
                <span className={`text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${isDarkHero ? "text-white/50" : "text-[#6a80a0]"}`}>
                  Cargo Logistics
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-lg ${
                      isActive
                        ? isDarkHero ? "text-white" : "text-[#0055ff]"
                        : isDarkHero
                        ? "text-white/70 hover:text-white"
                        : "text-[#3a5070] hover:text-[#0a1628]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className={`absolute inset-0 rounded-lg ${isDarkHero ? "bg-white/10" : "bg-[#0055ff]/8"}`}
                        transition={{ type: "spring", duration: 0.4 }}
                      />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + mobile button */}
            <div className="flex items-center gap-3">
              <Link
                href="/tracking"
                className={`hidden md:flex px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isDarkHero
                    ? "border border-white/25 text-white hover:bg-white/10"
                    : "btn-primary"
                }`}
              >
                Track Shipment
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
                  isDarkHero
                    ? "border-white/20 bg-white/5 text-white/80 hover:text-white"
                    : "border-[#e2e8f4] bg-white text-[#3a5070] hover:text-[#0a1628] shadow-sm"
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-white/95 backdrop-blur-md border-b border-[#e2e8f4] shadow-lg lg:hidden"
          >
            <nav className="container-custom py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#0055ff]/8 text-[#0055ff]"
                          : "text-[#3a5070] hover:text-[#0a1628] hover:bg-[#f0f4f8]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="mt-2"
              >
                <Link
                  href="/tracking"
                  className="btn-primary block text-center px-4 py-3 rounded-lg text-sm font-semibold"
                >
                  Track Your Shipment
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
