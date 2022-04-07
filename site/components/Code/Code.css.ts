/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { atoms } from 'css/atoms';

export const variants = recipe({
  base: [
    atoms({
      fontFamily: 'mono',
      fontSize: '2',
      paddingX: '2',
      paddingBottom: 'px',
    }),
    style({
      fontWeight: '400',
      whiteSpace: 'nowrap',
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
