import type {Config} from 'tailwindcss';
const {fontFamily} = require('tailwindcss/defaultTheme');
import plugin from 'tailwindcss/plugin';
import { themes } from './src/data/themes';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        headline: ['var(--font-inter)', ...fontFamily.sans],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function({ addBase }) {
      addBase({
        ':root': {
          '--background': 'hsl(220 20% 95%)',
          '--foreground': 'hsl(220 10% 20%)',
          '--card': 'hsl(220 20% 95%)',
          '--card-foreground': 'hsl(220 10% 20%)',
          '--popover': 'hsl(220 20% 95%)',
          '--popover-foreground': 'hsl(220 10% 20%)',
          '--primary': 'hsl(220 70% 50%)',
          '--primary-foreground': 'hsl(220 20% 98%)',
          '--secondary': 'hsl(220 10% 85%)',
          '--secondary-foreground': 'hsl(220 10% 20%)',
          '--muted': 'hsl(220 10% 90%)',
          '--muted-foreground': 'hsl(220 10% 45%)',
          '--accent': 'hsl(190 70% 50%)',
          '--accent-foreground': 'hsl(220 10% 20%)',
          '--destructive': 'hsl(0 84.2% 60.2%)',
          '--destructive-foreground': 'hsl(0 0% 98%)',
          '--border': 'hsl(220 10% 85%)',
          '--input': 'hsl(220 10% 85%)',
          '--ring': 'hsl(220 70% 50%)',
          '--radius': '0.5rem',
          '--chart-1': 'hsl(220 70% 50%)',
          '--chart-2': 'hsl(190 70% 50%)',
          '--chart-3': 'hsl(160 60% 45%)',
          '--chart-4': 'hsl(30 80% 55%)',
          '--chart-5': 'hsl(280 65% 60%)',
        },
        '.dark': {
          '--background': 'hsl(224 71.4% 4.1%)',
          '--foreground': 'hsl(210 20% 98%)',
          '--card': 'hsl(224 71.4% 4.1%)',
          '--card-foreground': 'hsl(210 20% 98%)',
          '--popover': 'hsl(224 71.4% 4.1%)',
          '--popover-foreground': 'hsl(210 20% 98%)',
          '--primary': 'hsl(48 96% 50%)',
          '--primary-foreground': 'hsl(48 9% 19%)',
          '--secondary': 'hsl(215 27.9% 16.9%)',
          '--secondary-foreground': 'hsl(210 20% 98%)',
          '--muted': 'hsl(215 27.9% 16.9%)',
          '--muted-foreground': 'hsl(217.2 32.6% 74.5%)',
          '--accent': 'hsl(215 27.9% 16.9%)',
          '--accent-foreground': 'hsl(210 20% 98%)',
          '--destructive': 'hsl(0 62.8% 30.6%)',
          '--destructive-foreground': 'hsl(210 20% 98%)',
          '--border': 'hsl(215 27.9% 16.9%)',
          '--input': 'hsl(215 27.9% 16.9%)',
          '--ring': 'hsl(48 96% 50%)',
          '--chart-1': 'hsl(48 96% 50%)',
          '--chart-2': 'hsl(215 27.9% 16.9%)',
          '--chart-3': 'hsl(190 70% 50%)',
          '--chart-4': 'hsl(12 76% 61%)',
          '--chart-5': 'hsl(173 58% 39%)',
        },
      });
    })
  ]
} satisfies Config;
