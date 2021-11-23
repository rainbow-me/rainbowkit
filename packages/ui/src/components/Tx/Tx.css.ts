import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../css/sprinkles.css'

export const ExplorerLinkClassName = style({
  textDecoration: 'none',
  '::before': {
    content: '↗ '
  },
  ':hover': {
    textDecoration: 'underline'
  }
})

export const TxContainerClassName = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'full'
  }),
  {
    padding: '0.6rem 0.8rem'
  }
])
