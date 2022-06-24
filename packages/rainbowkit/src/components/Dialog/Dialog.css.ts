import { keyframes, style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

const slideUp = keyframes({
  '0%': { transform: 'translateY(100%)' },
  '100%': { transform: 'translateY(0)' },
});

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const nestedModalZIndexes: Record<string, number> = {
  coinbase: 2147483647,
  walletConnect: 99999999999999,
};

const bleed = 200;
export const overlay = style([
  sprinkles({
    backdropFilter: 'modalOverlay',
    background: 'modalBackdrop',
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
  }),
  {
    animation: `${fadeIn} 150ms ease`,
    bottom: -bleed,
    left: -bleed,
    padding: bleed,
    right: -bleed,
    top: -bleed,
    transform: 'translateZ(0)', // This is required for content to render under the URL bar on iOS
    zIndex: Math.min(...Object.values(nestedModalZIndexes)) - 1,
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
  },
]);
