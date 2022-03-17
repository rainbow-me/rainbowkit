/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { text } from 'css/text.css';
import { vars } from 'css/vars.css';

export const link = style([
  text[4],
  {
    'borderRadius': 12,
    'display': 'block',
    'fontWeight': 600,
    'padding': '8px 15px',
    'textDecoration': 'none',
    'marginBottom': vars.space[3],

    ':hover': {
      background: vars.colors.fill,
    },

    'selectors': {
      '&[data-active=true]': {
        background: vars.colors.blue,
        color: vars.colors.labelWhite,
      },
    },
  },
]);
