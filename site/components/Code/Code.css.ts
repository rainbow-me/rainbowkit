/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { atoms } from 'css/atoms';

export const variants = recipe({
  base: [
    atoms({
      fontFamily: 'mono',
    }),
    style({
      fontSize: 'max(13px, 85%)',
      fontWeight: '400',
      whiteSpace: 'nowrap',
      padding: '0 3px 2px 3px',
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
