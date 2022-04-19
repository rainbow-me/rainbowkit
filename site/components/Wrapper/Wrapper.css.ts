import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';
import { breakpoints } from 'css/breakpoints';

export const wrapper = style([
  atoms({
    marginX: 'auto',
    paddingX: {
      xs: '6',
      // eslint-disable-next-line sort-keys-fix/sort-keys-fix
      md: '10',
    },
  }),
  style({ maxWidth: breakpoints.lg }),
]);
