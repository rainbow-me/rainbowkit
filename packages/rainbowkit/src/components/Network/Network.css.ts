import { style } from '@vanilla-extract/css';

export const NetworkClassName = style([
  {
    ':hover': {
      transform: 'scale(1.025)',
    },
    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    ':active': {
      transform: 'scale(0.95)',
    },
    'transition': '0.125s ease',
  },
]);
