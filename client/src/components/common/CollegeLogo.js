import React from 'react';

const CollegeLogo = ({ className }) => {
  // Creating an inline SVG representation of the St. Joseph's College logo
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 800 800"
      className={className || "h-12 w-12"}
    >
      {/* Main circle with red border */}
      <circle cx="400" cy="400" r="385" fill="#fffaa0" stroke="#ed1c24" strokeWidth="30"/>
      
      {/* Text around the circle */}
      <path id="upperText" d="M400,150 A250,250 0 0,1 650,400" fill="none" />
      <path id="lowerText" d="M400,650 A250,250 0 0,0 650,400" fill="none" />
      
      <text fontSize="36" fill="#ed1c24" fontWeight="bold">
        <textPath href="#upperText" textAnchor="middle" startOffset="50%">
          St. JOSEPH'S COLLEGE OF ENGINEERING
        </textPath>
      </text>
      
      <text fontSize="36" fill="#ed1c24" fontWeight="bold">
        <textPath href="#lowerText" textAnchor="middle" startOffset="50%">
          CHENNAI - 600 119
        </textPath>
      </text>
      
      {/* Shield/Crest in the middle */}
      <path d="M250,300 L550,300 L550,600 Q400,650 250,600 Z" fill="#fffaa0" stroke="#000" strokeWidth="3"/>
      <line x1="400" y1="300" x2="400" y2="600" stroke="#000" strokeWidth="3"/>
      <line x1="250" y1="450" x2="550" y2="450" stroke="#000" strokeWidth="3"/>
      
      {/* Purple bar at top of shield */}
      <path d="M250,300 L550,300 Q550,280 570,280 L590,280 Q610,280 610,300 L610,300 Q610,320 590,320 L570,320 Q550,320 550,300" fill="#a64d79" stroke="#000" strokeWidth="2"/>
      <path d="M550,300 L250,300 Q250,280 230,280 L210,280 Q190,280 190,300 L190,300 Q190,320 210,320 L230,320 Q250,320 250,300" fill="#a64d79" stroke="#000" strokeWidth="2"/>
      
      {/* Computer icon */}
      <rect x="275" y="340" width="100" height="70" stroke="#000" fill="none" strokeWidth="2"/>
      <rect x="295" y="350" width="60" height="40" stroke="#000" fill="none" strokeWidth="2"/>
      <path d="M275,410 L375,410 L385,430 L265,430 Z" stroke="#000" fill="none" strokeWidth="2"/>

      {/* Satellite/Communication icon */}
      <circle cx="475" cy="370" r="30" stroke="#000" fill="none" strokeWidth="2"/>
      <line x1="458" y1="353" x2="493" y2="388" stroke="#000" strokeWidth="2"/>
      <line x1="493" y1="353" x2="458" y2="388" stroke="#000" strokeWidth="2"/>
      
      {/* Gears icon */}
      <circle cx="325" cy="500" r="30" stroke="#000" fill="none" strokeWidth="2"/>
      <circle cx="325" cy="500" r="15" stroke="#000" fill="none" strokeWidth="2"/>
      
      {/* Electronics/Circuitry icon */}
      <path d="M475,480 Q530,480 530,510 Q530,540 475,540" stroke="#000" fill="none" strokeWidth="2"/>
      
      {/* Chemistry/Lab icon */}
      <path d="M310,570 L340,570 L330,600 L320,600 Z" stroke="#000" fill="none" strokeWidth="2"/>
      <path d="M310,560 L310,570 M340,560 L340,570" stroke="#000" strokeWidth="2"/>
      <path d="M350,570 L370,570 L370,600" stroke="#000" fill="none" strokeWidth="2"/>
      
      {/* Electrical/Power grid icon */}
      <path d="M470,560 L490,580 L510,560 L530,580" stroke="#000" fill="none" strokeWidth="2"/>
      <path d="M480,580 L480,600 L500,580 L500,600 L520,580 L520,600" stroke="#000" fill="none" strokeWidth="2"/>
      
      {/* Laurel wreath at bottom */}
      <path d="M320,700 Q250,650 300,600 M480,700 Q550,650 500,600" stroke="#ed1c24" fill="none" strokeWidth="3"/>
      <ellipse cx="400" cy="700" rx="10" ry="5" stroke="#ed1c24" fill="none" strokeWidth="3"/>
    </svg>
  );
};

export default CollegeLogo;
