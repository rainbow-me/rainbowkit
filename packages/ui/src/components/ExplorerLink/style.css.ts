import { style } from '@vanilla-extract/css'

export const ExplorerLinkClassName = style({
  textDecoration: 'none',
  '::before': {
    content: '↗ '
  },
  ':hover': {
    textDecoration: 'underline'
  }
})
