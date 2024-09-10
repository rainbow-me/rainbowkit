import { style } from '@vanilla-extract/css';
import { type RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { atoms } from 'css/atoms';

const variant = {
  body: style([
    atoms({
      fontSize: '3',
    }),
    style({
      letterSpacing: 0.35,
      lineHeight: '21px',
    }),
  ]),
  footnote: style([
    atoms({
      fontSize: '1',
    }),
    style({
      letterSpacing: 0.56,
      lineHeight: '13px',
    }),
  ]),
  headline: style([
    atoms({
      fontSize: '3',
    }),
    style({
      fontWeight: '700',
      letterSpacing: 0.35,
      lineHeight: '21px',
    }),
  ]),
  subhead: style([
    atoms({
      fontSize: '2',
    }),
    style({
      letterSpacing: 0.48,
      lineHeight: '19px',
    }),
  ]),
  title1: style([
    atoms({
      fontSize: '6',
    }),
    style({
      letterSpacing: 0.36,
      lineHeight: '32px',
    }),
  ]),
  title2: style([
    atoms({
      fontSize: '5',
    }),
    style({
      letterSpacing: 0.35,
      lineHeight: '30px',
    }),
  ]),
  title3: style([
    atoms({
      fontSize: '4',
    }),
    style({
      letterSpacing: 0.36,
      lineHeight: '25px',
    }),
  ]),
  titleLarge: style([
    atoms({
      fontSize: '7',
    }),
    style({
      letterSpacing: 0.41,
      lineHeight: '40px',
    }),
  ]),
};

const weight = {
  bold: style({ fontWeight: '700' }),
  heavy: style({ fontWeight: '800' }),
  medium: style({ fontWeight: '500' }),
  normal: style({ fontWeight: '400' }),
  semibold: style({ fontWeight: '600' }),
};

export type Weights = keyof typeof weight;

export const variants = recipe({
  variants: {
    variant,
    weight,
  },
});

export type Variants = RecipeVariants<typeof variants>;
