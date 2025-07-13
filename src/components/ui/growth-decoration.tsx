
'use client';

import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

export function GrowthDecoration() {
  const { theme } = useTheme();
  
  // A more elaborate SVG with multiple paths and leaves for a richer visual.
  // The stroke color is now dynamically set by the active theme's accent color.
  const svgContent = `
    <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .vine {
            fill: none;
            stroke: ${theme.colorScheme.accent};
            stroke-width: 1.2;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 1500;
            stroke-dashoffset: 1500;
            animation: draw 15s ease-in-out forwards infinite;
          }
           .leaf {
            fill: ${theme.colorScheme.accent};
            stroke: ${theme.colorScheme.accent};
            stroke-width: 0.5;
            opacity: 0;
            animation: fadeIn 8s ease-in forwards infinite;
            animation-delay: 5s;
           }
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes fadeIn {
              to {
                  opacity: 1;
              }
          }
        </style>
      </defs>
      
      <!-- Bottom-left growth -->
      <path class="vine" d="M1,299 C 40,200 80,300 120,150 S 180,0 250,100" style="animation-delay: 0s;"/>
      <g class="leaf" style="animation-delay: 7s;">
        <circle cx="120" cy="150" r="3" />
        <circle cx="115" cy="155" r="2.5" />
      </g>

      <!-- Top-right growth -->
      <path class="vine" d="M399,1 C 350,100 300,50 250,180 S 150,320 100,250" style="animation-delay: 2s;"/>
       <g class="leaf" style="animation-delay: 9s;">
        <circle cx="250" cy="180" r="3.5" />
        <circle cx="258" cy="178" r="2" />
      </g>
      
      <!-- Top-left to bottom-right -->
      <path class="vine" d="M1,1 C 100,100 50,250 200,200 S 350,50 399,299" style="animation-delay: 4s;"/>
       <g class="leaf" style="animation-delay: 11s;">
        <circle cx="200" cy="200" r="4" />
        <circle cx="205" cy="195" r="3" />
      </g>
    </svg>
  `;

  return (
    <div
      className="absolute inset-0 w-full h-full opacity-30 pointer-events-none mix-blend-soft-light"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
