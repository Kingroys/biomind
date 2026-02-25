"use client";

import type { HelmetId } from "@/lib/gameLogic";
import { FigmaHelmetIcon } from "./FigmaHelmetIcon";

interface HelmetIconProps {
  id: HelmetId;
  className?: string;
  size?: number;
  selected?: boolean;
}

export function HelmetIcon({ id, className, size, selected }: HelmetIconProps) {
  return (
    <FigmaHelmetIcon
      id={id}
      className={className}
      size={size}
      selected={selected}
    />
  );
}
