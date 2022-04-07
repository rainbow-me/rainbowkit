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
    // display: 'inline-flex',
    alignItems: 'center',
    // fontSize: vars.fontSizes[1],
    lineHeight: 1,
    fontWeight: 600,
    color: vars.colors.labelTertiary,
    backgroundColor: vars.colors.fillSecondary,
    backgroundImage: `linear-gradient(to right, ${vars.colors.backgroundElevated}, ${vars.colors.background})`,
    height: 18,
    borderRadius: vars.radii.round,
    paddingLeft: vars.space[3],
    paddingRight: vars.space[3],
  }),
]);
