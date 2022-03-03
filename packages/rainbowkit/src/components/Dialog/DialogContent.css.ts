import { style } from '@vanilla-extract/css';
import { largeScreenMinWidth, sprinkles } from '../../css/sprinkles.css';

export const dialogContent = style([
  sprinkles({
    background: 'modalBackground',
    borderRadius: 'modal',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  }),
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
