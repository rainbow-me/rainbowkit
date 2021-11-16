import { style } from '@vanilla-extract/css'

export const ExplorerLinkClassName = style({
  textDecoration: 'none',
  '&::before': {
    content: '↗ '
  },
  '&:hover': {
    textDecoration: 'underline'
  }
})

export const TxContainerClassName = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '0.6rem 0.8rem',
  width: '100%'
})
