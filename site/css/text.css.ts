import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from './vars.css';

const base = style({
  color: vars.colors.label,
});

export const text = styleVariants({
  1: [base, { fontSize: 36 }],
  2: [base, { fontSize: 32 }],
  3: [base, { fontSize: 28 }],
  4: [base, { fontSize: 18 }],
});

export const h1 = style([text[1], {}]);
export const h2 = style([text[2], { margin: '12px 0 24px' }]);
export const h3 = style([text[3], { margin: '48px 0 24px' }]);
export const p = style([text[4], { lineHeight: 1.5, margin: '24px 0' }]);
