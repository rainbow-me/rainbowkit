/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { text } from 'css/text.css';
import { vars } from 'css/vars.css';

export const link = style([
  text[3],
  {
    'borderRadius': vars.radii[3],
    'display': 'block',
    'fontWeight': 600,
    'paddingTop': vars.space[3],
    'paddingRight': vars.space[5],
    'paddingBottom': vars.space[3],
    'paddingLeft': vars.space[5],
    'textDecoration': 'none',
    'marginBottom': vars.space[2],
    'color': vars.colors.label,

    ':hover': {
      background: vars.colors.fillSecondary,
    },

    'selectors': {
      '&[data-active=true]': {
        background: vars.colors.blue,
        color: vars.colors.labelWhite,
      },
    },
  },
]);
