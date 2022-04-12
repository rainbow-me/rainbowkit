/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';
import { vars } from 'css/vars.css';

export const badge = style([
  atoms({
    display: 'inline-flex',
    fontSize: '1',
    color: 'labelTertiary',
  }),
  style({
    alignItems: 'center',
    lineHeight: 1,
    fontWeight: 600,
    color: vars.colors.labelTertiary,
    backgroundImage: `radial-gradient(circle at 8px 4px, ${vars.colors.backgroundElevated} 0%, ${vars.colors.fillElevated} 100%)`,
    height: 18,
    borderRadius: vars.radii.round,
    paddingLeft: vars.space[3],
    paddingRight: vars.space[3],
  }),
]);
