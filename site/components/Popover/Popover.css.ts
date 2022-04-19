import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';

export const content = style([
  atoms({
    backgroundColor: 'fillElevated',
    borderRadius: '4',
    fontSize: '3',
    padding: '5',
  }),
  style({
    'boxShadow': '0 0 24px rgba(0, 0, 0, .1)',
    'maxWidth': 320,
    'minWidth': 200,
    'wordBreak': 'break-word',
    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    ':focus': { outline: 'none' },
  }),
]);
