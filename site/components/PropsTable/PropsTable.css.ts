/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { text } from 'css/text.css';
import { vars } from 'css/vars.css';

export const regionWrapper = style({
  'position': 'relative',
  'overflow': 'auto',
  ':focus': {
    outline: 0,
  },
});

export const table = style({
  width: '100%',
  textAlign: 'left',
  borderCollapse: 'collapse',
});

const cell = style({
  borderBottom: `1px solid ${vars.colors.separator}`,
  paddingTop: vars.space[6],
  paddingRight: vars.space[5],
  paddingBottom: vars.space[6],
  paddingLeft: vars.space[5],
});

export const th = style([cell, text[3]]);
export const td = style([cell, text[2], { whiteSpace: 'nowrap' }]);
