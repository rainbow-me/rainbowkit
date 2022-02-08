import { baseTheme } from './baseTheme';
import { createTheme } from './createTheme';

export const dimTheme = createTheme({
  ...baseTheme,
  colors: {
    connectButtonBackground: '#1A1B1F',
    connectButtonInnerBackground:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.15))',
    connectButtonText: 'white',
    connectedProfileBorder: '#FF007A',
    connectionIndicator: '#30E000',
    error: '#FF494A',
    menuBackground: '#1A1B1F',
    menuDivider: 'rgba(255, 255, 255, .04)',
    menuItemSelectedBackground: 'rgba(196, 196, 196, 0.1)',
    menuText: 'white',
    menuTextAction: '#4892FE',
    menuTextDisconnect: '#FF494A',
    menuTextSecondary: '#A3A4A5',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    modalBackground: '#1A1B1F',
    modalClose: 'rgba(255, 255, 255, 0.06)',
    modalText: '#fff',
    modalTextSecondary: 'rgba(255, 255, 255, 0.6)',
  },
  shadows: {
    connectButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    menu: '0px 10px 30px rgba(0, 0, 0, 0.1)',
  },
});
