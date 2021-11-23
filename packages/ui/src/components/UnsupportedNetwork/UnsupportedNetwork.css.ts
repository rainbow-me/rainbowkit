import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../css/sprinkles.css'

export const UnsupportedNetworkModalBodyClassName = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: '24',
    background: 'white'
  }),
  {
    height: 'max-content',
    maxHeight: '525px',
    width: '390px',
    borderRadius: '24px'
  }
])

export const UnsupportedNetworkModalTextClassName = style({
  marginBottom: 0,
  lineHeight: 1.5
})
