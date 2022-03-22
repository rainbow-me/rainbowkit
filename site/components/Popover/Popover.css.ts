/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { text } from 'css/text.css';
import { vars } from 'css/vars.css';

export const content = style([
  text[3],
  {
    'minWidth': 200,
    'maxWidth': 320,
    'backgroundColor': vars.colors.fillElevated,
    'padding': vars.space[5],
    'borderRadius': vars.radii[4],
    'boxShadow': '0 0 24px rgba(0, 0, 0, .1)',
    'wordBreak': 'break-word',
    ':focus': {
      outline: 'none',
    },
  },
]);
