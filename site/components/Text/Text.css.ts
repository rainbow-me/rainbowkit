/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { atoms } from 'css/atoms';

const variant = {
  titleLarge: style([
    atoms({
      fontSize: '7',
    }),
    style({
      lineHeight: '40px',
      letterSpacing: 0.41,
    }),
  ]),
  title1: style([
    atoms({
      fontSize: '6',
    }),
    style({
      lineHeight: '32px',
      letterSpacing: 0.36,
    }),
  ]),
  title2: style([
    atoms({
      fontSize: '5',
    }),
    style({
      lineHeight: '30px',
      letterSpacing: 0.35,
    }),
  ]),
  title3: style([
    atoms({
      fontSize: '4',
    }),
    style({
      lineHeight: '25px',
      letterSpacing: 0.36,
    }),
  ]),
  headline: style([
    atoms({
      fontSize: '3',
    }),
    style({
      lineHeight: '21px',
      letterSpacing: 0.35,
      fontWeight: '700',
    }),
  ]),
  body: style([
    atoms({
      fontSize: '3',
    }),
    style({
      lineHeight: '21px',
      letterSpacing: 0.35,
    }),
  ]),
  subhead: style([
    atoms({
      fontSize: '2',
    }),
    style({
      lineHeight: '19px',
      letterSpacing: 0.48,
    }),
  ]),
  footnote: style([
    atoms({
      fontSize: '1',
    }),
    style({
      lineHeight: '13px',
      letterSpacing: 0.56,
    }),
  ]),
};

const weight = {
  normal: style({ fontWeight: '400' }),
  medium: style({ fontWeight: '500' }),
  semibold: style({ fontWeight: '600' }),
  bold: style({ fontWeight: '700' }),
  heavy: style({ fontWeight: '800' }),
};

export type Weights = keyof typeof weight;

export const variants = recipe({
  variants: {
    variant,
    weight,
  },
});

export type Variants = RecipeVariants<typeof variants>;
