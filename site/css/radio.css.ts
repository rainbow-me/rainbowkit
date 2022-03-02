/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';

const SIZE = 32;

export const radio = style({
  backgroundColor: 'rgba(255, 255, 255, 0.32);',
  borderRadius: 16,
  height: SIZE,
  outline: 'none',
  position: 'relative',
  width: SIZE,
  selectors: {
    '&::before': {
      content: "''",
      borderRadius: '999px',
      display: 'block',
      height: `${SIZE + 4}px`,
      margin: '-2px 0 0 -2px',
      pointerEvents: 'none',
      width: `${SIZE + 4}px`,
    },
    '&::after': {
      content: 'attr(data-label)',
      alignItems: 'center',
      color: 'white',
      display: 'flex',
      height: '100%',
      inset: 0,
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
    },
    '&[data-state=checked]::before': {
      boxShadow: '0 0 0 3px white',
    },
  },
});
