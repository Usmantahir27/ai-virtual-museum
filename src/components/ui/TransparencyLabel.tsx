"use client";

import { useTransparency, getTransparencyLabel } from "@/lib/TransparencyContext";

export default function TransparencyLabel({ className }: { className?: string }) {
  const condition = useTransparency();
  const label = getTransparencyLabel(condition);
  if (!label) return null;
  return (
    <div
      className={`border border-stone/20 bg-obsidian/60 px-4 py-3 text-sm italic text-parchment/60 ${className ?? ""}`}
    >
      {label}
    </div>
  );
}
