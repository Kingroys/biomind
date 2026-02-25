import { useState, useEffect } from 'react';
import { HelmetIcon } from './HelmetIcon';
import { GameBoard } from './GameBoard';
import { ColorSelector } from './ColorSelector';

export type HelmetColor = 'red' | 'blue' | 'green' | 'yellow';

export interface Guess {
  colors: (HelmetColor | null)[];
  feedback: {
    exact: number;
    color: number;
  } | null;
}

export function BioMindGame() {
  const [secretCode, setSecretCode] = useState<HelmetColor[]>([]);
  const [guesses, setGuesses] = useState<Guess[]>([
    { colors: [null, null, null], feedback: null },
  ]);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<HelmetColor | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  const maxGuesses = 6;

  // Initialize secret code
  useEffect(() => {
    generateSecretCode();
  }, []);

  const generateSecretCode = () => {
    const colors: HelmetColor[] = ['red', 'blue', 'green', 'yellow'];
    const code: HelmetColor[] = [];
    for (let i = 0; i < 3; i++) {
      code.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    setSecretCode(code);
    setGuesses([{ colors: [null, null, null], feedback: null }]);
    setCurrentGuessIndex(0);
    setGameWon(false);
    setGameLost(false);
    setSelectedColor(null);
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (rowIndex !== currentGuessIndex || !selectedColor || gameWon || gameLost) return;

    const newGuesses = [...guesses];
    newGuesses[rowIndex].colors[colIndex] = selectedColor;
    setGuesses(newGuesses);
  };

  const handleSubmitGuess = () => {
    const currentGuess = guesses[currentGuessIndex];
    
    // Check if all positions are filled
    if (currentGuess.colors.some(c => c === null)) {
      return;
    }

    // Calculate feedback
    const feedback = calculateFeedback(currentGuess.colors as HelmetColor[]);
    
    const newGuesses = [...guesses];
    newGuesses[currentGuessIndex].feedback = feedback;
    setGuesses(newGuesses);

    // Check win condition
    if (feedback.exact === 3) {
      setGameWon(true);
      return;
    }

    // Check lose condition
    if (currentGuessIndex === maxGuesses - 1) {
      setGameLost(true);
      return;
    }

    // Add new guess row
    setCurrentGuessIndex(currentGuessIndex + 1);
    setGuesses([...newGuesses, { colors: [null, null, null], feedback: null }]);
  };

  const calculateFeedback = (guess: HelmetColor[]) => {
    let exact = 0;
    let color = 0;

    const secretCopy = [...secretCode];
    const guessCopy = [...guess];

    // First pass: find exact matches
    for (let i = 0; i < 3; i++) {
      if (guessCopy[i] === secretCopy[i]) {
        exact++;
        secretCopy[i] = 'matched' as any;
        guessCopy[i] = 'matched' as any;
      }
    }

    // Second pass: find color matches
    for (let i = 0; i < 3; i++) {
      if (guessCopy[i] !== 'matched') {
        const foundIndex = secretCopy.findIndex((c, idx) => c === guessCopy[i] && c !== 'matched');
        if (foundIndex !== -1) {
          color++;
          secretCopy[foundIndex] = 'matched' as any;
        }
      }
    }

    return { exact, color };
  };

  const handleClearCell = (rowIndex: number, colIndex: number) => {
    if (rowIndex !== currentGuessIndex || gameWon || gameLost) return;

    const newGuesses = [...guesses];
    newGuesses[rowIndex].colors[colIndex] = null;
    setGuesses(newGuesses);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ 
      background: 'linear-gradient(180deg, #1a0a2e 0%, #3d1f5c 50%, #5c2d7a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background stars and question marks */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`
            }}
          >
            {Math.random() > 0.5 ? '✦' : '?'}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl w-full">
        {/* Title */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 blur-2xl opacity-50"></div>
          <h1 className="relative text-7xl font-black tracking-wider"
            style={{
              background: 'linear-gradient(180deg, #4dd0ff 0%, #1a8ccc 50%, #0056a6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 20px rgba(77, 208, 255, 0.5)',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8))'
            }}
          >
            BIO<span style={{
              background: 'linear-gradient(180deg, #ffd700 0%, #ff8c00 50%, #ff6b00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>MIND</span>
          </h1>
        </div>

        {/* Side avatars and game board */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Left avatars */}
          <div className="flex flex-col gap-4">
            <HelmetIcon color="red" size="lg" isStatic />
            <HelmetIcon color="blue" size="lg" isStatic />
            <HelmetIcon color="yellow" size="lg" isStatic />
          </div>

          {/* Game board */}
          <GameBoard 
            guesses={guesses}
            currentGuessIndex={currentGuessIndex}
            onCellClick={handleCellClick}
            onClearCell={handleClearCell}
            maxGuesses={maxGuesses}
          />

          {/* Right avatars */}
          <div className="flex flex-col gap-4">
            <HelmetIcon color="green" size="lg" isStatic />
            <HelmetIcon color="yellow" size="lg" isStatic />
            <HelmetIcon color="blue" size="lg" isStatic />
          </div>
        </div>

        {/* Banner */}
        <div className="relative w-full max-w-2xl">
          <div className="bg-gradient-to-b from-amber-700 to-amber-900 rounded-lg border-4 border-amber-950 shadow-2xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-800/20 to-amber-950/40"></div>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-amber-950 rounded-full border-2 border-amber-700"></div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-amber-950 rounded-full border-2 border-amber-700"></div>
            
            <h2 className="text-center text-3xl md:text-4xl font-black tracking-wider relative z-10"
              style={{
                color: '#ffd700',
                textShadow: '2px 2px 0 #ff6b00, 4px 4px 8px rgba(0, 0, 0, 0.8)',
              }}
            >
              {gameWon ? 'CODE CRACKED!' : gameLost ? 'GAME OVER!' : 'CAN YOU CRACK THE CODE?'}
            </h2>
          </div>
        </div>

        {/* Color selector */}
        <ColorSelector 
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
          disabled={gameWon || gameLost}
        />

        {/* Action buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSubmitGuess}
            disabled={guesses[currentGuessIndex]?.colors.some(c => c === null) || gameWon || gameLost}
            className="px-8 py-3 bg-gradient-to-b from-green-500 to-green-700 text-white font-bold text-xl rounded-lg border-4 border-green-900 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-400 hover:to-green-600 active:scale-95 transition-all"
          >
            SUBMIT GUESS
          </button>
          
          <button
            onClick={generateSecretCode}
            className="px-8 py-3 bg-gradient-to-b from-blue-500 to-blue-700 text-white font-bold text-xl rounded-lg border-4 border-blue-900 shadow-lg hover:from-blue-400 hover:to-blue-600 active:scale-95 transition-all"
          >
            NEW GAME
          </button>
        </div>

        {/* Debug mode - uncomment to see secret code */}
        {/* <div className="text-white">
          Secret: {secretCode.join(', ')}
        </div> */}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
