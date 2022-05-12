import { style } from '@vanilla-extract/css';

export const unsetBackgroundOnHover = style({
  ':hover': {
    background: 'unset',
  },
});
