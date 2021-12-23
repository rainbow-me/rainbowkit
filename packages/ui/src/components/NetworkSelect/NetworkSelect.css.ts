import { globalStyle, style } from '@vanilla-extract/css'
import { sprinkles } from '../../css/sprinkles.css'

export const ListStyles = style({
  minWidth: '160px',
  backdropFilter: 'blur(20px)',
  zIndex: 10,
  top: '42px'
})

export const ButtonStyles = style([
  sprinkles({
    background: 'dropdownButtonBackground'
  }),
  {
    backdropFilter: 'blur(20px)'
  }
])

globalStyle(`${ButtonStyles} img`, {
  marginRight: 0
})

export const IndicatorStyles = style({
  top: 'calc(50% - 4px)'
})

export const SelectOptionStyles = sprinkles({
  padding: '10'
})

export const CurrentChainOptionStyles = sprinkles({
  background: 'menuItemSelectedBackground'
})
