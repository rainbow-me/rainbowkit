/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { vars } from 'css/vars.css';

export const RADIO_SIZE = 32;

export const radio = style({
  appearance: 'none',
  border: 'none',
  backgroundColor: 'rgba(255, 255, 255, 0.32)',
  borderRadius: 16,
  height: RADIO_SIZE,
  outline: 'none',
  position: 'relative',
  width: RADIO_SIZE,
  selectors: {
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
    },
  },
});

export const ring = style({
  position: 'absolute',
  top: -2,
  left: -2,
  borderRadius: vars.radii.round,
  boxShadow: `0 0 0 2px ${vars.colors.white100}`,
  height: `${RADIO_SIZE + 4}px`,

  pointerEvents: 'none',
  width: `${RADIO_SIZE + 4}px`,
  zIndex: 1,
});
