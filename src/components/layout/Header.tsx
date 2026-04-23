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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-xl tracking-[0.25em] text-gold transition-colors hover:text-parchment"
        >
          ARCHAION
        </Link>

        <ul className="flex items-center gap-8">
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
    </motion.header>
  );
}
