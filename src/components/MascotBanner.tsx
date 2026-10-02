import React from 'react';

export const MascotBanner: React.FC = () => {
  return (
    <div className="relative w-full overflow-visible flex items-end justify-between px-3 pt-6 pb-2">
      {/* Catchy headline text on the left matching image 1 */}
      <div className="relative z-10 max-w-[210px] sm:max-w-[260px] pb-3">
        <div className="inline-block">
          <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)] leading-tight tracking-tight block">
            ¿Quieres
          </span>
          <span className="text-3xl sm:text-4xl font-black text-[#5814EE] drop-shadow-[0_2px_8px_rgba(88,20,238,0.25)] leading-none block">
            votar?
          </span>
        </div>
        <div className="mt-1.5 inline-flex items-center gap-1.5 bg-[#8A16F5] text-white text-xs sm:text-sm font-black px-3 py-1 rounded-full shadow-md">
          <span>por tu favorito</span>
        </div>
      </div>

      {/* Mascot illustration: Joyful girl with megaphone & sparks matching Image 1 */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 -mr-2 -mb-2 flex-shrink-0 select-none pointer-events-none">
        {/* Floating purple energy sparks */}
        <div className="absolute top-2 left-2 w-3.5 h-1.5 bg-[#A855F7] rounded-full rotate-45 animate-pulse" />
        <div className="absolute top-5 left-0 w-4 h-1.5 bg-[#D946EF] rounded-full -rotate-12" />
        <div className="absolute top-1 right-8 w-4 h-1.5 bg-[#A855F7] rounded-full 45" />
        <div className="absolute -top-1 right-20 w-3 h-1.5 bg-[#EC4899] rounded-full rotate-12" />

        {/* High-quality 3D-styled SVG character matching the girl with megaphone */}
        <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-xl" fill="none">
          <defs>
            <linearGradient id="sweaterGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9D4EDD" />
              <stop offset="100%" stopColor="#7B2CBF" />
            </linearGradient>
            <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="100%" stopColor="#FDBA74" />
            </linearGradient>
            <linearGradient id="hairGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2A1B16" />
              <stop offset="100%" stopColor="#170F0D" />
            </linearGradient>
            <linearGradient id="megaphoneGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="50%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
          </defs>

          {/* Back hair */}
          <path
            d="M 68 35 C 50 35 38 55 40 85 C 41 100 50 115 62 120 C 60 90 62 60 70 45 Z"
            fill="url(#hairGrad)"
          />
          <path
            d="M 100 35 C 120 40 135 60 132 90 C 130 110 118 125 105 130 C 110 95 108 65 98 45 Z"
            fill="url(#hairGrad)"
          />

          {/* Body / Purple Sweater */}
          <path
            d="M 52 160 C 50 120 70 108 85 108 C 100 108 120 120 125 160 Z"
            fill="url(#sweaterGrad)"
          />

          {/* Neck */}
          <rect x="80" y="88" width="16" height="22" rx="6" fill="url(#skinGrad)" />

          {/* Sweater Collar */}
          <path
            d="M 75 105 C 83 112 93 112 101 105 C 105 112 71 112 75 105 Z"
            fill="#5A189A"
          />

          {/* Head */}
          <ellipse cx="88" cy="65" rx="28" ry="30" fill="url(#skinGrad)" />

          {/* Ears */}
          <ellipse cx="61" cy="67" rx="5" ry="8" fill="url(#skinGrad)" />
          <ellipse cx="115" cy="67" rx="5" ry="8" fill="url(#skinGrad)" />

          {/* Hair Front / Bangs */}
          <path
            d="M 60 62 C 60 35 75 25 90 25 C 110 25 118 38 116 62 C 108 45 98 42 88 42 C 78 42 68 48 60 62 Z"
            fill="url(#hairGrad)"
          />
          <path
            d="M 62 55 C 72 45 82 48 88 52 C 82 48 70 48 62 55 Z"
            fill="#3F261E"
          />

          {/* Eyebrows */}
          <path d="M 68 56 C 73 53 79 54 81 57" stroke="#1F1512" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 94 57 C 98 54 103 54 108 57" stroke="#1F1512" strokeWidth="2.5" strokeLinecap="round" />

          {/* Happy closed eyes (crescent arcs) */}
          <path d="M 70 65 C 74 61 79 61 82 66" stroke="#170F0D" strokeWidth="3" strokeLinecap="round" />
          <path d="M 94 66 C 98 61 103 61 107 66" stroke="#170F0D" strokeWidth="3" strokeLinecap="round" />

          {/* Blushing cheeks */}
          <circle cx="69" cy="74" r="6" fill="#F43F5E" opacity="0.35" />
          <circle cx="106" cy="74" r="6" fill="#F43F5E" opacity="0.35" />

          {/* Nose */}
          <path d="M 87 69 C 89 71 89 72 87 73" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />

          {/* Big happy open smile */}
          <path
            d="M 80 77 C 82 87 94 87 97 77 Z"
            fill="#7F1D1D"
          />
          {/* Teeth */}
          <path
            d="M 82 78 C 84 81 92 81 95 78 Z"
            fill="#FFFFFF"
          />
          {/* Tongue */}
          <path
            d="M 84 83 C 86 86 91 86 93 83 Z"
            fill="#FB7185"
          />

          {/* Arm holding megaphone */}
          <path
            d="M 65 125 C 60 115 55 98 62 88 C 65 83 72 80 78 84 C 74 96 72 108 72 125 Z"
            fill="url(#sweaterGrad)"
          />
          {/* Hand */}
          <ellipse cx="68" cy="85" rx="8" ry="7" fill="url(#skinGrad)" />

          {/* Megaphone Cone */}
          {/* Handle */}
          <rect x="66" y="86" width="6" height="15" rx="3" fill="#D1D5DB" />
          {/* Body */}
          <path
            d="M 64 80 L 40 68 L 38 98 L 64 88 Z"
            fill="#FFFFFF"
          />
          {/* Pink Cone Rim */}
          <ellipse cx="38" cy="83" rx="6" ry="16" fill="url(#megaphoneGrad)" />
          {/* Megaphone back piece */}
          <ellipse cx="64" cy="84" rx="4" ry="5" fill="url(#megaphoneGrad)" />
          {/* Megaphone speaker ring */}
          <ellipse cx="38" cy="83" rx="2" ry="7" fill="#881337" />

          {/* Sound waves from megaphone */}
          <path
            d="M 27 75 C 23 80 23 86 27 91"
            stroke="#C084FC"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 18 69 C 12 78 12 88 18 97"
            stroke="#D946EF"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
