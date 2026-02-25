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
  currentGuess: Guess;
  onSlotClick: (index: number) => void;
  revealCode: boolean;
  codeLabel?: string;
}

export function Board({
  secretCode,
  history,
  currentGuess,
  onSlotClick,
  revealCode,
  codeLabel,
}: BoardProps) {
  const currentRowIndex = history.length;

  return (
    <div className="board">
      {codeLabel && revealCode && (
        <p className="board__code-label">{codeLabel}</p>
      )}
      <div className="board__code-row board__guess-row">
        <div className="board__line-number board__line-number--empty" aria-hidden />
        <div className="board__feedback-spacer" aria-hidden />
        <div className="board__guess-slots">
          {secretCode.map((helmet, i) => (
            <HelmetSlot
              key={i}
              helmet={revealCode ? helmet : null}
              hidden={!revealCode}
            />
          ))}
        </div>
        <div className="board__feedback-spacer" aria-hidden />
      </div>
      <hr className="board__divider" aria-hidden />
      <div className="board__guess-rows">
        {Array.from({ length: ROWS }, (_, rowIndex) => {
          const isCurrentRow = rowIndex === currentRowIndex;
          const guessForRow: (HelmetId | null)[] =
            rowIndex < history.length
              ? (history[rowIndex].guess as (HelmetId | null)[])
              : rowIndex === currentRowIndex
                ? currentGuess
                : [null, null, null, null];
          const feedback =
            rowIndex < history.length ? history[rowIndex].feedback : null;

          return (
            <div key={rowIndex} className="board__guess-row">
              <span className="board__line-number" aria-label={`Line ${rowIndex + 1}`}>
                #{rowIndex + 1}
              </span>
              <div className="board__feedback-spacer" aria-hidden />
              <div className="board__guess-slots">
                {[0, 1, 2, 3].map((colIndex) => (
                  <HelmetSlot
                    key={colIndex}
                    helmet={guessForRow[colIndex]}
                    onClick={isCurrentRow ? () => onSlotClick(colIndex) : undefined}
                    interactive={isCurrentRow}
                  />
                ))}
              </div>
              <FeedbackPegs feedback={feedback} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
