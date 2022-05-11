import { ThemeVars } from '../css/sprinkles.css';

// Source: https://css-tricks.com/snippets/css/system-font-stack
// Note that quotes have been removed to avoid escaping and server/client mismatch issues
const systemFontStack =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
const fontStacks = {
  rounded: `SFRounded, ui-rounded, "SF Pro Rounded", ${systemFontStack}`,
  system: systemFontStack,
} as const;
type FontStack = keyof typeof fontStacks;

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

type TransitionScale = 'large' | 'small' | 'fade' | 'none';
const transitionScales: Record<TransitionScale, ThemeVars['transitions']> = {
  fade: {
    modalEntrance: {
      fadeDuration,
      slideDistance: '0%',
      slideDuration: '0ms',
      slideEasing,
    },
    modalEntranceMobile: {
      fadeDuration,
      slideDistance: '0%',
      slideDuration: '0ms',
      slideEasing,
    },
  },
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
  none: {
    modalEntrance: {
      fadeDuration: '0ms',
      slideDistance: '0',
      slideDuration: '0ms',
      slideEasing,
    },
    modalEntranceMobile: {
      fadeDuration: '0ms',
      slideDistance: '0',
      slideDuration: '0ms',
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
      slideDistance: '20%',
      slideDuration: '250ms',
      slideEasing,
    },
  },
};
interface BaseThemeOptions {
  borderRadius?: RadiusScale;
  fontStack?: FontStack;
  transitions?: TransitionScale;
}

export const baseTheme = ({
  borderRadius = 'large',
  fontStack = 'rounded',
  transitions = 'large',
}: BaseThemeOptions): Pick<ThemeVars, 'radii' | 'fonts' | 'transitions'> => ({
  fonts: {
    body: fontStacks[fontStack],
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

export interface AccentColor {
  accentColor: string;
  accentColorForeground: string;
}

export type AccentColorPreset =
  | 'blue'
  | 'green'
  | 'red'
  | 'purple'
  | 'pink'
  | 'orange';

export interface ThemeOptions extends BaseThemeOptions {
  accentColor?: string;
  accentColorForeground?: string;
}
