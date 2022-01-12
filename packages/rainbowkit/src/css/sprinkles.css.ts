import { createGlobalThemeContract } from '@vanilla-extract/css'
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'

import './reset.css'

const themeContractValues = {
  colors: {
    connectButtonBackground: '',
    connectButtonText: '',
    connectionIndicator: '',
    dropdownButtonBackground: '',
    dropdownButtonText: '',
    menuBackground: '',
    menuDivider: '',
    menuItemSelectedBackground: '',
    menuText: '',
    menuTextAction: '',
    menuTextDisconnect: '',
    menuTextSecondary: '',
    modalBackdrop: '',
    modalBackground: '',
    modalClose: '',
    modalText: '',
    modalTextSecondary: '',
    error: ''
  },
  fonts: {
    body: ''
  },
  radii: {
    connectButton: '',
    dropdownButton: '',
    menu: '',
    menuItem: '',
    modal: '',
    networkButton: ''
  },
  shadows: {
    connectButton: '',
    dropdownButton: '',
    menu: '',
    networkButton: ''
  }
}

export type Theme = typeof themeContractValues

export const themeVars = createGlobalThemeContract(themeContractValues, (_, path) => `rk-${path.join('-')}`)

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
export type ThemePartial = DeepPartial<Theme>

const spacing = {
  '0': '0',
  '4': '4px',
  '6': '6px',
  '8': '8px',
  '10': '10px',
  '12': '12px',
  '14': '14px',
  '16': '16px',
  '18': '18px',
  '20': '20px',
  '24': '24px',
  '28': '28px',
  '32': '32px'
}

const dimensions = {
  '4': '4px',
  '8': '8px',
  '20': '20px',
  '24': '24px',
  '28': '28px',
  full: '100%',
  max: 'max-content',
  viewHeight: '100vh',
  viewWidth: '100vw'
}

const flexAlignment = ['flex-start', 'center'] as const

const layoutStyles = defineProperties({
  properties: {
    alignItems: flexAlignment,
    alignSelf: flexAlignment,
    borderRadius: {
      ...themeVars.radii,
      '1': '1px',
      '6': '6px',
      '10': '10px',
      full: '9999px'
    },
    borderStyle: {
      solid: 'solid'
    },
    borderWidth: {
      '4': '4px'
    },
    display: ['none', 'block', 'flex', 'inline-flex'],
    flexDirection: ['row', 'column'],
    fontFamily: themeVars.fonts,
    fontSize: {
      '14': '14px',
      '16': '16px',
      '18': '18px',
      '20': '20px',
      '23': '23px'
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      heavy: '800'
    },
    height: dimensions,
    justifyContent: [...flexAlignment, 'space-between'],
    marginBottom: spacing,
    marginLeft: spacing,
    marginRight: spacing,
    marginTop: spacing,
    minWidth: dimensions,
    maxWidth: dimensions,
    paddingBottom: spacing,
    paddingLeft: spacing,
    paddingRight: spacing,
    paddingTop: spacing,
    position: ['absolute', 'fixed', 'relative'],
    right: {
      '0': '0'
    },
    width: dimensions
  } as const,
  shorthands: {
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom']
  }
})

const colorStyles = defineProperties({
  properties: {
    color: themeVars.colors,
    background: themeVars.colors,
    borderColor: themeVars.colors,
    boxShadow: themeVars.shadows
  }
})

const unresponsiveProperties = defineProperties({
  properties: {
    cursor: ['pointer']
  } as const
})

export const sprinkles = createSprinkles(layoutStyles, colorStyles, unresponsiveProperties)
export type Sprinkles = Parameters<typeof sprinkles>[0]
