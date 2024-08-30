import { style } from '@vanilla-extract/css';
import { type RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { atoms } from 'css/atoms';
import { vars } from 'css/vars.css';

export const variants = recipe({
  base: [
    atoms({
      backgroundColor: 'fillElevated',
      borderRadius: '1',
      fontFamily: 'mono',
      fontSize: '2',
      paddingBottom: 'px',
      paddingX: '2',
      whiteSpace: 'nowrap',
    }),
    style({
      boxShadow: `inset 0 0 1px ${vars.colors.separator}, 0px 2px 8px rgba(27, 29, 31, 0.02)`,
      fontWeight: '400',
      MozOsxFontSmoothing: 'subpixel-antialiased',
      WebkitFontSmoothing: 'subpixel-antialiased',
    }),
  ],
  variants: {
    variant: {
      primary: [atoms({ color: 'purple' })],
      secondary: [atoms({ color: 'labelSecondary' })],
    },
  },
});

export type Variants = RecipeVariants<typeof variants>;
