import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../css/sprinkles.css'

export const DropdownIconClassName = sprinkles({
  marginLeft: '6'
})

export const PillStyles = style([
  sprinkles({
    background: 'connectButtonBackground',
    boxShadow: 'connectButton'
  }),
  {
    backdropFilter: 'blur(20px)'
  }
])
