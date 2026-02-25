"use client";

import type { HelmetId } from "@/lib/gameLogic";

const colors: Record<HelmetId, string> = {
  red: "#c62828",
  blue: "#1565c0",
  green: "#2e7d32",
  yellow: "#f9a825",
};

interface HelmetIconProps {
  id: HelmetId;
  className?: string;
}

/** Pixel-style helmet face: same shape, color varies. */
export function HelmetIcon({ id, className }: HelmetIconProps) {
  const fill = colors[id];
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Main helmet shape - rounded top, straight sides */}
      <path fill={fill} d="M4 8v16h24V8c0-2-2-4-4-4H8C6 4 4 6 4 8z" />
      {/* Visor - white */}
      <rect x="8" y="14" width="16" height="6" rx="1" fill="#f0f0f0" />
      {/* Side detail (ear/comm) */}
      <rect x="2" y="12" width="4" height="8" rx="1" fill={fill} />
      <rect x="26" y="12" width="4" height="8" rx="1" fill={fill} />
    </svg>
  );
}
