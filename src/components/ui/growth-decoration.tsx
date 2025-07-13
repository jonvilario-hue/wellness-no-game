
'use client';

import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

export function GrowthDecoration() {
  const { theme } = useTheme();
  
  // A more elaborate SVG with multiple paths and leaves for a richer visual.
  // The stroke color is now dynamically set by the active theme's accent color.
  const svgContent = `
    <svg width="100%" height="100%" viewBox="0 0 200 150" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <style>
          .vine {
            fill: none;
            stroke: ${theme.colorScheme.accent};
            stroke-width: 1.5;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: draw 12s ease-in-out forwards;
          }
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        </style>
      </defs>
      <path class="vine" d="M1,149 C 20,-20 100,200 120,80 S 180,-30 199,100" />
      <path class="vine" style="animation-delay: 2s;" d="M1,10 C 30,100 80,-50 110,70 S 150,200 199,140" />
      <path class="vine" style="animation-delay: 4s;" d="M199,1 C 180,120 100,-30 80,90 S 20,160 1,50" />
      <g class="vine" style="animation-delay: 6s; stroke-width: 1;">
        <circle cx="120" cy="80" r="3" />
        <path d="M120,80 c -5,5 -10,5 -15,0" />
        <path d="M120,80 c 5,5 10,5 15,0" />
        <circle cx="110" cy="70" r="2.5" />
        <path d="M110,70 c -4,4 -8,4 -12,0" />
        <circle cx="199" cy="100" r="3.5" />
        <path d="M199,100 c 0,-5 5,-10 5,-15" />
        <path d="M199,100 c 0,5 -5,10 -5,15" />
      </g>
    </svg>
  `;

  return (
    <div
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none mix-blend-soft-light"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
