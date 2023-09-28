import { style } from '@vanilla-extract/css';

export const DesktopScrollClassName = style({
  maxHeight: 454,
  overflow: 'auto',
});

export const MobileScrollClassName = style({
  maxHeight: 454,
  overflow: 'auto',
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});
