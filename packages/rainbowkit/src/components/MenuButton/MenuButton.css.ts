import { style } from '@vanilla-extract/css';

export const unsetBackgroundOnHover = style([
  {
    selectors: {
      '&:hover': {
        background: 'unset',
      },
    },
  },
]);
