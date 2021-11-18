import { style } from '@vanilla-extract/css'

import 'focus-visible'

const hideFocusRingsDataAttribute = '[data-js-focus-visible] &:focus:not([data-focus-visible-added])'

export const base = style({
  margin: 0,
  padding: 0,
  border: 0,
  boxSizing: 'border-box',
  fontSize: '100%',
  fontFamily: 'SFRounded,ui-rounded,SF Pro Rounded,system-ui,Helvetica Neue,Arial,Helvetica,sans-serif',
  verticalAlign: 'baseline',
  WebkitTapHighlightColor: 'transparent',
  selectors: {
    [`${hideFocusRingsDataAttribute}`]: {
      outline: 'none'
    }
  }
})

const list = style({
  listStyle: 'none'
})

const quote = style({
  quotes: 'none',
  selectors: {
    '&:before, &:after': {
      content: "''"
    }
  }
})

const table = style({
  borderCollapse: 'collapse',
  borderSpacing: 0
})

const appearance = style({
  appearance: 'none'
})

const field = style([
  appearance,
  {
    outline: 'none',
    '::placeholder': {
      opacity: 1
    }
  }
])

const mark = style({
  backgroundColor: 'transparent',
  color: 'inherit'
})

const select = style([
  field,
  {
    ':disabled': {
      opacity: 1
    },
    selectors: {
      '&::-ms-expand': {
        display: 'none'
      }
    }
  }
])

const input = style([
  field,
  {
    selectors: {
      '&::-ms-clear': {
        display: 'none'
      },
      '&::-webkit-search-cancel-button': {
        WebkitAppearance: 'none'
      }
    }
  }
])

const button = style({
  background: 'none',
  cursor: 'pointer'
})

const a = style({
  textDecoration: 'none',
  color: 'inherit'
})

export const element = {
  ul: list,
  ol: list,
  blockquote: quote,
  q: quote,
  a,
  table,
  mark,
  select,
  button,
  textarea: field,
  input
}
