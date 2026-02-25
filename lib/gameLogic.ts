export type HelmetId = "red" | "blue" | "green" | "yellow";

export const HELMET_IDS: readonly HelmetId[] = [
  "red",
  "blue",
  "green",
  "yellow",
];

export type Code = [HelmetId, HelmetId, HelmetId, HelmetId];

export type Guess = (HelmetId | null)[];

export interface Feedback {
  red: number;
  white: number;
}

export interface HistoryEntry {
  guess: Guess;
  feedback: Feedback;
}

export function generateCode(): Code {
  const ids = [...HELMET_IDS];
  const code: HelmetId[] = [];
  for (let i = 0; i < 4; i++) {
    const idx = Math.floor(Math.random() * ids.length);
    code.push(ids[idx]);
    ids.splice(idx, 1);
  }
  return code as Code;
}

/**
 * Standard Mastermind feedback: red = correct position, white = correct helmet wrong position.
 * Each code peg is used at most once for feedback.
 */
export function evaluateGuess(secret: Code, guess: Guess): Feedback {
  if (guess.length !== 4 || guess.some((g) => g === null)) {
    return { red: 0, white: 0 };
  }
  const code = [...secret];
  const g = guess as HelmetId[];
  let red = 0;
  const codeUsed: boolean[] = [false, false, false, false];
  const guessUsed: boolean[] = [false, false, false, false];

  for (let i = 0; i < 4; i++) {
    if (g[i] === code[i]) {
      red++;
      codeUsed[i] = true;
      guessUsed[i] = true;
    }
  }

  let white = 0;
  for (let gi = 0; gi < 4; gi++) {
    if (guessUsed[gi]) continue;
    for (let ci = 0; ci < 4; ci++) {
      if (codeUsed[ci]) continue;
      if (g[gi] === code[ci]) {
        white++;
        codeUsed[ci] = true;
        break;
      }
    }
  }

  return { red, white };
}

export function isGuessComplete(
  guess: Guess
): guess is [HelmetId, HelmetId, HelmetId, HelmetId] {
  return guess.length === 4 && guess.every((g) => g !== null);
}
