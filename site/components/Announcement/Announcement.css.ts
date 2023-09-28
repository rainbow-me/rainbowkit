import { style } from '@vanilla-extract/css';
import { vars } from 'css/vars.css';

export const announcement = style([
  style({
    backgroundImage: `radial-gradient(circle at 240px -80px, ${vars.colors.backgroundElevated} 0%, ${vars.colors.fillElevated} 100%)`,
    overflow: 'hidden',
  }),
]);
