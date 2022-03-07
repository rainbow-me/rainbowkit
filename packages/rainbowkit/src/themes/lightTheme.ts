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
  colors: {
    accentColor: accents[accentColor],
    buttonBorder: 'rgba(0, 0, 0, 0.04)',
    buttonSecondaryBackground: 'rgba(0, 0, 0, 0.06)',
    buttonText: '#FFF',
    connectButtonBackground: '#FFFFFF',
    connectButtonBackgroundError: '#FF494A',
    connectButtonInnerBackground:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.06))',
    connectButtonText: '#25292E',
    connectButtonTextError: 'white',
    connectionIndicator: '#2CCC00',
    error: '#FF494A',
    menuBackground: '#fff',
    menuItemActiveBackground: 'rgba(196, 196, 196, 0.2)',
    menuItemBackground: 'rgba(196, 196, 196, 0.1)',
    menuText: '#25292E',
    menuTextAction: '#4892FE',
    menuTextDisconnect: '#FF494A',
    menuTextSecondary: '#A3A4A5',
    modalBackdrop: 'rgba(0, 0, 0, 0.3)',
    modalBackground: '#fff',
    modalBorder: 'rgba(0, 0, 0, 0.06)',
    modalClose: 'rgba(0, 0, 0, 0.6)',
    modalCloseBackground: 'rgba(0, 0, 0, 0.06)',
    modalText: '#25292E',
    modalTextSecondary: 'rgba(60, 66, 82, 0.6)',
    profileAction: '#FFFFFF',
    profileActionHover: 'rgba(255, 255, 255, 0.5)',
    profileForeground: 'rgba(60, 66, 66, 0.1)',
    selectedOptionBorder: 'rgba(60, 66, 66, 0.1)',
    standby: '#FFD641',
  },
  shadows: {
    connectButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
    menu: '0px 10px 30px rgba(0, 0, 0, 0.1)',
    selectedOption: '0px 2px 6px rgba(0, 0, 0, 0.24)',
  },
});
