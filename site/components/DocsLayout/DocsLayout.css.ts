import { style } from '@vanilla-extract/css';
import { breakpoints } from 'css/breakpoints';
import { responsiveStyle } from 'css/responsiveStyle';
import { vars } from 'css/vars.css';

const SIDEBAR_SIZE = 264;

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
      left: `calc(50% - ${breakpoints.lg / 2}px)`,
      paddingRight: 0,
      paddingTop: vars.space[11],
      position: 'fixed',
      top: vars.space[10],
      width: SIDEBAR_SIZE,
    },
  }),
]);

export const navigationSidebarScroller = style([
  {
    height: '100%',
    overflow: 'auto',
    padding: '0 7px',
  },
]);

export const content = style([
  {
    paddingBottom: vars.space[10],
    paddingTop: vars.space[10],
  },
  responsiveStyle({
    lg: {
      paddingLeft: SIDEBAR_SIZE - 14,
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
