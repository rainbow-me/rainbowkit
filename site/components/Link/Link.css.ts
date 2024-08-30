import { style } from '@vanilla-extract/css';
import { type RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { atoms } from 'css/atoms';

export const variants = recipe({
  base: style({
    outline: 'none',
  }),
  variants: {
    variant: {
      blue: atoms({ color: { base: 'blue', focus: 'label' } }),
      gray: atoms({
        color: {
          base: 'labelSecondary',
          focus: 'label',
          hover: 'purple',
        },
      }),
    },
  },
});

export type Variants = RecipeVariants<typeof variants>;
