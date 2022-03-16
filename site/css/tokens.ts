/* eslint-disable sort-keys-fix/sort-keys-fix */
const colors = {
  black100: 'black',

  white10: '#1B1C1E',
  white20: 'rgba(245, 248, 255, 0.12)',
  white30: 'rgba(245, 248, 255, 0.16)',
  white40: 'rgba(245, 248, 255, 0.2)',
  white50: 'rgba(245, 248, 255, 0.28)',
  white60: 'rgba(245, 248, 255, 0.4)',
  white70: 'rgba(245, 248, 255, 0.56)',
  white80: 'rgba(245, 248, 255, 0.76)',
  white90: 'rgba(247, 250, 255, 0.92)',
  white100: 'white',

  gray10: '#F0F1F5',
  gray20: 'rgba(9, 17, 31, 0.06)',
  gray30: 'rgba(16, 21, 31, 0.1)',
  gray40: 'rgba(16, 21, 31, 0.16)',
  gray50: 'rgba(22, 25, 31, 0.24)',
  gray60: 'rgba(26, 28, 31, 0.36)',
  gray70: 'rgba(27, 29, 31, 0.5)',
  gray80: 'rgba(27, 29, 31, 0.7)',
  gray90: 'rgba(27, 29, 31, 0.88)',
  gray100: 'rgba(0, 0, 0, 1)',

  blueGray10: '#F0F1F5',
  blueGray20: '#E6E9F0',
  blueGray30: '#DADEE5',
  blueGray40: '#CAD0D9',
  blueGray50: '#AFB9C7',
  blueGray60: '#929EAD',
  blueGray70: '#78828F',
  blueGray80: '#5F6670',
  blueGray90: '#3C4047',
  blueGray100: '#242529',
};

export const tokens = {
  colors: {
    light: {
      accent: colors.white100,

      label: colors.gray100,
      labelSecondary: colors.gray80,
      labelTertiary: colors.gray70,
      labelQuaternary: colors.gray60,

      fill: colors.gray30,
      fillSecondary: colors.gray20,
      fillElevated: colors.white100,

      background: colors.white100,
      backgroundElevated: `${colors.blueGray10}99`,
    },
    dark: {
      accent: colors.black100,

      label: colors.white100,
      labelSecondary: colors.white80,
      labelTertiary: colors.white70,
      labelQuaternary: colors.white60,

      fill: colors.white30,
      fillSecondary: colors.white20,
      fillElevated: colors.blueGray100,

      background: colors.black100,
      backgroundElevated: colors.white10,
    },
  },
  fonts: {
    normal:
      'SFRounded, ui-rounded, SF Pro Rounded, system-ui, Helvetica Neue, Arial, Helvetica, sans-serif',
    mono: 'SFMono, ui-monospace, monospace',
  },
  space: {
    1: '2px',
    2: '4px',
    3: '8px',
    4: '12px',
    5: '16px',
    6: '20px',
    7: '24px',
    8: '28px',
    9: '32px',
    10: '40px',
    11: '64px',
  },
  radii: {
    1: '3px',
    2: '6px',
    3: '12px',
    4: '14px',
    5: '16px',
    6: '20px',
    7: '24px',
    round: '9999px',
  },
};

export type Mode = 'light' | 'dark';
export type Tokens = typeof tokens;
