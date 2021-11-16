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

/**
 * Pill styles
 */
export const PillStyles = style({
  background: 'linear-gradient(179.83deg, rgba(26, 27, 31, 0.8) 0.15%, #1a1b1f 99.85%)',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(20px)',
  borderRadious: '16px',
  padding: '7px'
})

/**
 * Network Select Styles
 */
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
