import { Theme } from '../css/sprinkles.css';

export const baseTheme: Pick<Theme, 'radii' | 'fonts'> = {
  fonts: {
    body: 'SFRounded,ui-rounded,SF Pro Rounded,system-ui,Helvetica Neue,Arial,Helvetica,sans-serif',
  },
  radii: {
    connectButton: '16px',
    modal: '28px',
  },
};
