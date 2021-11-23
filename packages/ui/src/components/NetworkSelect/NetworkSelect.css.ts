import { globalStyle, GlobalStyleRule, style } from '@vanilla-extract/css'
import { sprinkles } from '../../css/sprinkles.css'

export const ListStyles = style({
  minWidth: '160px',
  background: 'linear-gradient(179.83deg, rgba(26, 27, 31, 0.8) 0.15%, #1A1B1F 99.85%);',
  backdropFilter: 'blur(20px)',
  zIndex: 10,
  top: '42px'
})

export const ButtonStyles = style({
  backdropFilter: 'blur(20px)',
  background: 'linear-gradient(179.83deg, rgba(26, 27, 31, 0.8) 0.15%, #1a1b1f 99.85%)'
})

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
  background: 'white10'
})
