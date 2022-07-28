/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'css/responsiveStyle';
import { vars } from 'css/vars.css';

export const grid = style([
  style({
    display: 'grid',
    gap: vars.space[9],
    gridTemplateColumns: 'repeat(3, 1fr)',
  }),
  responsiveStyle({
    md: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    lg: {
      gap: vars.space[8],
      gridTemplateColumns: 'repeat(6, 1fr)',
    },
  }),
]);
