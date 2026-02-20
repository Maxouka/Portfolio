"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";


/* ── Scroll-reveal wrapper ── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Section heading with large decorative number ── */
function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="relative mb-14">
      <span className="absolute -left-2 -top-10 text-[7rem] font-bold text-[#7c3aed]/10 font-[family-name:var(--font-syne)] select-none pointer-events-none leading-none">
        {number}
      </span>
      <h2 className="relative text-3xl font-bold text-gray-900 font-[family-name:var(--font-syne)]">
        {title}
      </h2>
      <div className="mt-3 w-14 h-1 bg-[#7c3aed] rounded-full" />
    </div>
  );
}

/* ── Nav links ── */
const NAV_LINKS = [
  { label: "Expérience", href: "#experience" },
  { label: "Compétences", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Formation", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function ClassicPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-[family-name:var(--font-inter)]">
      {/* ════════ Navbar ════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-syne)] font-bold text-lg text-gray-900 hover:text-[#7c3aed] transition-colors"
          >
            ML
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          <Link
            href="/terminal"
            className="text-[13px] text-[#7c3aed] hover:text-[#6d28d9] font-mono font-medium transition-colors"
          >
            {">"} Terminal
          </Link>
        </div>
      </nav>

      {/* ════════ Hero ════════ */}
      <section className="pt-36 pb-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-14">
          <motion.div
            className="w-36 h-36 rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-100 shrink-0"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/moicv.png`}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-syne)] tracking-tight text-gray-900">
              {profile.name}
            </h1>
            <p className="text-lg text-[#7c3aed] mt-3 font-medium">
              {profile.title}
            </p>
            <p className="text-gray-500 mt-5 max-w-lg leading-relaxed">
              {profile.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`/resume.pdf`}
                download
                className="px-6 py-3 bg-[#7c3aed] text-white text-sm rounded-lg font-medium hover:bg-[#6d28d9] transition-colors"
              >
                Télécharger CV
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-gray-200 text-sm rounded-lg font-medium hover:border-[#7c3aed] hover:text-[#7c3aed] transition-colors"
              >
                Me contacter
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ Experience ════════ */}
      <section id="experience" className="py-24 px-6 bg-gray-50/80">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SectionHeading number="01" title="Expériences" />
          </Reveal>

          <div className="space-y-6">
            {profile.experiences.map((exp, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span className="text-[#7c3aed] font-mono text-sm font-medium">
                      {exp.period}
                    </span>
                    <span className="text-gray-400 text-sm">
                      · {exp.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-syne)]">
                    {exp.title}
                  </h3>
                  {exp.context && (
                    <p className="text-gray-500 text-sm mt-1">{exp.context}</p>
                  )}
                  <ul className="mt-4 space-y-2">
                    {exp.details.map((detail, j) => (
                      <li
                        key={j}
                        className="text-gray-600 text-sm flex gap-2"
                      >
                        <span className="text-[#7c3aed] mt-0.5 shrink-0">
                          ▸
                        </span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ Skills ════════ */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SectionHeading number="02" title="Compétences" />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(profile.skills).map(([category, skills], i) => (
              <Reveal key={category} delay={i * 0.08}>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-xs uppercase tracking-[0.15em] text-[#7c3aed] mb-4">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1.5 bg-white text-gray-700 text-sm rounded-lg border border-gray-200"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ Projects ════════ */}
      <section id="projects" className="py-24 px-6 bg-gray-50/80">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SectionHeading number="03" title="Projets" />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {profile.projects.map((project, i) => (
              <Reveal key={project.name} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold font-[family-name:var(--font-syne)]">
                      {project.name}
                    </h3>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#7c3aed]/10 text-[#7c3aed] shrink-0 ml-3">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  {project.stats && (
                    <p className="text-gray-400 text-xs mt-3 font-mono">
                      {project.stats}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.split(", ").map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 bg-gray-50 text-gray-500 rounded border border-gray-100"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`https://${project.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-5 text-sm text-[#7c3aed] hover:text-[#6d28d9] transition-colors"
                  >
                    {project.url} &rarr;
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ Education ════════ */}
      <section id="education" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SectionHeading number="04" title="Formation" />
          </Reveal>

          <div className="space-y-8">
            {profile.education.map((edu, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex gap-6 items-start">
                  <span className="text-[#7c3aed] font-mono text-sm font-medium shrink-0 w-28 pt-0.5">
                    {edu.year}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.title}</h3>
                    <p className="text-gray-500 text-sm mt-0.5">
                      {edu.school}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ Contact ════════ */}
      <section
        id="contact"
        className="py-24 px-6 bg-[#0a0a1a] text-white"
      >
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl font-bold font-[family-name:var(--font-syne)] mb-4">
              Travaillons ensemble
            </h2>
            <p className="text-gray-400 mb-10 max-w-md mx-auto">
              Disponible immédiatement. N&apos;hésitez pas à me contacter.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="text-[#a855f7] hover:text-white transition-colors"
              >
                {profile.email}
              </a>
              <a
                href={`https://${profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a855f7] hover:text-white transition-colors"
              >
                {profile.github}
              </a>
              <a
                href={`https://${profile.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a855f7] hover:text-white transition-colors"
              >
                {profile.linkedin}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <a
              href={`/resume.pdf`}
              download
              className="inline-block px-8 py-3 bg-[#7c3aed] text-white text-sm rounded-lg font-medium hover:bg-[#6d28d9] transition-colors"
            >
              Télécharger mon CV
            </a>
          </Reveal>
        </div>
      </section>

      {/* ════════ Footer ════════ */}
      <footer className="py-6 px-6 bg-[#0a0a1a] border-t border-white/5">
        <div className="max-w-5xl mx-auto flex justify-between items-center text-sm text-gray-500">
          <span>&copy; 2026 {profile.name}</span>
          <Link
            href="/terminal"
            className="text-[#22c55e] hover:text-[#22c55e]/70 font-mono text-xs transition-colors"
          >
            {">"} mode terminal
          </Link>
        </div>
      </footer>
    </div>
  );
}
