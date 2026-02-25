"use client";

import type { Guess } from "@/lib/gameLogic";
import { HelmetSlot } from "./HelmetSlot";

interface CurrentGuessProps {
  guess: Guess;
  onSlotClick: (index: number) => void;
  onSubmit: () => void;
  disabled?: boolean;
  canSubmit: boolean;
}

export function CurrentGuess({
  guess,
  onSlotClick,
  onSubmit,
  disabled,
  canSubmit,
}: CurrentGuessProps) {
  return (
    <div className="current-guess">
      <div className="current-guess__slots">
        {guess.map((helmet, i) => (
          <HelmetSlot
            key={i}
            helmet={helmet}
            onClick={() => onSlotClick(i)}
            interactive={!disabled}
          />
        ))}
      </div>
      <button
        type="button"
        className="current-guess__submit"
        onClick={onSubmit}
        disabled={disabled || !canSubmit}
      >
        Submit
      </button>
    </div>
  );
}
