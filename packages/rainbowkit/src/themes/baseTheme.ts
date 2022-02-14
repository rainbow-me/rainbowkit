import { ThemeVars } from '../css/sprinkles.css';

export const baseTheme: Pick<ThemeVars, 'radii' | 'fonts'> = {
  fonts: {
    body: 'SFRounded,ui-rounded,SF Pro Rounded,system-ui,Helvetica Neue,Arial,Helvetica,sans-serif',
  },
  radii: {
    connectButton: '16px',
    menuButton: '18px',
    modal: '28px',
  },
};
