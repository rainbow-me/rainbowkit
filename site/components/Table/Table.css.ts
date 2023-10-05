import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';

// biome-ignore format: design system keys
export const regionWrapper = style({
  'overflow': 'auto',
  'position': 'relative',
  ':focus': { outline: 0 },
});

export const table = style({
  borderCollapse: 'collapse',
  textAlign: 'left',
  width: '100%',
});

const cell = style([
  atoms({
    borderBottomWidth: '1',
    paddingRight: '5',
    paddingY: '6',
  }),
]);

export const th = style([
  cell,
  atoms({ fontSize: '3' }),
  style({ fontWeight: '800' }),
]);

export const td = style([cell, style({ whiteSpace: 'nowrap' })]);
