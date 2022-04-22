import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'css/responsiveStyle';
import { vars } from 'css/vars.css';

const SIDEBAR_SIZE = 250;

export const navigationSidebar = style([
  {
    display: 'none',
    paddingLeft: vars.space[6],
    paddingRight: vars.space[6],
  },
  responsiveStyle({
    lg: {
      bottom: 0,
      display: 'block',
      left: 'calc(50% - 512px)',
      paddingBottom: vars.space[4],
      paddingRight: 0,
      paddingTop: vars.space[11],
      position: 'fixed',
      top: vars.space[10],
      width: SIDEBAR_SIZE,
    },
  }),
]);

export const content = style([
  {
    paddingBottom: vars.space[10],
    paddingTop: vars.space[10],
  },
  responsiveStyle({
    lg: {
      paddingLeft: SIDEBAR_SIZE,
    },
  }),
]);

export const paginationItem = style([
  {
    alignItems: 'center',
    display: 'inline-flex',
    gap: vars.space[3],
  },
]);
