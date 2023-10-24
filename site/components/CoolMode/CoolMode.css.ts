import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';
import { responsiveStyle } from 'css/responsiveStyle';
import { vars } from 'css/vars.css';

export const cool = style([
  atoms({
    borderRadius: '5',
    display: 'grid',
    gap: { md: '6', xs: '5' },
    padding: { md: '10', xs: '5' },
  }),
  {
    backgroundImage: `linear-gradient(270deg, ${vars.colors.red50}, ${vars.colors.pink60})`,
  },
  responsiveStyle({
    xs: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    md: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  }),
]);
