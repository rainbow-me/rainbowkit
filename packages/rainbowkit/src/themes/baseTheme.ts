import { ThemeVars } from '../css/sprinkles.css';

const radii: Record<RadiiValues, RadiiScale> = {
  large: {
    0: '6px',
    1: '12px',
    2: '24px',
  },
  medium: {
    0: '4px',
    1: '8px',
    2: '16px',
  },
  none: {
    0: '0px',
    1: '0px',
    2: '0px',
  },
  small: {
    0: '4px',
    1: '4px',
    2: '8px',
  },
};

export const baseTheme = ({
  borderRadius = 'large',
}: Pick<ThemeOptions, 'borderRadius'>): Pick<ThemeVars, 'radii' | 'fonts'> => ({
  fonts: {
    body: 'SFRounded,ui-rounded,SF Pro Rounded,system-ui,Helvetica Neue,Arial,Helvetica,sans-serif',
  },
  radii: {
    connectButton: radii[borderRadius][1],
    menuButton: radii[borderRadius][1],
    modal: radii[borderRadius][2],
  },
});

type RadiiScale = {
  0: string;
  1: string;
  2: string;
};
type RadiiValues = 'large' | 'medium' | 'small' | 'none';

export type AccentValues = 'blue' | 'green' | 'purple' | 'pink';

export interface ThemeOptions {
  accentColor?: AccentValues;
  borderRadius?: RadiiValues;
}
