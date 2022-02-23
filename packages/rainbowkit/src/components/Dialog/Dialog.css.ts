import { keyframes, style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

const slideUp = keyframes({
  '0%': { transform: 'translateY(100%)' },
  '100%': { transform: 'translateY(0deg)' },
});

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
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
    animation: `${fadeIn} 150ms ease`,
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
    animation: `${slideUp} 350ms cubic-bezier(.15,1.15,0.6,1.00), ${fadeIn} 150ms ease`,
    maxWidth: '100vw',
    width: '390px',
  },
]);

export const wideContent = style([
  content,
  {
    width: '712px',
  },
]);
