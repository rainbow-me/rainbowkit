/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from './vars.css';

const base = style({
  // color: vars.colors.label,
});

export const text = styleVariants({
  1: [base, { fontSize: vars.fontSizes[1] }],
  2: [base, { fontSize: vars.fontSizes[2] }],
  3: [base, { fontSize: vars.fontSizes[3] }],
  4: [base, { fontSize: vars.fontSizes[4] }],
  5: [base, { fontSize: vars.fontSizes[5] }],
  6: [base, { fontSize: vars.fontSizes[6] }],
  7: [base, { fontSize: vars.fontSizes[7] }],
});

export const titleLarge = style([
  text[7],
  {
    lineHeight: '40px',
    letterSpacing: 0.41,
  },
]);

export const title1 = style([
  text[6],
  {
    lineHeight: '32px',
    letterSpacing: 0.36,
    marginTop: vars.space[4],
    marginBottom: vars.space[7],
  },
]);

export const title2 = style([
  text[5],
  {
    lineHeight: '30px',
    letterSpacing: 0.35,
    marginTop: vars.space[11],
    marginBottom: vars.space[4],
  },
]);

export const title3 = style([
  text[4],
  {
    lineHeight: '25px',
    letterSpacing: 0.36,
    marginTop: vars.space[4],
    marginBottom: vars.space[7],
  },
]);

export const headline = style([
  text[3],
  {
    lineHeight: '21px',
    letterSpacing: 0.35,
    fontWeight: '700',
    marginBottom: vars.space[7],
  },
]);

export const body = style([
  text[3],
  {
    lineHeight: '21px',
    letterSpacing: 0.35,
    marginTop: vars.space[4],
    marginBottom: vars.space[4],
  },
]);

export const subhead = style([
  text[2],
  {
    lineHeight: '19px',
    letterSpacing: 0.48,
    marginTop: vars.space[7],
    marginBottom: vars.space[7],
  },
]);

export const footnote = style([
  text[1],
  {
    lineHeight: '13px',
    letterSpacing: 0.56,
    marginTop: vars.space[7],
    marginBottom: vars.space[7],
  },
]);
