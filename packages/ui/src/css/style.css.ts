import { ComplexStyleRule, style } from '@vanilla-extract/css'

const Center: ComplexStyleRule = {
  display: 'flex',
  alignItems: 'center'
}

export const StyledIconClassName = style({
  ...Center,
  borderRadius: '9999px',
  height: '1.8em',
  width: '1.8em',
  justifyContent: 'center',
  fontSize: '0.8em',
  marginRight: '10px'
})

export const ExplorerLinkClassName = style({
  textDecoration: 'none',
  '&::before': {
    content: '↗ '
  },
  '&:hover': {
    textDecoration: 'underline'
  }
})

export const DropdownIconClassName = style({
  marginLeft: '6px'
})

export const ProfileContainerClassName = style({
  position: 'relative',
  width: 'max-content'
})

export const TxContainerClassName = style({
  ...Center,
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '0.6rem 0.8rem',
  width: '100%'
})

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
