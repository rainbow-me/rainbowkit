/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'css/responsiveStyle';
import { vars } from 'css/vars.css';

export const navigationSidebar = style([
  {
    paddingLeft: vars.space[6],
    paddingRight: vars.space[6],
    display: 'none',
  },
  responsiveStyle({
    lg: {
      display: 'block',
      bottom: 0,
      left: 'calc(50% - 512px)',
      paddingRight: 0,
      position: 'fixed',
      top: 89,
      paddingTop: vars.space[11],
      width: 250,
      overflow: 'auto',
    },
  }),
]);

export const content = style([
  {
    paddingBottom: 80,
    paddingTop: 60,
  },
  responsiveStyle({
    lg: {
      paddingLeft: 250,
    },
  }),
]);

export const paginationItem = style([
  {
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.space[3],
  },
]);
