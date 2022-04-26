import {
  AccentColor,
  AccentColorPreset,
  baseTheme,
  ThemeOptions,
} from './baseTheme';

const accentColorPresets: Record<AccentColorPreset, AccentColor> = {
  blue: { color: '#0E76FD', foregroundTextColor: '#FFF' },
  green: { color: '#1DB847', foregroundTextColor: '#FFF' },
  orange: { color: '#FF801F', foregroundTextColor: '#FFF' },
  pink: { color: '#FF5CA0', foregroundTextColor: '#FFF' },
  purple: { color: '#5F5AFA', foregroundTextColor: '#FFF' },
  red: { color: '#FA423C', foregroundTextColor: '#FFF' },
};

export const lightTheme = ({
  accentColor: accentColorProp = 'blue',
  ...baseThemeOptions
}: ThemeOptions = {}) => {
  const accentColor =
    typeof accentColorProp === 'string'
      ? accentColorPresets[accentColorProp]
      : accentColorProp;

  return {
    ...baseTheme(baseThemeOptions),
    colors: {
      accentColor: accentColor.color,
      accentColorForegroundText: accentColor.foregroundTextColor,
      actionButtonBorder: 'rgba(0, 0, 0, 0.04)',
      actionButtonBorderMobile: 'rgba(0, 0, 0, 0)',
      actionButtonSecondaryBackground: 'rgba(0, 0, 0, 0.06)',
      closeButton: 'rgba(60, 66, 66, 0.8)',
      closeButtonBackground: 'rgba(0, 0, 0, 0.06)',
      connectButtonBackground: '#FFF',
      connectButtonBackgroundError: '#FF494A',
      connectButtonInnerBackground:
        'linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.06))',
      connectButtonText: '#25292E',
      connectButtonTextError: '#FFF',
      connectionIndicator: '#30E000',
      error: '#FF494A',
      generalBorder: 'rgba(0, 0, 0, 0.06)',
      generalBorderDim: 'rgba(0, 0, 0, 0.03)',
      menuItemBackground: 'rgba(60, 66, 66, 0.1)',
      modalBackdrop: 'rgba(0, 0, 0, 0.3)',
      modalBackground: '#FFF',
      modalBorder: 'transparent',
      modalText: '#25292E',
      modalTextDim: 'rgba(60, 66, 66, 0.3)',
      modalTextSecondary: 'rgba(60, 66, 66, 0.6)',
      profileAction: '#FFF',
      profileActionHover: 'rgba(255, 255, 255, 0.5)',
      profileForeground: 'rgba(60, 66, 66, 0.06)',
      selectedOptionBorder: 'rgba(60, 66, 66, 0.1)',
      standby: '#FFD641',
    },
    shadows: {
      connectButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
      profileDetailsAction: '0px 2px 6px rgba(37, 41, 46, 0.04)',
      selectedOption: '0px 2px 6px rgba(0, 0, 0, 0.24)',
      selectedWallet: '0px 2px 6px rgba(0, 0, 0, 0.12)',
      walletLogo: '0px 2px 16px rgba(0, 0, 0, 0.16)',
    },
  };
};
