"use client";

import type { HelmetId } from "@/lib/gameLogic";

const colorMap: Record<
  HelmetId,
  { primary: string; secondary: string; visor: string }
> = {
  red: {
    primary: "#e63946",
    secondary: "#f1faee",
    visor: "#1d3557",
  },
  blue: {
    primary: "#1e88e5",
    secondary: "#f1faee",
    visor: "#0d47a1",
  },
  green: {
    primary: "#43a047",
    secondary: "#f1faee",
    visor: "#1b5e20",
  },
  yellow: {
    primary: "#fdd835",
    secondary: "#f1faee",
    visor: "#f57f17",
  },
};

interface FigmaHelmetIconProps {
  id: HelmetId;
  className?: string;
  size?: number;
  selected?: boolean;
}

/** Detailed helmet SVG from Figma Make design (ellipse body, visor, stripes, grill). */
export function FigmaHelmetIcon({
  id,
  className,
  size,
  selected,
}: FigmaHelmetIconProps) {
  const colors = colorMap[id];
  return (
    <div
      className={className}
      style={{
        ...(size != null ? { width: size, height: size } : { width: "100%", height: "100%" }),
        ...(selected
          ? {
              boxShadow: "0 0 0 4px white",
              outline: "2px solid transparent",
              outlineOffset: 2,
              borderRadius: 8,
            }
          : {}),
      }}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <ellipse
          cx="50"
          cy="50"
          rx="42"
          ry="44"
          fill={colors.primary}
          stroke="#000"
          strokeWidth="3"
        />
        <ellipse
          cx="50"
          cy="25"
          rx="30"
          ry="12"
          fill={colors.secondary}
          opacity="0.4"
        />
        <rect
          x="15"
          y="35"
          width="8"
          height="30"
          fill={colors.secondary}
          rx="4"
        />
        <rect
          x="77"
          y="35"
          width="8"
          height="30"
          fill={colors.secondary}
          rx="4"
        />
        <rect
          x="20"
          y="42"
          width="60"
          height="22"
          fill={colors.visor}
          stroke="#000"
          strokeWidth="2"
          rx="3"
        />
        <rect
          x="25"
          y="46"
          width="35"
          height="6"
          fill="#4dd0ff"
          opacity="0.6"
          rx="2"
        />
        <rect
          x="35"
          y="72"
          width="30"
          height="12"
          fill={colors.secondary}
          stroke="#000"
          strokeWidth="2"
          rx="2"
        />
        <line x1="35" y1="76" x2="65" y2="76" stroke="#000" strokeWidth="1" />
        <line x1="35" y1="80" x2="65" y2="80" stroke="#000" strokeWidth="1" />
        <rect
          x="48"
          y="8"
          width="4"
          height="8"
          fill={colors.secondary}
          stroke="#000"
          strokeWidth="1"
        />
        <circle
          cx="50"
          cy="8"
          r="3"
          fill={colors.primary}
          stroke="#000"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
