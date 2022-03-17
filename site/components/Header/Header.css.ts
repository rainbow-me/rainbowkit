/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { text } from 'css/text.css';
import { vars } from 'css/vars.css';

export const header = style({
  backdropFilter: 'blur(8px)',
  backgroundColor: vars.colors.backgroundElevated,
  borderBottom: `1px solid ${vars.colors.separator}`,
  justifyContent: 'space-between',
  paddingTop: vars.space[7],
  paddingBottom: vars.space[7],
  paddingLeft: vars.space[10],
  paddingRight: vars.space[10],
  position: 'sticky',
  left: 0,
  top: 0,
  zIndex: 10,
  width: '100%',
  alignItems: 'center',
  display: 'flex',
});

export const logo = style({
  borderRadius: vars.radii[3],
  height: 38,
  width: 38,
  boxShadow: '0 12px 16px rgba(0, 0, 0, 0.2)',
});

export const title = style([
  text[4],
  {
    color: vars.colors.label,
    fontWeight: 700,
    marginLeft: vars.space[4],
    marginRight: vars.space[4],
  },
]);
