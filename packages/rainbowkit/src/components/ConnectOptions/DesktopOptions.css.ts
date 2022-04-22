import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const QRCodeBackgroundClassName = style([
  {
    background: 'white',
  },
]);

export const ScrollClassName = style([
  sprinkles({
    paddingX: '18',
  }),
  {
    maxHeight: 464,
    overflowY: 'auto',
  },
]);
