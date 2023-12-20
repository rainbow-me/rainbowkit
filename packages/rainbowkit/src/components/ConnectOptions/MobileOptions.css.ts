import { keyframes, style } from '@vanilla-extract/css';

export const scroll = style({
  overflow: 'auto',
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  transform: 'translateZ(0)',
});

const snakeBorder = keyframes({
  '0%': {
    strokeDashoffset: '0',
  },
  '100%': {
    strokeDashoffset: '-283', // Adjusted based on new perimeter calculation
  },
});

export const rotatingBorder = style({
  animation: `${snakeBorder} 1s linear infinite`,
  strokeDasharray: '98 196', // Adjusted based on new perimeter calculation
  fill: 'none',
  strokeLinecap: 'round',
  strokeWidth: '4', // Reduced stroke width for better appearance on a smaller spinner
});

export const spinner = style({
  position: 'absolute',
});
