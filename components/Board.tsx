"use client";

import type {
  Code,
  Guess,
  Feedback,
  HelmetId,
  HistoryEntry,
} from "@/lib/gameLogic";
import { HelmetSlot } from "./HelmetSlot";
import { FeedbackPegs } from "./FeedbackPegs";

const ROWS = 6;

interface BoardProps {
  secretCode: Code;
  history: HistoryEntry[];
  revealCode: boolean;
  codeLabel?: string;
}

export function Board({ secretCode, history, revealCode, codeLabel }: BoardProps) {
  return (
    <div className="board">
      {codeLabel && revealCode && (
        <p className="board__code-label">{codeLabel}</p>
      )}
      <div className="board__code-row">
        {secretCode.map((helmet, i) => (
          <HelmetSlot
            key={i}
            helmet={revealCode ? helmet : null}
            hidden={!revealCode}
          />
        ))}
      </div>
      <div className="board__guess-rows">
        {Array.from({ length: ROWS }, (_, rowIndex) => (
          <div key={rowIndex} className="board__guess-row">
            <div className="board__guess-slots">
              {[0, 1, 2, 3].map((colIndex) => {
                const entry = history[rowIndex];
                const guess = entry?.guess ?? null;
                const helmet =
                  guess && guess[colIndex] !== null ? guess[colIndex] : null;
                return (
                  <HelmetSlot
                    key={colIndex}
                    helmet={helmet as HelmetId | null}
                  />
                );
              })}
            </div>
            <FeedbackPegs
              feedback={history[rowIndex]?.feedback ?? null}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
