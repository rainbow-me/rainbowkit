import { style } from '@vanilla-extract/css';

export const walletsContainer = style({
  flexWrap: 'wrap',
  gridGap: '20px 0px',
  maxHeight: 'calc(100vh - 384px)',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  transform: 'translateZ(0)',
});
