import { createGlobalTheme } from '@vanilla-extract/css'
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'

import './reset.css'

export const vars = createGlobalTheme(':root', {
  borderWidths: {
    '4': '4px'
  },
  borderStyle: {
    solid: 'solid'
  },
  color: {
    appleBlue: '#0A84FF',
    greyDark: '#25292E',
    grey80: 'rgba(60, 66, 82, 0.8)',
    grey60: 'rgba(60, 66, 82, 0.6)',
    sky100: '#E0E8FF',
    sky90: '#e9f2ff', // might not be actually sky90
    sky80: 'rgba(88, 91, 100, 0.8)',
    sky60: 'rgba(88, 91, 100, 0.6)',
    white: '#FFFFFF',
    white60: 'rgba(255, 255, 255, 0.6)',
    white10: 'rgba(255, 255, 255, 0.1)',
    white04: 'rgba(255, 255, 255, .04)',
    white01: 'rgba(255, 255, 255, .01)',
    green: '#2CCC00',

    // need to add colors
    // from design system in figma
    black: '#000000',
    blackLight: '#1A1B1F',
    blue: '#0E76FD',
    red: '#FF494A'
    // light mode colors
    // #FFFFFF
    // #25292E
    // #3C4252 with varying opacity
    // #25292E
    // #2CCC00
    // dark mode colors
    // #12131A
    // #E0E8FF
    // #E0E8FF  with varying opacity
    // #000000
    // #00D146
  },
  fontFamily: {
    body: 'SFRounded,ui-rounded,SF Pro Rounded,system-ui,Helvetica Neue,Arial,Helvetica,sans-serif'
  },
  fontSize: {
    '14': '14px',
    '16': '16px',
    '18': '18px',
    '20': '20px',
    '23': '23px'
    // more
  },

  fontWeight: {
    regular: {
      fontWeight: '400'
    },
    medium: {
      fontWeight: '500'
    },
    semibold: {
      fontWeight: '600'
    },
    bold: {
      fontWeight: '700'
    },
    heavy: {
      fontWeight: '800'
    }
  },
  radii: {
    '1': '1px',
    '6': '6px',
    '10': '10px',
    '12': '12px',
    '16': '16px',
    full: '9999px'
  },

  space: {
    '0': '0',
    px: '1px',
    '2': '2px',
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
    '32': '32px',
    auto: 'auto',
    full: '100%',
    fit: 'fit-content',
    max: 'max-content',
    min: 'min-content',
    viewHeight: '100vh',
    viewWidth: '100vw',
    none: '0'
  }
})

const flexAlignment = ['flex-start', 'center', 'flex-end', 'stretch'] as const

const layoutStyles = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' }
  },
  defaultCondition: 'mobile',
  // need to alphabetize
  properties: {
    alignItems: [...flexAlignment, 'baseline'],
    alignSelf: [...flexAlignment, 'baseline'],
    borderColor: vars.color,
    borderStyle: vars.borderStyle,
    borderWidth: vars.borderWidths,
    borderBottomWidth: vars.borderWidths,
    borderTopWidth: vars.borderWidths,
    borderRadius: vars.radii,
    borderBottomLeftRadius: vars.radii,
    borderBottomRightRadius: vars.radii,
    borderTopLeftRadius: vars.radii,
    borderTopRightRadius: vars.radii,
    display: ['none', 'block', 'flex', 'inline-flex', 'inline-block'],
    flexDirection: ['row', 'column'],
    height: vars.space,
    justifyContent: [...flexAlignment, 'space-around', 'space-between'],
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    position: ['absolute', 'fixed', 'relative', 'sticky'],
    marginTop: vars.space,
    marginBottom: vars.space,
    marginRight: vars.space,
    marginLeft: vars.space,
    width: vars.space,
    fontSize: vars.fontSize,
    fontWeight: vars.fontWeight,
    fontFamily: vars.fontFamily,
    minWidth: vars.space,
    minHeight: vars.space,
    right: vars.space
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
    color: vars.color,
    background: vars.color
    // etc.
  }
})

const unresponsiveProperties = defineProperties({
  properties: {
    cursor: ['default', 'pointer']
  } as const
})

export type UnresponsiveProperties = keyof typeof unresponsiveProperties

export const sprinkles = createSprinkles(layoutStyles, colorStyles, unresponsiveProperties)
export type Sprinkles = Parameters<typeof sprinkles>[0]
