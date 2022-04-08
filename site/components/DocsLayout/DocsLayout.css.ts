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
      top: vars.space[11],
      paddingTop: vars.space[11],
      paddingBottom: vars.space[4],
      width: 250,
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
