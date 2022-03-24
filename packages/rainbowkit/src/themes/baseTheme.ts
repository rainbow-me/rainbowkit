import { ThemeVars } from '../css/sprinkles.css';

const radii: Record<RadiiValues, RadiiScale> = {
  large: {
    actionButton: '9999px',
    connectButton: '12px',
    modal: '24px',
    modalMobile: '28px',
  },
  medium: {
    actionButton: '10px',
    connectButton: '8px',
    modal: '16px',
    modalMobile: '18px',
  },
  none: {
    actionButton: '0px',
    connectButton: '0px',
    modal: '0px',
    modalMobile: '0px',
  },
  small: {
    actionButton: '4px',
    connectButton: '4px',
    modal: '8px',
    modalMobile: '8px',
  },
};

export const baseTheme = ({
  borderRadius = 'large',
}: Pick<ThemeOptions, 'borderRadius'>): Pick<ThemeVars, 'radii' | 'fonts'> => ({
  fonts: {
    body: 'SFRounded,ui-rounded,SF Pro Rounded,system-ui,Helvetica Neue,Arial,Helvetica,sans-serif',
  },
  radii: {
    actionButton: radii[borderRadius].actionButton,
    connectButton: radii[borderRadius].connectButton,
    menuButton: radii[borderRadius].connectButton,
    modal: radii[borderRadius].modal,
    modalMobile: radii[borderRadius].modalMobile,
  },
});

type RadiiScale = {
  actionButton: string;
  connectButton: string;
  modal: string;
  modalMobile: string;
};
type RadiiValues = 'large' | 'medium' | 'small' | 'none';

export type AccentValues =
  | 'blue'
  | 'green'
  | 'red'
  | 'purple'
  | 'pink'
  | 'orange'
  | 'yellow';

export interface ThemeOptions {
  accentColor?: AccentValues;
  borderRadius?: RadiiValues;
}
