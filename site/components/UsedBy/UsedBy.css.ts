/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'css/responsiveStyle';
import { vars } from 'css/vars.css';

export const grid = style([
  style({
    display: 'grid',
    gap: vars.space[6],
  }),
  responsiveStyle({
    sm: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    md: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    lg: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  }),
]);
