"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import { transitions } from "@/lib/tokens";

const navLinks = [
  { href: "/chronicle", label: "Chronicle" },
  { href: "/collection", label: "Collection" },
  { href: "/atlas", label: "Atlas" },
  { href: "/galleries", label: "Galleries" },
  { href: "/questionnaire", label: "Questionnaire" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitions.stone}
      className={clsx(
        "fixed top-0 z-40 w-full transition-colors duration-[600ms]",
        scrolled ? "bg-obsidian/95 backdrop-blur-sm" : "bg-transparent",
      )}
    >
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
        <Link
          href="/"
          className="font-display text-xl tracking-[0.25em] text-gold transition-colors hover:text-parchment"
        >
          ARCHAION
        </Link>

        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded border border-stone/30 text-parchment transition hover:border-gold/60"
          onClick={() => setMobileOpen((current) => !current)}
        >
          {mobileOpen ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="group relative font-display text-xs uppercase tracking-[0.15em] text-parchment/70 transition-colors hover:text-parchment"
              >
                {label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-[400ms] ease-[cubic-bezier(0.43,0.13,0.23,0.96)] group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-obsidian/95 px-6 py-6 sm:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="font-display text-xl tracking-[0.25em] text-gold"
              onClick={() => setMobileOpen(false)}
            >
              ARCHAION
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded border border-stone/30 text-parchment transition hover:border-gold/60"
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>

          <div className="mt-12 space-y-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block rounded border border-stone/20 bg-obsidian/90 px-5 py-4 text-base font-display uppercase tracking-[0.15em] text-parchment transition hover:border-gold/50 hover:text-gold"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
}
