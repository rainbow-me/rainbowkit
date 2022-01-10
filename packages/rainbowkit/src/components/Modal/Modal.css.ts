import { globalStyle, style } from '@vanilla-extract/css'
import { sprinkles } from '../../css/sprinkles.css'

export const ModalTitle = style([
  sprinkles({
    color: 'modalText',
    display: 'block',
    fontFamily: 'body',
    fontSize: '20',
    fontWeight: 'heavy',
    marginBottom: '4'
  }),
  {
    fontStyle: 'normal',
    lineHeight: '24px',
    letterSpacing: '0.4px',
    fontFeatureSettings: "'ss08' on, 'cv09' on"
  }
])

export const StyledModal = style([
  sprinkles({
    background: 'modalBackground',
    borderRadius: 'modal',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24',
    position: 'relative'
  }),
  {
    minHeight: '525px',
    width: '390px'
  }
])

export const ButtonOption = style([
  sprinkles({
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0',
    width: 'full'
  }),
  {
    background: 'none',
    border: 'none'
  }
])

export const Caption = style([
  sprinkles({
    color: 'modalTextSecondary',
    display: 'block',
    fontFamily: 'body',
    fontWeight: 'bold'
  }),
  {
    fontStyle: 'normal',
    fontSize: '1rem',
    lineHeight: '19px',
    letterSpacing: '0.5px',
    fontFeatureSettings: "'ss08' on, 'cv09' on"
  }
])

export const CloseButton = style([
  sprinkles({
    color: 'modalClose',
    fontSize: '14',
    position: 'absolute'
  }),
  {
    textAlign: 'center',
    letterSpacing: '0.4px',
    fontWeight: 900,
    lineHeight: '17px',
    right: 24,
    top: 24
  }
])

export const Terms = style([
  sprinkles({
    color: 'modalTextSecondary',
    fontSize: '14',
    fontWeight: 'semibold'
  }),
  {
    lineHeight: 1.5
  }
])

globalStyle(`${Terms} > a`, {
  color: '#a0c7ff',
  fontWeight: 700,
  textDecoration: 'none'
})

globalStyle(`${Terms} > a:hover`, {
  textDecoration: 'underline'
})

export const MoreWallets = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'full'
  }),
  {
    padding: '11px'
  }
])

export const MoreWalletsGroup = style([
  sprinkles({
    marginRight: '12'
  }),
  {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: '2px',
    width: 'max-content'
  }
])

export const BackButton = style([
  sprinkles({
    cursor: 'pointer',
    display: 'flex',
    width: 'full'
  }),
  {
    padding: '11px',
    background: 'none',
    border: 'none'
  }
])

export const WalletLabel = style([
  sprinkles({
    alignItems: 'center',
    color: 'modalText',
    display: 'flex',
    fontSize: '20',
    fontWeight: 'heavy',
    justifyContent: 'center'
  }),
  {
    fontStyle: 'normal',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    fontFeatureSettings: "'pnum' on, 'lnum' on",
    textTransform: 'capitalize'
  }
])

export const Icon = style([
  sprinkles({
    borderRadius: '10'
  }),
  {
    filter: 'drop-shadow(0px 4px 12px rgba(0, 30, 89, 0.3))'
  }
])

export const OptionIcon = style([
  sprinkles({
    marginRight: '12'
  }),
  {
    height: '34px',
    width: '34px'
  }
])

export const MoreWalletsIcon = style({
  height: '1rem',
  width: '1rem'
})

export const ModalOverlay = style([
  sprinkles({
    alignItems: 'center',
    background: 'modalBackdrop',
    display: 'flex',
    height: 'viewHeight',
    justifyContent: 'center',
    position: 'fixed',
    width: 'full'
  }),
  {
    top: 0,
    left: 0,
    zIndex: 999
  }
])

export const Wallets = style([
  sprinkles({
    marginTop: '24'
  }),
  {
    listStyleType: 'none',
    paddingLeft: 0
  }
])

export const WalletOption = style([
  sprinkles({
    marginBottom: '12'
  }),
  {
    padding: '11px',
    width: 'unset'
  }
])

export const MoreWalletsInner = style({
  display: 'inherit',
  flexDirection: 'inherit'
})

export const BackButtonCaption = style([
  sprinkles({
    color: 'modalText',
    cursor: 'pointer',
    fontSize: '20'
  }),
  {
    '::before': {
      content: '\\21A9',
      marginRight: '0.5rem'
    }
  }
])

export const ErrorMessage = style([
  sprinkles({
    fontFamily: 'body',
    color: 'error'
  }),
  {
    marginTop: '0.5rem'
  }
])
