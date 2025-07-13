
'use client';

import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

export function GrowthDecoration() {
  const { theme } = useTheme();
  
  // This is a simple placeholder SVG. In a real app, you might have more complex,
  // dynamic SVGs based on performance or domain.
  const svgContent = `
    <svg width="100%" height="100%" viewBox="0 0 200 150" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
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
            animation: draw 8s ease-in-out forwards;
          }
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        </style>
      </defs>
      <path class="vine" d="M1,149 C 20,-20 100,200 120,80 S 180,-30 199,100" />
      <path class="vine" style="animation-delay: 1s;" d="M1,10 C 30,100 80,-50 110,70 S 150,200 199,140" />
    </svg>
  `;

  return (
    <div
      className="absolute inset-0 w-full h-full opacity-30 pointer-events-none mix-blend-soft-light"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
