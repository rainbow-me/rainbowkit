import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'css/responsiveStyle';
import { vars } from 'css/vars.css';

export const RADIO_SIZE = 33;
export const RADIO_SIZE_LG = 39;

export const radio = style([
  style({
    appearance: 'none',
    border: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.32)',
    borderRadius: '100%',
    height: RADIO_SIZE,
    outline: 'none',
    position: 'relative',
    width: RADIO_SIZE,
    transition: 'transform 100ms',
    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, .12)',
    selectors: {
      '&:hover:not(:focus):not([data-state="checked"])': {
        transform: 'scale(1.2)',
      },
      '&::after': {
        content: 'attr(data-label)',
        alignItems: 'center',
        color: 'white',
        display: 'flex',
        height: '100%',
        inset: 0,
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        fontWeight: '700',
        fontSize: 15,
        fontFamily: vars.fonts.normal,
      },
    },
  }),
  responsiveStyle({
    md: {
      height: RADIO_SIZE_LG,
      width: RADIO_SIZE_LG,
    },
  }),
]);

const RING_THICKNESS = 4;

export const ring = style([
  style({
    position: 'absolute',
    top: -RING_THICKNESS / 2,
    left: -RING_THICKNESS / 2,
    borderRadius: vars.radii.round,
    boxShadow: `0 0 0 ${RING_THICKNESS}px ${vars.colors.white100}`,
    height: `${RADIO_SIZE + RING_THICKNESS}px`,
    pointerEvents: 'none',
    width: `${RADIO_SIZE + RING_THICKNESS}px`,
    zIndex: 1,
  }),
  responsiveStyle({
    md: {
      height: `${RADIO_SIZE_LG + RING_THICKNESS}px`,
      width: `${RADIO_SIZE_LG + RING_THICKNESS}px`,
    },
  }),
]);
