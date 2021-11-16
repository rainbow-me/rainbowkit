import { style } from '@vanilla-extract/css'

export const ListStyles = style({
  minWidth: '160px',
  background: 'linear-gradient(179.83deg, rgba(26, 27, 31, 0.8) 0.15%, #1a1b1f 99.85%)',
  backdropFilter: 'blur(20px)',
  zIndex: 10,
  top: '42px'
})

export const OptionStyles = style({
  backdropFilter: 'blur(20px)',
  background: 'linear-gradient(179.83deg, rgba(26, 27, 31, 0.8) 0.15%, #1a1b1f 99.85%)'
})

export const IndicatorStyles = style({
  top: 'calc(50% - 4px)'
})

export const SelectOptionStyles = style({
  padding: '10px'
})
