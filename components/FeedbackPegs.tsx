"use client";

import type { Feedback } from "@/lib/gameLogic";

interface FeedbackPegsProps {
  feedback: Feedback | null;
}

export function FeedbackPegs({ feedback }: FeedbackPegsProps) {
  if (!feedback) {
    return (
      <div className="feedback-pegs">
        <div className="feedback-pegs__slots">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="feedback-peg feedback-peg--empty" />
          ))}
        </div>
      </div>
    );
  }
  const pegs: ("red" | "white")[] = [
    ...Array.from({ length: feedback.red }, () => "red" as const),
    ...Array.from({ length: feedback.white }, () => "white" as const),
  ];
  return (
    <div className="feedback-pegs">
      <div className="feedback-pegs__slots">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`feedback-peg ${pegs[i] ? `feedback-peg--${pegs[i]}` : "feedback-peg--empty"}`}
          />
        ))}
      </div>
    </div>
  );
}
