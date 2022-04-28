import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';
import { breakpoints } from 'css/breakpoints';

export const wrapper = style([
  atoms({
    marginX: 'auto',
    paddingX: '10',
  }),
  style({ maxWidth: breakpoints.lg }),
]);
