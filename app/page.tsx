"use client";

import { useCallback, useState } from "react";
import {
  generateCode,
  evaluateGuess,
  isGuessComplete,
  type Code,
  type Guess,
  type HelmetId,
  type HistoryEntry,
} from "@/lib/gameLogic";
import { Board } from "@/components/Board";
import { Palette } from "@/components/Palette";
import { CurrentGuess } from "@/components/CurrentGuess";

type GameStatus = "playing" | "won" | "lost";

const EMPTY_GUESS: Guess = [null, null, null, null];

function useGameState() {
  const [secretCode, setSecretCode] = useState<Code>(() => generateCode());
  const [currentGuess, setCurrentGuess] = useState<Guess>([...EMPTY_GUESS]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [status, setStatus] = useState<GameStatus>("playing");

  const addToGuess = useCallback((helmet: HelmetId) => {
    setCurrentGuess((prev) => {
      const next = [...prev];
      const idx = next.findIndex((s) => s === null);
      if (idx === -1) return prev;
      next[idx] = helmet;
      return next;
    });
  }, []);

  const removeFromGuess = useCallback((index: number) => {
    setCurrentGuess((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }, []);

  const submitGuess = useCallback(() => {
    if (!isGuessComplete(currentGuess)) return;
    const feedback = evaluateGuess(secretCode, currentGuess);
    setHistory((h) => [...h, { guess: [...currentGuess], feedback }]);
    setCurrentGuess([...EMPTY_GUESS]);
    if (feedback.red === 4) setStatus("won");
    else if (history.length + 1 >= 6) setStatus("lost");
  }, [secretCode, currentGuess, history.length]);

  const newGame = useCallback(() => {
    setSecretCode(generateCode());
    setCurrentGuess([...EMPTY_GUESS]);
    setHistory([]);
    setStatus("playing");
  }, []);

  return {
    secretCode,
    currentGuess,
    history,
    status,
    addToGuess,
    removeFromGuess,
    submitGuess,
    newGame,
  };
}

export default function Home() {
  const {
    secretCode,
    currentGuess,
    history,
    status,
    addToGuess,
    removeFromGuess,
    submitGuess,
    newGame,
  } = useGameState();

  const gameOver = status === "won" || status === "lost";
  const canSubmit =
    isGuessComplete(currentGuess) && history.length < 6 && !gameOver;

  return (
    <main className="screen">
      <div className="container">
        <header className="header">
          <h1 className="title">
            BIO<span className="title-mind">MIND</span>
          </h1>
          <p className="subtitle">Guess the 4-color code in 6 tries</p>
        </header>

        <p className="rules">
          <span className="rules__peg rules__peg--exact" /> = right color, right
          spot &nbsp;·&nbsp;{" "}
          <span className="rules__peg rules__peg--wrong" /> = right color,
          wrong spot
        </p>

        <section className="game">
          <div className="current-row">
            <p className="current-row__label">Your guess</p>
            <CurrentGuess
              guess={currentGuess}
              onSlotClick={removeFromGuess}
              onSubmit={submitGuess}
              disabled={gameOver}
              canSubmit={!!canSubmit}
              showSubmit={true}
            />
            <Palette onSelect={addToGuess} disabled={gameOver} />
          </div>

          <Board
            secretCode={secretCode}
            history={history}
            revealCode={gameOver}
            codeLabel={status === "lost" ? "The code was:" : undefined}
          />
        </section>

        {gameOver && (
          <div className="result" role="alert">
            <p className="result__message">
              {status === "won" ? (
                <>You cracked it!</>
              ) : (
                <>Out of tries. The code is shown above.</>
              )}
            </p>
            <button
              type="button"
              className="result__button"
              onClick={newGame}
            >
              New game
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
