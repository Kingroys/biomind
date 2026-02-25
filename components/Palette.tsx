"use client";

import { HELMET_IDS, type HelmetId } from "@/lib/gameLogic";
import { HelmetIcon } from "./HelmetIcon";

interface PaletteProps {
  onSelect: (helmet: HelmetId) => void;
  disabled?: boolean;
}

export function Palette({ onSelect, disabled }: PaletteProps) {
  return (
    <div className="palette" aria-label="Choose a helmet">
      {HELMET_IDS.map((id) => (
        <button
          key={id}
          type="button"
          className="palette__item"
          onClick={() => onSelect(id)}
          disabled={disabled}
          aria-label={`Select ${id} helmet`}
        >
          <HelmetIcon id={id} />
        </button>
      ))}
    </div>
  );
}
