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
    md: {
      paddingLeft: vars.space[10],
      paddingRight: vars.space[10],
    },
    sm: {
      paddingLeft: vars.space[6],
      paddingRight: vars.space[6],
    },
    xs: {
      paddingLeft: vars.space[6],
      paddingRight: vars.space[6],
    },
  }),
]);
