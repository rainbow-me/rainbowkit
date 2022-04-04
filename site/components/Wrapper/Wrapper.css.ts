import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';

export const wrapper = style([
  atoms({
    marginX: 'auto',
  }),
  style({
    maxWidth: 1024,
  }),
]);
