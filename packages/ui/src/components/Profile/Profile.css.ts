import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../css/sprinkles.css'

export const DropdownIconClassName = sprinkles({
  marginLeft: '6'
})

export const PillStyles = style({
  background: 'linear-gradient(179.83deg, rgba(26, 27, 31, 0.8) 0.15%, #1a1b1f 99.85%)',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(20px)'
})
