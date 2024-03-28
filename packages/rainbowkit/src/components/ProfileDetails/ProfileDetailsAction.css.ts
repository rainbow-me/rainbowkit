import { style } from '@vanilla-extract/css';

export const button = style({
  ':disabled': {
    opacity: 0.6,
    pointerEvents: 'none',
  },
});
