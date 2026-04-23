import clsx from "clsx";

type BadgeVariant = "civilization" | "era" | "material" | "type";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  civilization: "border-gold/40 bg-gold/10 text-gold",
  era: "border-lapis/40 bg-lapis/10 text-sandstone",
  material: "border-terracotta/40 bg-terracotta/10 text-terracotta",
  type: "border-stone/40 bg-stone/10 text-parchment",
};

export default function Badge({
  variant = "type",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-sm border px-2 py-0.5 font-display text-[0.65rem] uppercase tracking-[0.15em]",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
