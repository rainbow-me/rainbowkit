import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';

export const header = style([
  atoms({
    left: '0',
    position: 'sticky',
    top: '0',
    width: 'full',
  }),
  style({
    backdropFilter: 'blur(16px)',
    zIndex: 10,
  }),
]);

export const row = style([
  atoms({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginX: 'auto',
    paddingX: {
      xs: '6',
      // eslint-disable-next-line sort-keys-fix/sort-keys-fix
      md: '10',
    },
    paddingY: {
      xs: '4',
      // eslint-disable-next-line sort-keys-fix/sort-keys-fix
      lg: '7',
    },
  }),
  {
    maxWidth: 1600,
  },
]);

export const logo = style([
  atoms({
    borderRadius: '3',
    height: '10',
    width: '10',
  }),
  style({
    boxShadow:
      '0 4px 10px rgba(3, 35, 98, 0.4), inset 0 0 1px rgba(0, 0, 0, 0.1)',
  }),
]);
