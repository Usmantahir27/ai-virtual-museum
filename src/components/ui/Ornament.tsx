import clsx from "clsx";

interface OrnamentProps {
  className?: string;
  strokeColor?: string;
  size?: number;
}

export default function Ornament({
  className,
  strokeColor = "#D4A017",
  size = 48,
}: OrnamentProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("inline-block", className)}
    >
      {/* Corner ornament: nested angular frame */}
      <path
        d="M4 44V4h40"
        stroke={strokeColor}
        strokeWidth="1"
        opacity="0.4"
      />
      <path
        d="M8 40V8h32"
        stroke={strokeColor}
        strokeWidth="0.75"
        opacity="0.3"
      />
      <path
        d="M4 4l6 6M44 4l-6 6"
        stroke={strokeColor}
        strokeWidth="0.75"
        opacity="0.5"
      />
      {/* Diamond accent */}
      <path
        d="M24 2l3 6-3 6-3-6z"
        stroke={strokeColor}
        strokeWidth="0.75"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
