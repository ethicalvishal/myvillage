import React from 'react';

const backgrounds = {
  home: (
    <svg width="100%" height="100%" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="1440" height="600" fill="#e0f2fe" />
      <ellipse cx="720" cy="580" rx="900" ry="120" fill="#d9f99d" />
      {/* Hut */}
      <g>
        <rect x="200" y="420" width="80" height="60" fill="#fef9c3" stroke="#b45309" strokeWidth="3" />
        <polygon points="190,420 240,380 290,420" fill="#f59e42" stroke="#b45309" strokeWidth="3" />
      </g>
      {/* Tree */}
      <g>
        <rect x="350" y="400" width="20" height="80" fill="#a3a380" />
        <ellipse cx="360" cy="400" rx="40" ry="30" fill="#4ade80" />
      </g>
      {/* Birds (animated) */}
      <g className="animate-bird">
        <path d="M600 100 Q610 90 620 100" stroke="#555" strokeWidth="2" fill="none" />
        <path d="M630 110 Q640 100 650 110" stroke="#555" strokeWidth="2" fill="none" />
      </g>
      {/* Temple bell (animated) */}
      <g className="animate-bell">
        <ellipse cx="1200" cy="120" rx="18" ry="18" fill="#fde047" stroke="#b45309" strokeWidth="2" />
        <rect x="1195" y="120" width="10" height="20" fill="#fde047" />
      </g>
    </svg>
  ),
  about: (
    <svg width="100%" height="100%" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="1440" height="600" fill="#e0f2fe" />
      <ellipse cx="720" cy="580" rx="900" ry="120" fill="#d9f99d" />
      {/* Village map and pond */}
      <ellipse cx="300" cy="500" rx="60" ry="25" fill="#60a5fa" opacity="0.5" />
      <rect x="200" y="420" width="80" height="60" fill="#fef9c3" stroke="#b45309" strokeWidth="3" />
      <polygon points="190,420 240,380 290,420" fill="#f59e42" stroke="#b45309" strokeWidth="3" />
      <ellipse cx="360" cy="400" rx="40" ry="30" fill="#4ade80" />
      {/* Temple */}
      <rect x="500" y="420" width="40" height="60" fill="#fde047" stroke="#b45309" strokeWidth="2" />
      <polygon points="490,420 520,390 550,420" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
    </svg>
  ),
  people: (
    <svg width="100%" height="100%" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="1440" height="600" fill="#e0f2fe" />
      <ellipse cx="720" cy="580" rx="900" ry="120" fill="#d9f99d" />
      {/* Community group */}
      <circle cx="300" cy="500" r="30" fill="#fbbf24" opacity="0.7" />
      <circle cx="340" cy="500" r="20" fill="#fde047" opacity="0.7" />
      <circle cx="320" cy="530" r="18" fill="#4ade80" opacity="0.7" />
      {/* Rangoli */}
      <ellipse cx="400" cy="570" rx="18" ry="8" fill="#f472b6" opacity="0.5" />
    </svg>
  ),
  // Add more variants for other sections as needed
  default: (
    <svg width="100%" height="100%" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="1440" height="600" fill="#e0f2fe" />
      <ellipse cx="720" cy="580" rx="900" ry="120" fill="#d9f99d" />
    </svg>
  )
};

const RuralSVGBackground = ({ variant = 'default' }) => (
  <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
    {backgrounds[variant] || backgrounds.default}
  </div>
);

export default RuralSVGBackground; 