"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Anchor, Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f8ff] grid-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0055ff] to-[#0088cc] flex items-center justify-center mx-auto mb-4 glow-blue">
            <Anchor size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-[#0a1628]">Admin Portal</h1>
          <p className="text-sm text-[#6a80a0] mt-1">U-Class Cargo Logistics</p>
        </div>

        <div className="glass-card rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs text-[#6a80a0] mb-1.5">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="admin" className="input-field w-full px-4 py-3 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs text-[#6a80a0] mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="input-field w-full px-4 py-3 pr-11 rounded-xl text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0b0c8] hover:text-[#6a80a0]">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-xl">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold">
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
