import React from 'react';

interface InklopLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * High-fidelity vector rendition of INKLOP logo matching user-provided images.
 */
export const InklopLogo: React.FC<InklopLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
}) => {
  const textColor = variant === 'light' ? '#FFFFFF' : '#101010';

  // Heights for various sizes
  const heightMap = {
    sm: 24,
    md: 32,
    lg: 44,
    xl: 56,
  };

  const height = heightMap[size] || 32;
  const width = (height * 3.3).toFixed(0);

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 340 100"
        height={height}
        width={width}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-label="INKLOP Logo"
      >
        <defs>
          {/* Swirl crescent gradient: from Purple at top to Orange at bottom-left to Fuchsia */}
          <linearGradient id="inklop-crescent-grad" x1="0.1" y1="0.8" x2="0.8" y2="0.1">
            <stop offset="0%" stopColor="#FF5A1F" />
            <stop offset="35%" stopColor="#F51E78" />
            <stop offset="70%" stopColor="#C415D4" />
            <stop offset="100%" stopColor="#7928CA" />
          </linearGradient>

          {/* Dot gradient: Purple to Fuchsia */}
          <linearGradient id="inklop-dot-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8A2BE2" />
            <stop offset="100%" stopColor="#C71585" />
          </linearGradient>
        </defs>

        {/* --- LETTER 'i' --- */}
        <rect x="18" y="14" width="11" height="11" rx="1.5" fill={textColor} />
        <rect x="18" y="32" width="11" height="38" rx="1.5" fill={textColor} />

        {/* --- LETTER 'n' --- */}
        <path
          d="M38 32 H48 V38.5 C50.5 34 54.8 31 61.5 31 C71 31 75 37 75 46.5 V70 H64 V48.5 C64 42.5 61.8 39.5 56.5 39.5 C50.8 39.5 48 43.5 48 50 V70 H38 V32 Z"
          fill={textColor}
        />

        {/* --- LETTER 'k' --- */}
        <rect x="85" y="14" width="10.5" height="56" rx="1.5" fill={textColor} />
        <path
          d="M107 32 L95.5 49 L109.5 70 H97 L88 56 L88 47 L100 32 H107 Z"
          fill={textColor}
        />

        {/* --- LETTER 'l' --- */}
        <rect x="119" y="14" width="10.5" height="56" rx="1.5" fill={textColor} />

        {/* --- ICON 'o' SWIRL CRESCENT --- */}
        {/* Outer and inner sweeping crescent curve */}
        <g transform="translate(138, 20)">
          {/* Main crescent */}
          <path
            d="M 45 4
               C 35 1, 23 2, 13 9
               C 2 17, -4 30, -3 45
               C -2 58, 6 69, 18 73
               C 30 77, 43 72, 49 61
               C 53 54, 53 45, 52 40
               C 47 48, 38 54, 28 54
               C 17 54, 9 46, 8 36
               C 7 24, 15 15, 27 12
               C 33 10, 40 10, 45 4 Z"
            fill="url(#inklop-crescent-grad)"
          />

          {/* Dot at top right */}
          <circle cx="48" cy="19" r="8" fill="url(#inklop-dot-grad)" />
        </g>

        {/* --- LETTER 'p' --- */}
        <path
          d="M208 32 H218 V38.5 C221 34 226 31 234 31 C246 31 254 40.5 254 52.5 C254 64.5 245.5 73.5 233.5 73.5 C226 73.5 221 70 218 65.5 V92 H208 V32 Z
             M218 52 C218 60 223 64.5 230 64.5 C237.5 64.5 243 59.5 243 52 C243 44.5 237.5 40 230 40 C223 40 218 44.5 218 52 Z"
          fill={textColor}
        />
      </svg>
    </div>
  );
};

/**
 * Isolated circular avatar mark matching Image 3.
 */
export const InklopMark: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = '',
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full bg-white shadow-md flex items-center justify-center p-2 select-none ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        width="82%"
        height="82%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mark-crescent-grad" x1="0.1" y1="0.8" x2="0.8" y2="0.1">
            <stop offset="0%" stopColor="#FF5A1F" />
            <stop offset="35%" stopColor="#F51E78" />
            <stop offset="70%" stopColor="#C415D4" />
            <stop offset="100%" stopColor="#7928CA" />
          </linearGradient>
          <linearGradient id="mark-dot-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8A2BE2" />
            <stop offset="100%" stopColor="#C71585" />
          </linearGradient>
        </defs>

        {/* Crescent */}
        <path
          d="M 68 18
             C 52 14, 34 16, 21 26
             C 5 38, -2 58, 2 77
             C 6 93, 19 105, 36 108
             C 54 112, 73 103, 81 87
             C 86 76, 85 64, 83 57
             C 76 67, 63 74, 50 73
             C 34 71, 23 59, 23 44
             C 23 27, 36 15, 52 13
             C 60 12, 68 14, 68 18 Z"
          fill="url(#mark-crescent-grad)"
          transform="scale(0.85) translate(4, -3)"
        />

        {/* Dot */}
        <circle cx="74" cy="38" r="11" fill="url(#mark-dot-grad)" />
      </svg>
    </div>
  );
};
