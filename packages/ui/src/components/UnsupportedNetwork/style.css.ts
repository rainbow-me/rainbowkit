import { style } from '@vanilla-extract/css'

export const UnsupportedNetworkModalBodyClassName = style({
  height: 'max-content',
  maxHeight: '525px',
  width: '390px',
  padding: '24px',
  position: 'relative',
  borderRadius: '24px',
  display: 'flex',
  flexDirection: 'column',
  background: 'white'
})

export const UnsupportedNetworkModalTextClassName = style({
  marginBottom: 0,
  lineHeight: 1.5
})
