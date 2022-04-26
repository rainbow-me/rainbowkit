import {
  AccentColor,
  AccentColorPreset,
  baseTheme,
  ThemeOptions,
} from './baseTheme';

const accentColorPresets: Record<AccentColorPreset, AccentColor> = {
  blue: { color: '#3898FF', foregroundTextColor: '#FFF' },
  green: { color: '#4BD166', foregroundTextColor: '#000' },
  orange: { color: '#FF983D', foregroundTextColor: '#000' },
  pink: { color: '#FF7AB8', foregroundTextColor: '#000' },
  purple: { color: '#7A70FF', foregroundTextColor: '#FFF' },
  red: { color: '#FF6257', foregroundTextColor: '#FFF' },
};

export const midnightTheme = ({
  accentColor: accentColorProp = 'blue',
  ...baseThemeOptions
}: ThemeOptions = {}) => {
  const accentColor =
    typeof accentColorProp === 'string'
      ? accentColorPresets[accentColorProp]
      : accentColorProp;

  return {
    ...baseTheme(baseThemeOptions),
    borders: {
      modalBorderWidth: '1px',
    },
    colors: {
      accentColor: accentColor.color,
      accentColorForegroundText: accentColor.foregroundTextColor,
      actionButtonBorder: 'rgba(255, 255, 255, 0.04)',
      actionButtonBorderMobile: 'rgba(0, 0, 0, 0)',
      actionButtonSecondaryBackground: 'rgba(255, 255, 255, 0.08)',
      closeButton: 'rgba(255, 255, 255, 0.7)',
      closeButtonBackground: 'rgba(255, 255, 255, 0.08)',
      connectButtonBackground: '#000',
      connectButtonBackgroundError: '#FF494A',
      connectButtonInnerBackground:
        'linear-gradient(0deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.12))',
      connectButtonText: '#FFF',
      connectButtonTextError: '#FFF',
      connectionIndicator: '#30E000',
      error: '#FF494A',
      generalBorder: 'rgba(255, 255, 255, 0.08)',
      generalBorderDim: 'rgba(255, 255, 255, 0.04)',
      menuItemBackground: 'rgba(255, 255, 255, 0.08)',
      modalBackdrop: 'rgba(0, 0, 0, 0.7)',
      modalBackground: '#000',
      modalBorder: 'rgba(255, 255, 255, 0.08)',
      modalText: '#FFF',
      modalTextDim: 'rgba(255, 255, 255, 0.2)',
      modalTextSecondary: 'rgba(255, 255, 255, 0.6)',
      profileAction: 'rgba(255, 255, 255, 0.1)',
      profileActionHover: 'rgba(255, 255, 255, 0.2)',
      profileForeground: 'rgba(255, 255, 255, 0.06)',
      selectedOptionBorder: 'rgba(224, 232, 255, 0.1)',
      standby: '#FFD641',
    },
    shadows: {
      connectButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
      profileDetailsAction: '0px 2px 6px rgba(37, 41, 46, 0.04)',
      selectedOption: '0px 2px 6px rgba(0, 0, 0, 0.24)',
      selectedWallet: '0px 2px 6px rgba(0, 0, 0, 0.24)',
      walletLogo: '0px 2px 16px rgba(0, 0, 0, 0.16)',
    },
  };
};
