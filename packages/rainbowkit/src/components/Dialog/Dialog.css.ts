import { keyframes, style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

const slideUp = keyframes({
  '0%': { transform: 'translateY(100%)' },
  '100%': { transform: 'translateY(0deg)' },
});

export const overlay = style([
  sprinkles({
    alignItems: 'center',
    background: 'modalBackdrop',
    display: 'flex',
    height: 'viewHeight',
    justifyContent: 'center',
    position: 'fixed',
    width: 'full',
  }),
  {
    left: 0,
    top: 0,
  },
]);

export const content = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  }),
  {
    animation: `${slideUp} 500ms cubic-bezier(0.16, 1, 0.3, 1)`,
    width: '390px',
  },
]);
