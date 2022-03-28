import { ThemeVars } from '../css/sprinkles.css';

type RadiusScale = 'large' | 'medium' | 'small' | 'none';
const radiusScales: Record<
  RadiusScale,
  {
    actionButton: string;
    connectButton: string;
    modal: string;
    modalMobile: string;
  }
> = {
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

const fadeDuration = '150ms';
const slideEasing = 'cubic-bezier(.15,1.15,0.6,1.00)';

type TransitionScale = 'large' | 'small';
const transitionScales: Record<TransitionScale, ThemeVars['transitions']> = {
  large: {
    modalEntrance: {
      fadeDuration,
      slideDistance: '100%',
      slideDuration: '350ms',
      slideEasing,
    },
    modalEntranceMobile: {
      fadeDuration,
      slideDistance: '100%',
      slideDuration: '350ms',
      slideEasing,
    },
  },
  small: {
    modalEntrance: {
      fadeDuration,
      slideDistance: '20%',
      slideDuration: '250ms',
      slideEasing,
    },
    modalEntranceMobile: {
      fadeDuration,
      slideDistance: '100%',
      slideDuration: '350ms',
      slideEasing,
    },
  },
};

interface BaseThemeOptions {
  borderRadius?: RadiusScale;
  transitions?: TransitionScale;
}

export const baseTheme = ({
  borderRadius = 'large',
  transitions = 'large',
}: BaseThemeOptions): Pick<ThemeVars, 'radii' | 'fonts' | 'transitions'> => ({
  fonts: {
    body: 'SFRounded,ui-rounded,SF Pro Rounded,system-ui,Helvetica Neue,Arial,Helvetica,sans-serif',
  },
  radii: {
    actionButton: radiusScales[borderRadius].actionButton,
    connectButton: radiusScales[borderRadius].connectButton,
    menuButton: radiusScales[borderRadius].connectButton,
    modal: radiusScales[borderRadius].modal,
    modalMobile: radiusScales[borderRadius].modalMobile,
  },
  transitions: transitionScales[transitions],
});

export type AccentValues =
  | 'blue'
  | 'green'
  | 'red'
  | 'purple'
  | 'pink'
  | 'orange'
  | 'yellow';

export interface ThemeOptions extends BaseThemeOptions {
  accentColor?: AccentValues;
}
