import { HelmetIcon } from './HelmetIcon';
import { type HelmetColor } from './BioMindGame';

interface ColorSelectorProps {
  selectedColor: HelmetColor | null;
  onColorSelect: (color: HelmetColor) => void;
  disabled?: boolean;
}

const colors: HelmetColor[] = ['red', 'blue', 'green', 'yellow'];

export function ColorSelector({ selectedColor, onColorSelect, disabled }: ColorSelectorProps) {
  return (
    <div className="flex gap-4 p-4 bg-gradient-to-b from-amber-800 to-amber-900 rounded-lg border-4 border-amber-950 shadow-xl">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onColorSelect(color)}
          disabled={disabled}
          className="transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HelmetIcon 
            color={color} 
            size="lg" 
            isSelected={selectedColor === color}
          />
        </button>
      ))}
    </div>
  );
}
