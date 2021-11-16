import { style } from '@vanilla-extract/css'

export const ListStyles = style({
  position: 'absolute',
  right: '0',
  minWidth: '160px',
  width: 'max-content',
  background: 'linear-gradient(179.83deg, rgba(26, 27, 31, 0.8) 0.15%, #1a1b1f 99.85%)',
  backdropFilter: 'blur(20px)',
  zIndex: '10',
  padding: '4px',
  borderRadius: '16px',
  top: '42px',
  fontWeight: '800'
})

export const OptionStyles = style({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  borderRadius: '12px',
  color: '#e9f2ff',
  backdropFilter: 'blur(20px)'
})

export const IconStyles = style({
  minWidth: '24px',
  minHeight: '24px'
})

export const IndicatorStyles = style({
  position: 'absolute',
  width: '8px',
  height: '8px',
  right: '14px',
  top: 'calc(50% - 4px)',
  borderRadius: '50%',
  background: '#2ccc00'
})
