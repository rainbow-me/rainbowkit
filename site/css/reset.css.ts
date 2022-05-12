import { style } from '@vanilla-extract/css';
import { vars } from './vars.css';

export const base = style({
  border: 0,
  borderColor: vars.colors.separator,
  borderStyle: 'solid',
  borderWidth: 0,
  boxSizing: 'border-box',
  fontSize: '100%',
  margin: 0,
  padding: 0,
  verticalAlign: 'baseline',
  WebkitFontSmoothing: 'antialiased',
  WebkitTapHighlightColor: 'transparent',
});

const list = style({
  listStyle: 'none',
});

const quote = style({
  quotes: 'none',
  selectors: {
    '&:before, &:after': {
      content: "''",
    },
  },
});

const table = style({
  borderCollapse: 'collapse',
  borderSpacing: 0,
});

const appearance = style({
  appearance: 'none',
});

const field = style([
  appearance,
  {
    '::placeholder': {
      opacity: 1,
    },
    'outline': 'none',
  },
]);

const mark = style({
  backgroundColor: 'transparent',
  color: 'inherit',
});

const select = style([
  field,
  {
    ':disabled': {
      opacity: 1,
    },
    'selectors': {
      '&::-ms-expand': {
        display: 'none',
      },
    },
  },
]);

const input = style([
  field,
  {
    selectors: {
      '&::-ms-clear': {
        display: 'none',
      },
      '&::-webkit-search-cancel-button': {
        WebkitAppearance: 'none',
      },
    },
  },
]);

const button = style({
  appearance: 'none',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left',
});

const a = style({
  color: 'inherit',
  textDecoration: 'none',
});

export const element = {
  a,
  blockquote: quote,
  button,
  input,
  mark,
  ol: list,
  q: quote,
  select,
  table,
  textarea: field,
  ul: list,
};
