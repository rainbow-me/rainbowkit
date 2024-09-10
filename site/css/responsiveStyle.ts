import type { StyleRule } from '@vanilla-extract/css';
import { type Breakpoint, breakpoints } from './breakpoints';

type CSSProps = Omit<StyleRule, '@media' | '@supports'>;

const makeMediaQuery = (breakpoint: Breakpoint) => (styles?: CSSProps) =>
  !styles || Object.keys(styles).length === 0
    ? {}
    : {
        [`screen and (min-width: ${breakpoints[breakpoint]}px)`]: styles,
      };

const mediaQuery = {
  sm: makeMediaQuery('sm'),
  md: makeMediaQuery('md'),
  lg: makeMediaQuery('lg'),
  xl: makeMediaQuery('xl'),
};

type ResponsiveStyle = {
  xs?: CSSProps;
  sm?: CSSProps;
  md?: CSSProps;
  lg?: CSSProps;
  xl?: CSSProps;
};

export const responsiveStyle = ({
  xs,
  sm,
  md,
  lg,
  xl,
}: ResponsiveStyle): StyleRule => {
  const { '@media': _, ...xsStyle } = (xs ?? {}) as any;
  return {
    ...xsStyle,
    ...(sm || md || lg || xl
      ? {
          '@media': {
            ...mediaQuery.sm(sm ?? {}),
            ...mediaQuery.md(md ?? {}),
            ...mediaQuery.lg(lg ?? {}),
            ...mediaQuery.xl(xl ?? {}),
          },
        }
      : {}),
  };
};
