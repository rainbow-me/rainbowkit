import { Theme } from '../css/sprinkles.css'

export const baseTheme: Pick<Theme, 'radii' | 'fonts'> = {
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
  }
}
