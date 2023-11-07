import { style } from '@vanilla-extract/css';
import { atoms } from 'css/atoms';

// biome-ignore format: design system keys
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
    'whiteSpace': 'initial',
    ':focus': { outline: 'none' },
  }),
]);
