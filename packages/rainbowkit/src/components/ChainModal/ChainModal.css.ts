import { style } from '@vanilla-extract/css';

export const DesktopScrollClassName = style({
  maxHeight: 456,
  overflowY: 'auto',
  overflowX: 'hidden',
});

export const MobileScrollClassName = style({
  maxHeight: 456,
  overflowY: 'auto',
  overflowX: 'hidden',
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});
