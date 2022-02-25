import { AccentValues, baseTheme, ThemeOptions } from './baseTheme';

const accents: Record<AccentValues, string> = {
  blue: '#1A85FF',
  green: '#3ddc84',
  pink: '#EA33AE',
  purple: '#575cff',
};

export const darkTheme = ({
  accentColor = 'blue',
  borderRadius,
}: ThemeOptions = {}) => ({
  ...baseTheme({ borderRadius }),
  colors: {
    accentColor: accents[accentColor],
    buttonText: '#FFF',
    connectButtonBackground: '#000',
    connectButtonBackgroundError: '#FF494A',
    connectButtonInnerBackground:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.12))',
    connectButtonText: 'white',
    connectButtonTextError: 'white',
    connectedProfileBorder: '#FF007A',
    connectionIndicator: '#30E000',
    error: '#FF494A',
    menuBackground: '#000',
    menuDivider: 'rgba(255, 255, 255, .04)',
    menuItemActiveBackground: 'rgba(196, 196, 196, 0.2)',
    menuItemBackground: 'rgba(196, 196, 196, 0.1)',
    menuText: 'white',
    menuTextAction: '#4892FE',
    menuTextDisconnect: '#FF494A',
    menuTextSecondary: '#A3A4A5',
    modalBackdrop:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))',
    modalBackground: '#000',
    modalClose: 'rgba(255, 255, 255, 0.08)',
    modalText: '#fff',
    modalTextSecondary: 'rgba(255, 255, 255, 0.6)',
  },
  shadows: {
    connectButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    menu: '0px 10px 30px rgba(0, 0, 0, 0.1)',
  },
});
