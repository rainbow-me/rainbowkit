import { baseTheme } from './baseTheme';

export const lightTheme = () => ({
  ...baseTheme(),
  colors: {
    connectButtonBackground: '#FFFFFF',
    connectButtonBackgroundError: '#FF494A',
    connectButtonInnerBackground:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.06))',
    connectButtonText: '#25292E',
    connectButtonTextError: 'white',
    connectedProfileBorder: '#FF007A',
    connectionIndicator: '#2CCC00',
    error: '#FF494A',
    menuBackground: '#fff',
    menuDivider: 'rgba(0, 0, 0, .04)',
    menuItemActiveBackground: 'rgba(196, 196, 196, 0.2)',
    menuItemBackground: 'rgba(196, 196, 196, 0.1)',
    menuText: '#25292E',
    menuTextAction: '#4892FE',
    menuTextDisconnect: '#FF494A',
    menuTextSecondary: '#A3A4A5',
    modalBackdrop: 'rgba(0, 0, 0, 0.3)',
    modalBackground: '#fff',
    modalClose: 'rgba(60, 66, 82, 0.06)',
    modalText: '#25292E',
    modalTextSecondary: 'rgba(60, 66, 82, 0.6)',
  },
  shadows: {
    connectButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    menu: '0px 10px 30px rgba(0, 0, 0, 0.1)',
  },
});
