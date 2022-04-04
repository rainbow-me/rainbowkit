/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';
import { responsiveStyle } from 'css/responsiveStyle';
import { vars } from 'css/vars.css';

export const header = style({
  backdropFilter: 'blur(8px)',
  backgroundColor: vars.colors.backgroundElevated,
  position: 'sticky',
  left: 0,
  top: 0,
  zIndex: 10,
  width: '100%',
});

export const row = style([
  atoms({
    borderBottomWidth: '1',
    paddingY: '7',
    paddingX: '10',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
]);

export const docsMobileMenuRow = style([
  row,
  responsiveStyle({ lg: { display: 'none' } }),
]);

export const logo = style([
  atoms({
    borderRadius: '3',
  }),
  style({
    height: 38,
    width: 38,
    boxShadow: '0 12px 16px rgba(0, 0, 0, 0.2)',
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
