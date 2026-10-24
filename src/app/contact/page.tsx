"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2 } from "lucide-react";

const serviceOptions = [
  "Sea Freight", "Air Cargo", "Land Transport",
  "Customs Clearance", "Warehousing", "Project Cargo", "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSuccess(true);
      setForm({ name: "", email: "", company: "", phone: "", service: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-40 pb-16 relative overflow-hidden bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(0,85,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#0055ff]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-4">Get in Touch</span>
            <h1 className="text-5xl lg:text-6xl font-black text-[#0a1628] mb-6 leading-tight">
              Let&apos;s Move Your <span className="text-gradient">Cargo</span>
            </h1>
            <p className="text-lg text-[#4a6080] max-w-xl">
              Request a free quote, ask a question, or just say hello. Our team responds within 24 hours.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
      </section>

      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="lg:col-span-1 flex flex-col gap-5">
            <div className="glass-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-5">Contact Details</h3>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Office Address", content: <span className="text-sm text-[#0a1628] leading-relaxed">Via Dante, 2<br />16121 Genova GE, Italy</span> },
                  { icon: Phone, label: "Phone", content: <a href="tel:+393508405884" className="text-sm text-[#0a1628] hover:text-[#0055ff] transition-colors">+39 350 840 5884</a> },
                  { icon: Mail, label: "Email", content: <a href="mailto:contact@uclasscargo.com" className="text-sm text-[#0a1628] hover:text-[#0055ff] transition-colors break-all">contact@uclasscargo.com</a> },
                  { icon: Clock, label: "Business Hours", content: <p className="text-sm text-[#0a1628]">Mon–Fri: 8:00–18:00 CET<br /><span className="text-xs text-[#6a80a0]">Emergency line: 24/7</span></p> },
                ].map(({ icon: Icon, label, content }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0055ff]/8 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[#0055ff]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#a0b0c8] mb-1">{label}</p>
                      {content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-semibold tracking-widest text-[#0055ff] uppercase mb-4">Response Times</h3>
              <div className="space-y-3">
                {[
                  { type: "General Enquiries", time: "Within 24h" },
                  { type: "Quote Requests", time: "Within 4h" },
                  { type: "Urgent / Emergency", time: "Immediate" },
                ].map(({ type, time }) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-xs text-[#6a80a0]">{type}</span>
                    <span className="text-xs font-semibold text-[#0055ff]">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#0a1628] mb-6">Send Us a Message</h2>

              {success ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0a1628] mb-2">Message Sent!</h3>
                  <p className="text-[#6a80a0]">We&apos;ll get back to you within 24 hours.</p>
                  <button onClick={() => setSuccess(false)} className="mt-6 text-sm text-[#0055ff] hover:underline">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-[#6a80a0] mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className="input-field w-full px-4 py-3 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6a80a0] mb-1.5">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@company.com" className="input-field w-full px-4 py-3 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6a80a0] mb-1.5">Company</label>
                      <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Acme Corp" className="input-field w-full px-4 py-3 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6a80a0] mb-1.5">Phone</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 234 567 8900" className="input-field w-full px-4 py-3 rounded-xl text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#6a80a0] mb-1.5">Service of Interest</label>
                    <select name="service" value={form.service} onChange={handleChange} className="input-field w-full px-4 py-3 rounded-xl text-sm appearance-none">
                      <option value="">Select a service...</option>
                      {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#6a80a0] mb-1.5">Message <span className="text-red-500">*</span></label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us about your cargo, route, timeline..." className="input-field w-full px-4 py-3 rounded-xl text-sm resize-none" />
                  </div>
                  {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-xl">{error}</p>}
                  <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold">
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <><Send size={18} />Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
