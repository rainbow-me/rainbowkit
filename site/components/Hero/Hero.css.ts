import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';
import { responsiveStyle } from 'css/responsiveStyle';

export const MODAL_SIZE = {
  width: 2352,
  height: 1704,
};

export const MODAL_COMPACT_SIZE = {
  width: 1068,
  height: 1344,
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
  atoms({ display: { xs: 'none', md: 'none', lg: 'block' } }),
  {
    maxWidth: 800,
  },
]);

export const compactModalWrapper = style([
  responsiveStyle({
    xs: { display: 'none' },
    md: {
      display: 'block',
      maxWidth: 410,
      position: 'relative',
      top: 0,
      marginBottom: 0,
    },
    lg: {
      display: 'block',
      maxWidth: 430,
      position: 'relative',
      top: 100,
      marginLeft: -290,
      marginBottom: 0,
    },
  }),
]);

export const phoneWrapper = style([
  responsiveStyle({
    xs: { maxWidth: PHONE_SIZE.width / 2, marginBottom: -189 },
    md: {
      display: 'block',
      maxWidth: 320,
      position: 'relative',
      bottom: 0,
      marginLeft: -100,
      marginBottom: 0,
    },
    lg: {
      display: 'block',
      maxWidth: 320,
      position: 'relative',
      bottom: 30,
      marginLeft: -150,
      marginBottom: 0,
    },
  }),
]);
