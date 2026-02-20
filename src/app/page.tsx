"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";


export default function Home() {
  const [hovered, setHovered] = useState<"terminal" | "classic" | null>(null);

  return (
    <main className="h-screen flex flex-col md:flex-row overflow-hidden select-none">
      {/* ── Terminal Side ── */}
      <Link
        href="/terminal"
        className="relative flex items-center justify-center overflow-hidden group"
        style={{
          flex: hovered === "terminal" ? 1.4 : hovered === "classic" ? 0.6 : 1,
          backgroundColor: "#0a0a1a",
          transition: "flex 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        onMouseEnter={() => setHovered("terminal")}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-[60px] bg-gradient-to-b from-transparent via-[rgba(34,197,94,0.05)] to-transparent animate-scan" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="font-mono text-[#22c55e]/30 text-xs tracking-[0.3em] mb-8 uppercase">
            visitor@portfolio:~$
          </div>

          <h2 className="font-mono text-[#22c55e] text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider">
            PORTFOLIO INTERACTIF
          </h2>

          <p className="font-mono text-[#22c55e]/35 text-sm mt-5 max-w-xs mx-auto">
            Explorez via le terminal
          </p>

          {/* Blinking cursor */}
          <div className="mt-10 font-mono text-[#22c55e]/50 text-sm">
            <span>$ </span>
            <span className="cursor-blink inline-block w-2 h-4 bg-[#22c55e]/50 align-middle" />
          </div>
        </motion.div>

        {/* Hover glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{ opacity: hovered === "terminal" ? 1 : 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#22c55e]/5 to-transparent" />
        </div>
      </Link>

      {/* ── Divider ── */}
      <div className="hidden md:block w-px bg-gradient-to-b from-[#22c55e]/0 via-[#a855f7]/30 to-[#22c55e]/0" />
      <div className="md:hidden h-px bg-gradient-to-r from-[#22c55e]/0 via-[#a855f7]/30 to-[#22c55e]/0" />

      {/* ── Classic Side ── */}
      <Link
        href="/classic"
        className="relative flex items-center justify-center overflow-hidden group"
        style={{
          flex: hovered === "classic" ? 1.4 : hovered === "terminal" ? 0.6 : 1,
          backgroundColor: "#fafafa",
          transition: "flex 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        onMouseEnter={() => setHovered("classic")}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/moicv.png`}
            alt="Maxime LAUNOY"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 mx-auto mb-8 shadow-lg"
          />

          <h2 className="font-[family-name:var(--font-syne)] text-[#0a0a1a] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            PORTFOLIO
          </h2>

          <p className="text-gray-400 text-sm mt-5 max-w-xs mx-auto">
            Découvrir mon parcours
          </p>
        </motion.div>

        {/* Hover glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{ opacity: hovered === "classic" ? 1 : 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#7c3aed]/5 to-transparent" />
        </div>
      </Link>
    </main>
  );
}
