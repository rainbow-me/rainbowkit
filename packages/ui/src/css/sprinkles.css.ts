import { createTheme } from '@vanilla-extract/css'
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'

export const [themeClass, vars] = createTheme({
  borderWidths: {
    '4': '4px'
    // more
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

    // need to add colors
    // from design system in figma
    black: '#000000',
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
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
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
    '10': '10px'
    // more
  },

  space: {
    '0': '0',
    px: '1px',
    '0.5': '0.125rem',
    '1': '0.25rem',
    '1.5': '0.375rem',
    '2': '0.5rem',
    '2.5': '0.625rem',
    '3': '0.75rem',
    '3.5': '0.875rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '7': '1.75rem',
    '8': '2rem',
    '9': '2.25rem',
    '10': '2.5rem',
    '11': '2.75rem',
    '12': '3rem',
    '13': '3.25rem',
    '14': '3.5rem',
    '15': '3.75rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '28': '7rem',
    '32': '8rem',
    '36': '9rem',
    '40': '10rem',
    '44': '11rem',
    '48': '12rem',
    '52': '13rem',
    '56': '14rem',
    '60': '15rem',
    '64': '16rem',
    '72': '18rem',
    '80': '20rem',
    '96': '24rem',
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
    borderColor: vars.colors,
    borderWidth: vars.borderWidths,
    borderBottomWidth: vars.borderWidths,
    borderTopWidth: vars.borderWidths,
    borderRadius: vars.radii,
    borderBottomLeftRadius: vars.radii,
    borderBottomRightRadius: vars.radii,
    borderTopLeftRadius: vars.radii,
    borderTopRightRadius: vars.radii,
    display: ['none', 'block', 'flex', 'inline-flex'],
    flexDirection: ['row', 'column'],
    height: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    // probably some opinions on margin usage
    marginTop: vars.space,
    marginBottom: vars.space,
    marginRight: vars.space,
    marginLeft: vars.space,
    width: vars.space,
    fontSize: vars.fontSize,
    fontWeight: vars.fontWeight,
    fontFamily: vars.fontFamily,
    minWidth: vars.space
  },
  shorthands: {
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

export const atoms = createSprinkles(layoutStyles, colorStyles)
