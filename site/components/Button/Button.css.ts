import { style } from '@vanilla-extract/css';
import { type RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { atoms } from 'css/atoms';
import type { Sprinkles } from 'css/sprinkles.css';
import { vars } from 'css/vars.css';

const size = {
  xs: atoms({
    fontSize: '1',
    height: '7',
    paddingX: '3',
    gap: '1',
  }),
  s: atoms({
    fontSize: '2',
    height: '8',
    paddingX: '4',
    gap: '2',
  }),
  m: atoms({
    fontSize: '2',
    height: '9',
    paddingX: '4',
    gap: '2',
  }),
  l: style([
    atoms({
      fontSize: '3',
      paddingX: '5',
      gap: '2',
    }),
    style({ height: '36px' }),
  ]),
  xl: style([
    atoms({
      fontSize: '3',
      paddingX: '7',
      gap: '3',
    }),
    style({ height: '44px' }),
  ]),
};

export type Size = keyof typeof size;

const outlineValue = `inset 0 0 0 2px ${vars.colors.blue}`;

const variant = {
  contrast: style([
    atoms({
      backgroundColor: 'fillElevated',
      color: 'label',
    }),
  ]),
  gray: style([
    atoms({
      backgroundColor: 'fillSecondary',
      color: 'label',
    }),
  ]),
  blue: style([
    atoms({ color: 'blue' }),
    style({ backgroundColor: 'rgba(14, 118, 253, 0.08)' }),
  ]),
  outline: style([
    atoms({ color: 'label' }),
    style({
      backgroundColor: 'transparent',
      boxShadow: outlineValue,
    }),
  ]),
  ghost: style([
    atoms({ color: 'label' }),
    style({
      backgroundColor: 'transparent',
    }),
  ]),
  purpleGradient: style([
    atoms({ color: 'white100' }),
    style({
      backgroundImage: `linear-gradient(to right, ${vars.colors.blue50}, ${vars.colors.purple50})`,
    }),
  ]),
  blueGradient: style([
    atoms({ color: 'white100' }),
    style({
      backgroundImage: 'linear-gradient(270deg, #1DA1F2, #1D7DF2)',
    }),
  ]),
  pinkGradient: style([
    atoms({ color: 'white100' }),
    style({
      backgroundImage: `linear-gradient(270deg, ${vars.colors.red50}, ${vars.colors.pink60})`,
    }),
  ]),
};

export type Variant = keyof typeof variant;

const shape = {
  base: style([atoms({ borderRadius: 'round' })]),
  circle: style([atoms({ borderRadius: 'round' })]),
  square: {},
};

export type Shape = keyof typeof shape;

const shadowValue =
  '0 10px 30px rgba(27, 29, 31, 0.1), 0 5px 15px rgba(27, 29, 31, 0.04)';

const shadow = {
  true: style({
    boxShadow: shadowValue,
  }),
  false: {},
};

export type Shadow = keyof typeof shadow;

const getShapeSizeCompoundVariant = (
  size: Size,
  shape: Shape,
  width: Sprinkles['size'] | number,
) => ({
  variants: {
    size,
    shape,
  },
  style: [
    atoms({
      width: typeof width === 'string' ? (width as any) : undefined,
      textAlign: 'center',
      justifyContent: 'center',
      borderRadius:
        shape === 'square'
          ? size === 'xs' || size === 's' || size === 'm'
            ? '2'
            : '3'
          : undefined,
    }),
    style({
      ...(typeof width === 'number' ? { width } : {}),
      paddingLeft: '0',
      paddingRight: '0',
    }),
  ],
});

export const variants = recipe({
  base: style([
    atoms({
      alignItems: 'center',
      cursor: 'pointer',
      display: 'inline-flex',
      fontFamily: 'normal',
      transitionProperty: 'transform',
      transitionTimingFunction: 'ease',
      transitionDuration: '100',
      transform: {
        hover: 'grow',
        active: 'shrink',
      },
    }),
    style({
      willChange: 'transform',
      fontWeight: 700,
      lineHeight: 1,
      selectors: {
        '&:focus': {
          outline: 'none',
          boxShadow: `0 0 0 2px ${vars.colors.background}, 0 0 0 4px ${vars.colors.purple}`,
        },
        '&:disabled': {
          backgroundColor: vars.colors.fill,
          color: vars.colors.gray30,
          boxShadow: 'none',
          cursor: 'not-allowed',
        },
      },
    }),
  ]),
  variants: {
    size,
    variant,
    shape,
    shadow,
  },
  compoundVariants: [
    getShapeSizeCompoundVariant('xs', 'circle', '7'),
    getShapeSizeCompoundVariant('s', 'circle', '8'),
    getShapeSizeCompoundVariant('m', 'circle', '9'),
    getShapeSizeCompoundVariant('l', 'circle', 36),
    getShapeSizeCompoundVariant('xl', 'circle', 44),
    getShapeSizeCompoundVariant('xs', 'square', '7'),
    getShapeSizeCompoundVariant('s', 'square', '8'),
    getShapeSizeCompoundVariant('m', 'square', '9'),
    getShapeSizeCompoundVariant('l', 'square', 36),
    getShapeSizeCompoundVariant('xl', 'square', 44),
    {
      variants: {
        variant: 'outline',
        shadow: true,
      },
      style: {
        boxShadow: `${outlineValue}, ${shadowValue}`,
      },
    },
  ],
});

export type Variants = RecipeVariants<typeof variants>;
