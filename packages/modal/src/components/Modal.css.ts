import { globalStyle, style } from '@vanilla-extract/css'

const center = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

export const ModalTitle = style({
  fontStyle: 'normal',
  fontWeight: 800,
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: '0.4px',
  fontFeatureSettings: "'ss08' on, 'cv09' on",
  color: '#25292e',
  display: 'block',
  marginBottom: '4px'
})

export const StyledModal = style({
  minHeight: '525px',
  width: '390px',
  padding: '24px',
  position: 'relative',
  background: 'white',
  borderRadius: '24px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
})

export const ButtonOption = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer'
})

export const Caption = style({
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '1rem',
  lineHeight: '19px',
  letterSpacing: '0.5px',
  fontFeatureSettings: "'ss08' on, 'cv09' on",
  color: 'rgba(60, 66, 82, 0.6)',
  display: 'block'
})
export const CloseButton = style({
  textAlign: 'center',
  letterSpacing: '0.4px',
  color: 'rgba(60, 66, 82, 0.8)',
  fontWeight: 900,
  fontSize: '14px',
  lineHeight: '17px',
  position: 'absolute',
  right: 24,
  top: 24
})
export const Terms = style({
  fontWeight: 600,
  color: 'rgba(60, 66, 82, 0.6)',
  fontSize: '14px',
  lineHeight: 1.5
})

globalStyle(`${Terms} > a`, {
  color: '#a0c7ff',
  fontWeight: 700,
  textDecoration: 'none'
})

globalStyle(`${Terms} > a:hover`, {
  textDecoration: 'underline'
})

export const MoreWallets = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '11px'
})

export const MoreWalletsGroup = style({
  marginRight: '12px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr 1fr',
  gap: '2px',
  width: 'max-content'
})

export const BackButton = style({
  width: '100%',
  padding: '11px',
  display: 'flex',
  background: 'none',
  border: 'none',
  cursor: 'pointer'
})

export const WalletLabel = style([
  center,
  {
    fontStyle: 'normal',
    fontWeight: 800,
    fontSize: '20px',
    lineHeight: '24px',

    letterSpacing: '0.5px',
    fontFeatureSettings: "'pnum' on, 'lnum' on",
    color: '#25292e',
    textTransform: 'capitalize'
  }
])

export const Icon = style({
  borderRadius: '10px',
  filter: 'drop-shadow(0px 4px 12px rgba(0, 30, 89, 0.3))'
})

export const OptionIcon = style({ marginRight: '12px', height: '34px', width: '34px' })

export const MoreWalletsIcon = style({
  height: '1rem',
  width: '1rem'
})

export const ModalOverlay = style([
  center,
  {
    width: '100%',
    height: '100vh',
    top: 0,
    left: 0,
    zIndex: 999,
    position: 'fixed',
    background: 'rgba(0, 0, 0, 0.5)'
  }
])

export const Wallets = style({
  marginTop: '24px',
  listStyleType: 'none',
  paddingLeft: 0
})

export const WalletOption = style({
  marginBottom: '12px',
  padding: '11px',
  width: 'unset'
})

export const MoreWalletsInner = style({
  display: 'inherit',
  flexDirection: 'inherit'
})

export const BackButtonCaption = style({
  color: '#25292e',
  fontSize: '20px',
  cursor: 'pointer',
  '::before': {
    content: '\\21A9',
    marginRight: '0.5rem'
  }
})

export const ErrorMessage = style({
  color: 'red',
  marginTop: '0.5rem'
})
