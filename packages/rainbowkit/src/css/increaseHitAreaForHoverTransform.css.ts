import { style, styleVariants } from '@vanilla-extract/css';
import { growTransforms } from './sprinkles.css';

const activePseudo = '&:active::after';

const base = style({
  position: 'relative',
  selectors: {
    [activePseudo]: {
      bottom: 0,
      content: '""',
      display: 'block',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
  },
});

export const increaseHitAreaForHoverTransform = styleVariants(
  growTransforms,
  transform => [base, { selectors: { [activePseudo]: { transform } } }]
);
