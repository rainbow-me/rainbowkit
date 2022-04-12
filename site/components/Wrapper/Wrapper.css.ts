import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';
import { responsiveStyle } from 'css/responsiveStyle';
import { vars } from 'css/vars.css';

export const wrapper = style([
  atoms({
    marginX: 'auto',
    paddingX: '5',
  }),
  style({
    maxWidth: 1024,
  }),
  responsiveStyle({
    lg: {
      paddingLeft: vars.space[11],
      paddingRight: vars.space[11],
    },
  }),
]);
