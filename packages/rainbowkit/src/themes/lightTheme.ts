import { baseTheme } from './baseTheme';
import { createTheme } from './createTheme';

export const lightTheme = createTheme({
  ...baseTheme,
  colors: {
    connectButtonBackground:
      'linear-gradient(176.73deg, #FFFFFF 2.7%, rgba(255, 255, 255, 0.9) 97.31%)',
    connectButtonText: '#25292E',
    connectionIndicator: '#2CCC00',
    dropdownButtonBackground:
      'linear-gradient(176.73deg, #FFFFFF 2.7%, rgba(255, 255, 255, 0.9) 97.31%)',
    dropdownButtonText: '#25292E',
    error: '#FF494A',
    menuBackground: '#fff',
    menuDivider: 'rgba(0, 0, 0, .04)',
    menuItemSelectedBackground: 'rgba(196, 196, 196, 0.1)',
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
    dropdownButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    menu: '0px 10px 30px rgba(0, 0, 0, 0.1)',
    networkButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
});
