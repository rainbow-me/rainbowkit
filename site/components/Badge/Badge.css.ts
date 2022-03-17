/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { vars } from 'css/vars.css';

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: vars.fontSizes[1],
  lineHeight: 1,
  fontWeight: 600,
  color: vars.colors.labelTertiary,
  backgroundColor: vars.colors.fillSecondary,
  backgroundImage: `linear-gradient(to right, ${vars.colors.fillSecondary}, ${vars.colors.backgroundElevated})`,
  height: 18,
  borderRadius: vars.radii.round,
  paddingLeft: vars.space[3],
  paddingRight: vars.space[3],
});
