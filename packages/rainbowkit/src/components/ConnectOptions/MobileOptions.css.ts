import { style } from '@vanilla-extract/css';

export const walletsContainer = style({
  flexWrap: 'wrap',
  gridGap: '20px 0px',
  maxHeight: 350,
  overflowY: 'auto',
  scrollbarWidth: 'none',
  transform: 'translateZ(0)',
});
