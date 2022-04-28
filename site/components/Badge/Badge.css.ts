import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';
import { vars } from 'css/vars.css';

export const badge = style([
  atoms({
    alignItems: 'center',
    borderRadius: 'round',
    color: 'labelTertiary',
    display: 'inline-flex',
    fontSize: '1',
    paddingX: '3',
  }),
  style({
    backgroundImage: `radial-gradient(circle at 8px 4px, ${vars.colors.backgroundElevated} 0%, ${vars.colors.fillElevated} 100%)`,
    fontWeight: 600,
    height: 22,
    lineHeight: 1,
  }),
]);
