import clsx from "clsx";

type DividerVariant = "meander" | "lotus" | "arabesque";

interface DividerProps {
  variant?: DividerVariant;
  className?: string;
  strokeColor?: string;
}

function MeanderPattern({ stroke }: { stroke: string }) {
  return (
    <svg
      viewBox="0 0 400 20"
      preserveAspectRatio="none"
      className="h-5 w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <pattern
        id="meander"
        x="0"
        y="0"
        width="40"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M0 10h10v-10h20v10h10M10 10v10h20v-10"
          stroke={stroke}
          strokeWidth="1.5"
          fill="none"
        />
      </pattern>
      <rect width="100%" height="100%" fill="url(#meander)" />
    </svg>
  );
}

function LotusPattern({ stroke }: { stroke: string }) {
  return (
    <svg
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      className="h-6 w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <pattern
        id="lotus"
        x="0"
        y="0"
        width="60"
        height="24"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M30 4c-4 8-12 14-12 14s8-2 12-2 12 2 12 2-8-6-12-14z"
          stroke={stroke}
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M30 6c-2 5-6 10-6 10s4-1 6-1 6 1 6 1-4-5-6-10z"
          stroke={stroke}
          strokeWidth="0.75"
          fill="none"
          opacity="0.6"
        />
        <line
          x1="0"
          y1="22"
          x2="60"
          y2="22"
          stroke={stroke}
          strokeWidth="0.5"
          opacity="0.3"
        />
      </pattern>
      <rect width="100%" height="100%" fill="url(#lotus)" />
    </svg>
  );
}

function ArabesquePattern({ stroke }: { stroke: string }) {
  return (
    <svg
      viewBox="0 0 400 20"
      preserveAspectRatio="none"
      className="h-5 w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <pattern
        id="arabesque"
        x="0"
        y="0"
        width="50"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <circle
          cx="25"
          cy="10"
          r="8"
          stroke={stroke}
          strokeWidth="0.75"
          fill="none"
        />
        <circle
          cx="25"
          cy="10"
          r="4"
          stroke={stroke}
          strokeWidth="0.5"
          fill="none"
          opacity="0.6"
        />
        <line
          x1="0"
          y1="10"
          x2="17"
          y2="10"
          stroke={stroke}
          strokeWidth="0.5"
          opacity="0.4"
        />
        <line
          x1="33"
          y1="10"
          x2="50"
          y2="10"
          stroke={stroke}
          strokeWidth="0.5"
          opacity="0.4"
        />
      </pattern>
      <rect width="100%" height="100%" fill="url(#arabesque)" />
    </svg>
  );
}

const patterns: Record<
  DividerVariant,
  React.ComponentType<{ stroke: string }>
> = {
  meander: MeanderPattern,
  lotus: LotusPattern,
  arabesque: ArabesquePattern,
};

export default function Divider({
  variant = "meander",
  className,
  strokeColor = "#D4A017",
}: DividerProps) {
  const Pattern = patterns[variant];
  return (
    <div className={clsx("w-full opacity-60", className)} role="separator">
      <Pattern stroke={strokeColor} />
    </div>
  );
}
