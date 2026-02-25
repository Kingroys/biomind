"use client";

import type { HelmetId } from "@/lib/gameLogic";

const colors: Record<HelmetId, string> = {
  red: "#e5534b",
  blue: "#58a6ff",
  green: "#3fb950",
  yellow: "#d29922",
};

interface HelmetIconProps {
  id: HelmetId;
  className?: string;
}

export function HelmetIcon({ id, className }: HelmetIconProps) {
  const fill = colors[id];
  const gradientId = `shine-${id}`;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="32"
      height="32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" fill={fill} />
      <circle cx="12" cy="12" r="10" fill={`url(#${gradientId})`} fillOpacity="0.25" />
      <defs>
        <linearGradient id={gradientId} x1="8" y1="8" x2="16" y2="16">
          <stop stopColor="#fff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
