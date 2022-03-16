import { AccentValues, baseTheme, ThemeOptions } from './baseTheme';

const accents: Record<AccentValues, string> = {
  blue: '#1A85FF',
  green: '#3ddc84',
  pink: '#EA33AE',
  purple: '#575cff',
};

export const lightTheme = ({
  accentColor = 'blue',
  borderRadius,
}: ThemeOptions = {}) => ({
  ...baseTheme({ borderRadius }),
  borders: {
    modalBorderWidth: '0px',
  },
  colors: {
    accentColor: accents[accentColor],
    actionButtonBorder: 'rgba(0, 0, 0, 0.04)',
    actionButtonSecondaryBackground: 'rgba(0, 0, 0, 0.06)',
    actionButtonText: '#FFF',
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
    menuItemBackground: 'rgba(60, 66, 66, 0.1)',
    modalBackdrop: 'rgba(0, 0, 0, 0.3)',
    modalBackground: '#FFF',
    modalBorder: 'rgba(255, 255, 255, 0)',
    modalText: '#25292E',
    modalTextDim: 'rgba(60, 66, 66, 0.3)',
    modalTextSecondary: 'rgba(60, 66, 66, 0.6)',
    profileAction: '#FFF',
    profileActionHover: 'rgba(255, 255, 255, 0.5)',
    profileForeground: 'rgba(60, 66, 66, 0.1)',
    selectedOptionBorder: 'rgba(60, 66, 66, 0.1)',
    standby: '#FFD641',
  },
  shadows: {
    connectButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
    profileDetailsAction: '0px 2px 6px rgba(37, 41, 46, 0.04)',
    selectedOption: '0px 2px 6px rgba(0, 0, 0, 0.24)',
    selectedWallet: '0px 2px 6px rgba(0, 0, 0, 0.12)',
  },
});
