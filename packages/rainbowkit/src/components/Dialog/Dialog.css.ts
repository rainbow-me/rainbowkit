import { keyframes, style } from '@vanilla-extract/css';
import {
  largeScreenMinWidth,
  sprinkles,
  themeVars,
} from '../../css/sprinkles.css';

const {
  modalEntrance: desktopTransition,
  modalEntranceMobile: mobileTransition,
} = themeVars.transitions;

const slideUpDesktop = keyframes({
  '0%': { transform: `translateY(${desktopTransition.slideDistance})` },
  '100%': { transform: 'translateY(0deg)' },
});

const slideUpMobile = keyframes({
  '0%': { transform: `translateY(${mobileTransition.slideDistance})` },
  '100%': { transform: 'translateY(0deg)' },
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
    alignItems: {
      largeScreen: 'center',
      smallScreen: 'flex-end',
    },
    background: 'modalBackdrop',
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
  }),
  {
    bottom: -bleed,
    left: -bleed,
    padding: bleed,
    right: -bleed,
    top: -bleed,
    transform: 'translateZ(0)', // This is required for content to render under the URL bar on iOS
    zIndex: Math.min(...Object.values(nestedModalZIndexes)) - 1,
  },
  {
    '@media': {
      [`screen and (min-width: ${largeScreenMinWidth}px)`]: {
        animation: `${fadeIn} ${desktopTransition.fadeDuration} ease`,
      },
    },
    'animation': `${fadeIn} ${mobileTransition.fadeDuration} ease`,
  },
]);

export const content = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  }),
  {
    maxWidth: '100vw',
  },
  {
    '@media': {
      [`screen and (min-width: ${largeScreenMinWidth}px)`]: {
        animation: `${slideUpDesktop} ${desktopTransition.slideDuration} ${desktopTransition.slideEasing}, ${fadeIn} ${desktopTransition.fadeDuration} ease`,
      },
    },
    'animation': `${slideUpMobile} ${mobileTransition.slideDuration} ${mobileTransition.slideEasing}, ${fadeIn} ${mobileTransition.fadeDuration} ease`,
  },
]);
