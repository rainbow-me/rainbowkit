import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { atoms } from 'css/atoms';

export const variants = recipe({
  variants: {
    variant: {
      blue: atoms({ color: 'blue' }),
    },
  },
});

export type Variants = RecipeVariants<typeof variants>;
