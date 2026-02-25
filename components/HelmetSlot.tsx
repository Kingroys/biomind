"use client";

import type { HelmetId } from "@/lib/gameLogic";
import { HelmetIcon } from "./HelmetIcon";

interface HelmetSlotProps {
  helmet: HelmetId | null;
  hidden?: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

export function HelmetSlot({
  helmet,
  hidden,
  onClick,
  interactive,
}: HelmetSlotProps) {
  const handleClick = interactive ? onClick : undefined;
  return (
    <button
      type="button"
      className={`helmet-slot ${hidden ? "helmet-slot--hidden" : ""} ${interactive ? "helmet-slot--interactive" : ""}`}
      onClick={handleClick}
      disabled={!interactive}
      aria-label={helmet ? `Helmet ${helmet}` : "Empty slot"}
    >
      {!hidden && helmet && (
        <HelmetIcon id={helmet} className="helmet-slot__icon" />
      )}
    </button>
  );
}
