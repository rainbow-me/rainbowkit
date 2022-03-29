/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { link } from 'components/Link/Link.css';
import { responsiveStyle } from 'css/responsiveStyle';
import { vars } from 'css/vars.css';

export const modalTriggerWrapper = style([
  {
    position: 'fixed',
    padding: vars.space[6],
    zIndex: 3,
    width: '100%',
    borderBottom: `1px solid ${vars.colors.separator}`,
    backdropFilter: 'blur(8px)',
    backgroundColor: vars.colors.backgroundElevated,
  },
  responsiveStyle({ lg: { display: 'none' } }),
]);

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
      top: 120,
      width: 250,
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

export const pagination = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: vars.space[11],
  paddingTop: vars.space[8],
  borderTop: `1px solid ${vars.colors.separator}`,
});

export const paginationItem = style([
  link,
  {
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.space[3],
  },
]);
