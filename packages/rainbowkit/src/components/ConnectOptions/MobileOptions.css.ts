import { style } from '@vanilla-extract/css';

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
