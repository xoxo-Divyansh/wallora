"use client";

import { usePathname } from "next/navigation";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFloatingButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      aria-label="Chat with Wallora on WhatsApp"
      className="fixed right-4 top-20 z-50 inline-flex items-center gap-2 rounded-full bg-[#1f7a4d] px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-black/15 transition hover:-translate-y-0.5 hover:bg-[#17643e] focus:outline-none focus:ring-2 focus:ring-[#1f7a4d] focus:ring-offset-2 sm:bottom-5 sm:right-5 sm:top-auto"
      href={createWhatsAppUrl()}
      rel="noreferrer"
      target="_blank"
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">WA</span>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
