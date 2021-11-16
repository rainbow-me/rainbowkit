import { style as resetStyles } from '@vanilla-extract/css'

import 'focus-visible'

const hideFocusRingsDataAttribute = '[data-js-focus-visible] &:focus:not([data-focus-visible-added])'

export const base = resetStyles({
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

// HTML5 display-role reset for older browsers
const block = resetStyles({
  display: 'block'
})

const body = resetStyles({
  lineHeight: 1
})

const list = resetStyles({
  listStyle: 'none'
})

const quote = resetStyles({
  quotes: 'none',
  selectors: {
    '&:before, &:after': {
      content: "''"
    }
  }
})

const table = resetStyles({
  borderCollapse: 'collapse',
  borderSpacing: 0
})

const appearance = resetStyles({
  appearance: 'none'
})

const field = resetStyles([
  block,
  appearance,
  resetStyles({
    outline: 'none',
    '::placeholder': {
      opacity: 1
    }
  })
])

// Custom reset rules
const mark = resetStyles({
  backgroundColor: 'transparent',
  color: 'inherit'
})

const select = resetStyles([
  field,
  resetStyles({
    ':disabled': {
      opacity: 1
    },
    selectors: {
      '&::-ms-expand': {
        display: 'none'
      }
    }
  })
])

const input = resetStyles([
  field,
  resetStyles({
    selectors: {
      '&::-ms-clear': {
        display: 'none'
      },
      '&::-webkit-search-cancel-button': {
        WebkitAppearance: 'none'
      }
    }
  })
])

const button = resetStyles({
  background: 'none'
})

const a = resetStyles({
  textDecoration: 'none',
  color: 'inherit'
})

export const element = {
  article: block,
  aside: block,
  details: block,
  div: block,
  figcaption: block,
  figure: block,
  footer: block,
  header: block,
  hgroup: block,
  menu: block,
  nav: block,
  section: block,
  ul: list,
  ol: list,
  blockquote: quote,
  q: quote,
  body,
  a,
  table,
  mark,
  select,
  button,
  textarea: field,
  input
}

export type Element = keyof typeof element
