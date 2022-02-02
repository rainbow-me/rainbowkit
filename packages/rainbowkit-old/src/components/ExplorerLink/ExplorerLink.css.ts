import { style } from '@vanilla-extract/css';

export const ExplorerLinkClassName = style({
  '::before': {
    content: '↗ ',
  },
  ':hover': {
    textDecoration: 'underline',
  },
  'textDecoration': 'none',
});
