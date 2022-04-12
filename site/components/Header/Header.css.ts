/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';
import { responsiveStyle } from 'css/responsiveStyle';
import { vars } from 'css/vars.css';

export const header = [
  atoms({
    position: 'sticky',
    top: '0',
    left: '0',
    width: 'full',
  }),
  style({
    backdropFilter: 'blur(16px)',
    zIndex: 10,
  }),
];

export const row = style([
  atoms({
    paddingY: '4',
    paddingX: '10',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  responsiveStyle({
    md: {
      paddingLeft: vars.space[10],
      paddingRight: vars.space[10],
    },
    sm: {
      paddingLeft: vars.space[6],
      paddingRight: vars.space[6],
    },
    xs: {
      paddingLeft: vars.space[6],
      paddingRight: vars.space[6],
    },
  }),
]);

export const logo = style([
  atoms({
    borderRadius: '3',
  }),
  style({
    height: 38,
    width: 38,
    boxShadow:
      '0 4px 10px rgba(3, 35, 98, 0.4), inset 0 0 1px rgba(0, 0, 0, 0.1)',
  }),
]);

export const title = style([
  atoms({
    fontSize: '4',
    color: 'label',
    marginX: '4',
  }),
  style({
    fontWeight: 700,
  }),
]);
