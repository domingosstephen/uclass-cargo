"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AdminLogout() {
  const router = useRouter();
  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-[#6a80a0] hover:text-[#0a1628] transition-colors">
      <LogOut size={16} />Logout
    </button>
  );
}
