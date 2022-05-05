/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';
import { responsiveStyle } from 'css/responsiveStyle';

export const MODAL_SIZE = {
  width: 2352,
  height: 1704,
};

export const PHONE_SIZE = {
  width: 780,
  height: 1560,
};

export const heroWrapper = style([
  {
    pointerEvents: 'none',
    userSelect: 'none',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
]);

export const modalWrapper = style([
  atoms({ display: { xs: 'none', md: 'block' } }),
  {
    maxWidth: 800,
  },
]);

export const phoneWrapper = style([
  responsiveStyle({
    xs: { maxWidth: PHONE_SIZE.width / 2, marginBottom: -189 },
    md: { display: 'none' },
    lg: {
      display: 'block',
      maxWidth: 320,
      position: 'relative',
      bottom: 30,
      marginLeft: -100,
      marginBottom: 0,
    },
  }),
]);
