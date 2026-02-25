import { HelmetIcon } from './HelmetIcon';
import { type Guess } from './BioMindGame';

interface GameBoardProps {
  guesses: Guess[];
  currentGuessIndex: number;
  onCellClick: (rowIndex: number, colIndex: number) => void;
  onClearCell: (rowIndex: number, colIndex: number) => void;
  maxGuesses: number;
}

export function GameBoard({ guesses, currentGuessIndex, onCellClick, onClearCell, maxGuesses }: GameBoardProps) {
  // Pad guesses to show all rows
  const displayGuesses = [...guesses];
  while (displayGuesses.length < maxGuesses) {
    displayGuesses.push({ colors: [null, null, null], feedback: null });
  }

  return (
    <div className="bg-gradient-to-b from-amber-900 to-amber-950 p-4 rounded-lg border-4 border-amber-950 shadow-2xl">
      <div className="flex gap-4">
        {/* Main guess area */}
        <div className="bg-gradient-to-b from-amber-800 to-amber-900 p-3 rounded border-2 border-amber-950">
          <div className="grid grid-cols-3 gap-2">
            {displayGuesses.map((guess, rowIndex) => (
              guess.colors.map((color, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-20 h-20 bg-amber-950 rounded border-2 border-amber-800 flex items-center justify-center ${
                    rowIndex === currentGuessIndex ? 'cursor-pointer hover:bg-amber-900' : ''
                  } ${rowIndex < currentGuessIndex ? 'opacity-70' : ''} transition-colors`}
                  onClick={() => color ? onClearCell(rowIndex, colIndex) : onCellClick(rowIndex, colIndex)}
                >
                  <HelmetIcon color={color} size="md" />
                </div>
              ))
            ))}
          </div>
        </div>

        {/* Feedback pegs area */}
        <div className="bg-gradient-to-b from-amber-800 to-amber-900 p-3 rounded border-2 border-amber-950">
          <div className="flex flex-col gap-3">
            {displayGuesses.map((guess, rowIndex) => (
              <div key={rowIndex} className="w-16 h-16 bg-amber-950 rounded border-2 border-amber-800 flex items-center justify-center p-1">
                {guess.feedback && (
                  <div className="grid grid-cols-2 gap-1">
                    {/* Exact matches (red pegs) */}
                    {[...Array(guess.feedback.exact)].map((_, i) => (
                      <div key={`exact-${i}`} className="w-5 h-5 bg-red-600 rounded-full border-2 border-black"></div>
                    ))}
                    {/* Color matches (white pegs) */}
                    {[...Array(guess.feedback.color)].map((_, i) => (
                      <div key={`color-${i}`} className="w-5 h-5 bg-white rounded-full border-2 border-black"></div>
                    ))}
                    {/* Empty slots */}
                    {[...Array(4 - guess.feedback.exact - guess.feedback.color)].map((_, i) => (
                      <div key={`empty-${i}`} className="w-5 h-5"></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
