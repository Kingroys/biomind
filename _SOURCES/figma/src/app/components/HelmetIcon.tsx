import { type HelmetColor } from './BioMindGame';

interface HelmetIconProps {
  color: HelmetColor | null;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  isSelected?: boolean;
  isStatic?: boolean;
}

const colorMap = {
  red: {
    primary: '#e63946',
    secondary: '#f1faee',
    visor: '#1d3557',
  },
  blue: {
    primary: '#1e88e5',
    secondary: '#f1faee',
    visor: '#0d47a1',
  },
  green: {
    primary: '#43a047',
    secondary: '#f1faee',
    visor: '#1b5e20',
  },
  yellow: {
    primary: '#fdd835',
    secondary: '#f1faee',
    visor: '#f57f17',
  },
};

const sizeMap = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-20 h-20',
};

export function HelmetIcon({ color, size = 'md', onClick, isSelected, isStatic }: HelmetIconProps) {
  if (!color) {
    return (
      <div 
        className={`${sizeMap[size]} ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
      />
    );
  }

  const colors = colorMap[color];
  const sizeClass = sizeMap[size];

  return (
    <div 
      className={`${sizeClass} relative ${onClick ? 'cursor-pointer hover:scale-110' : ''} ${isSelected ? 'ring-4 ring-white ring-offset-2 ring-offset-transparent' : ''} ${!isStatic ? 'transition-transform' : ''} rounded-lg`}
      onClick={onClick}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Main helmet body */}
        <ellipse cx="50" cy="50" rx="42" ry="44" fill={colors.primary} stroke="#000" strokeWidth="3"/>
        
        {/* Top shine/stripe */}
        <ellipse cx="50" cy="25" rx="30" ry="12" fill={colors.secondary} opacity="0.4"/>
        
        {/* Side stripes */}
        <rect x="15" y="35" width="8" height="30" fill={colors.secondary} rx="4"/>
        <rect x="77" y="35" width="8" height="30" fill={colors.secondary} rx="4"/>
        
        {/* Visor */}
        <rect x="20" y="42" width="60" height="22" fill={colors.visor} stroke="#000" strokeWidth="2" rx="3"/>
        
        {/* Visor shine */}
        <rect x="25" y="46" width="35" height="6" fill="#4dd0ff" opacity="0.6" rx="2"/>
        
        {/* Bottom vent/grill */}
        <rect x="35" y="72" width="30" height="12" fill={colors.secondary} stroke="#000" strokeWidth="2" rx="2"/>
        <line x1="35" y1="76" x2="65" y2="76" stroke="#000" strokeWidth="1"/>
        <line x1="35" y1="80" x2="65" y2="80" stroke="#000" strokeWidth="1"/>
        
        {/* Antenna/decoration on top */}
        <rect x="48" y="8" width="4" height="8" fill={colors.secondary} stroke="#000" strokeWidth="1"/>
        <circle cx="50" cy="8" r="3" fill={colors.primary} stroke="#000" strokeWidth="1"/>
      </svg>
    </div>
  );
}
