import { AccentValues, baseTheme, ThemeOptions } from './baseTheme';

const accents: Record<AccentValues, string> = {
  blue: '#3898FF',
  green: '#4BD166',
  orange: '#FF983D',
  pink: '#FF7AB8',
  purple: '#7A70FF',
  red: '#FF6257',
  yellow: '#FFDF3D',
};

export const midnightTheme = ({
  accentColor = 'blue',
  ...baseThemeOptions
}: ThemeOptions = {}) => ({
  ...baseTheme(baseThemeOptions),
  borders: {
    modalBorderWidth: '1px',
  },
  colors: {
    accentColor: accents[accentColor],
    actionButtonBorder: 'rgba(255, 255, 255, 0.04)',
    actionButtonBorderMobile: 'rgba(0, 0, 0, 0)',
    actionButtonSecondaryBackground: 'rgba(255, 255, 255, 0.08)',
    actionButtonText: '#FFF',
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
});
