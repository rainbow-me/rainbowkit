/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from 'css/vars.css';

const base = style({
  fontFamily: vars.fonts.mono,
  fontSize: 'max(13px, 85%)',
  fontWeight: '600',
  whiteSpace: 'nowrap',
  padding: '0 3px 2px 3px',
});

export const code = styleVariants({
  primary: [base, { color: vars.colors.purple }],
  secondary: [base, { color: vars.colors.labelSecondary }],
});
