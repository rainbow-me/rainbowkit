import { style } from '@vanilla-extract/css';
import { largeScreenMinWidth, sprinkles } from '../../css/sprinkles.css';

export const dialogContent = style([
  sprinkles({
    background: 'modalBackground',
    borderColor: 'modalBorder',
    borderRadius: 'modal',
    borderStyle: 'solid',
    borderWidth: 'modalBorderWidth',
    boxShadow: 'dialog',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  }),
  {
    '@media': {
      [`screen and (min-width: ${largeScreenMinWidth}px)`]: {
        width: '360px',
      },
    },
    'boxSizing': 'content-box',
    'maxWidth': '100vw',
    'width': '100vw',
  },
]);

export const dialogContentWideMobile = style([
  dialogContent,
  {
    '@media': {
      [`screen and (min-width: ${largeScreenMinWidth}px)`]: {
        width: '480px',
      },
    },
  },
]);

export const dialogContentWideDesktop = style([
  dialogContent,
  {
    '@media': {
      [`screen and (min-width: ${largeScreenMinWidth}px)`]: {
        width: '720px',
      },
    },
  },
]);

const bleed = 200;
export const bottomSheetOverrides = style({
  '@media': {
    [`screen and (max-width: ${largeScreenMinWidth - 1}px)`]: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      marginTop: -bleed,
      paddingBottom: bleed,
      top: bleed,
    },
  },
});
