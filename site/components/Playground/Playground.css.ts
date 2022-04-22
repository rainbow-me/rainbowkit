/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { vars } from 'css/vars.css';

export const RADIO_SIZE = 40;

export const radio = style({
  appearance: 'none',
  border: 'none',
  backgroundColor: 'rgba(255, 255, 255, 0.32)',
  borderRadius: 40 / 2,
  height: RADIO_SIZE,
  outline: 'none',
  position: 'relative',
  width: RADIO_SIZE,
  transition: 'transform 100ms',
  boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, .12)',
  selectors: {
    '&:hover:not(:focus)': {
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
      fontFamily: vars.fonts.normal,
    },
  },
});

const RING_THICKNESS = 4;

export const ring = style({
  position: 'absolute',
  top: -RING_THICKNESS / 2,
  left: -RING_THICKNESS / 2,
  borderRadius: vars.radii.round,
  boxShadow: `0 0 0 ${RING_THICKNESS}px ${vars.colors.white100}`,
  height: `${RADIO_SIZE + RING_THICKNESS}px`,

  pointerEvents: 'none',
  width: `${RADIO_SIZE + RING_THICKNESS}px`,
  zIndex: 1,
});
