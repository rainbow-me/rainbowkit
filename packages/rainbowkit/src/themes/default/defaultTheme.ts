import { Theme, ThemePartial } from '../../css/sprinkles.css'
import deepmerge from 'deepmerge'

const themeValues: Theme = {
  colors: {
    connectButtonBackground: 'linear-gradient(179.83deg, rgba(26, 27, 31, 0.8) 0.15%, #1a1b1f 99.85%)',
    connectButtonText: 'white',
    connectionIndicator: '#2CCC00',
    dropdownButtonBackground: 'linear-gradient(179.83deg, rgba(26, 27, 31, 0.8) 0.15%, #1a1b1f 99.85%)',
    dropdownButtonText: 'white',
    menuBackground: '#1A1B1F',
    menuDivider: 'rgba(255, 255, 255, .04)',
    menuItemSelectedBackground: 'rgba(255, 255, 255, 0.1)',
    menuText: 'white',
    menuTextAction: '#4892FE',
    menuTextDisconnect: '#FF494A',
    menuTextSecondary: '#A3A4A5',
    error: '#FF494A',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    modalBackground: 'white',
    modalClose: 'rgba(60, 66, 82, 0.8)',
    modalText: '#25292E',
    modalTextSecondary: 'rgba(60, 66, 82, 0.6)'
  },
  fonts: {
    body: 'SFRounded,ui-rounded,SF Pro Rounded,system-ui,Helvetica Neue,Arial,Helvetica,sans-serif'
  },
  radii: {
    connectButton: '16px',
    dropdownButton: '16px',
    menu: '16px',
    menuItem: '12px',
    modal: '24px',
    networkButton: '12px'
  },
  shadows: {
    connectButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    dropdownButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    menu: '0px 10px 30px rgba(0, 0, 0, 0.1)',
    networkButton: '0px 4px 12px rgba(0, 0, 0, 0.1)'
  }
}

interface DefaultThemeOptions {
  overrides?: ThemePartial
}

export function defaultTheme(options: DefaultThemeOptions = {}): Theme {
  return options.overrides ? (deepmerge(themeValues, options.overrides) as Theme) : themeValues
}
