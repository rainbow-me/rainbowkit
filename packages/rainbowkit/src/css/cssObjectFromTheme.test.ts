import { describe, expect, it } from 'vitest';
import { lightTheme } from '../themes/lightTheme';
import { cssObjectFromTheme } from './cssObjectFromTheme';

describe('cssObjectFromTheme', () => {
  it('converts themes to CSS-in-JS objects', () => {
    expect(cssObjectFromTheme(lightTheme)).toMatchInlineSnapshot(`
      {
        "--rk-blurs-modalOverlay": "blur(0px)",
        "--rk-colors-accentColor": "#0E76FD",
        "--rk-colors-accentColorForeground": "#FFF",
        "--rk-colors-actionButtonBorder": "rgba(0, 0, 0, 0.04)",
        "--rk-colors-actionButtonBorderMobile": "rgba(0, 0, 0, 0.06)",
        "--rk-colors-actionButtonSecondaryBackground": "rgba(0, 0, 0, 0.06)",
        "--rk-colors-closeButton": "rgba(60, 66, 66, 0.8)",
        "--rk-colors-closeButtonBackground": "rgba(0, 0, 0, 0.06)",
        "--rk-colors-connectButtonBackground": "#FFF",
        "--rk-colors-connectButtonBackgroundError": "#FF494A",
        "--rk-colors-connectButtonInnerBackground": "linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.06))",
        "--rk-colors-connectButtonText": "#25292E",
        "--rk-colors-connectButtonTextError": "#FFF",
        "--rk-colors-connectionIndicator": "#30E000",
        "--rk-colors-downloadBottomCardBackground": "linear-gradient(126deg, rgba(255, 255, 255, 0) 9.49%, rgba(171, 171, 171, 0.04) 71.04%), #FFFFFF",
        "--rk-colors-downloadTopCardBackground": "linear-gradient(126deg, rgba(171, 171, 171, 0.2) 9.49%, rgba(255, 255, 255, 0) 71.04%), #FFFFFF",
        "--rk-colors-error": "#FF494A",
        "--rk-colors-generalBorder": "rgba(0, 0, 0, 0.06)",
        "--rk-colors-generalBorderDim": "rgba(0, 0, 0, 0.03)",
        "--rk-colors-menuItemBackground": "rgba(60, 66, 66, 0.1)",
        "--rk-colors-modalBackdrop": "rgba(0, 0, 0, 0.3)",
        "--rk-colors-modalBackground": "#FFF",
        "--rk-colors-modalBorder": "transparent",
        "--rk-colors-modalText": "#25292E",
        "--rk-colors-modalTextDim": "rgba(60, 66, 66, 0.3)",
        "--rk-colors-modalTextSecondary": "rgba(60, 66, 66, 0.6)",
        "--rk-colors-profileAction": "#FFF",
        "--rk-colors-profileActionHover": "rgba(255, 255, 255, 0.5)",
        "--rk-colors-profileForeground": "rgba(60, 66, 66, 0.06)",
        "--rk-colors-selectedOptionBorder": "rgba(60, 66, 66, 0.1)",
        "--rk-colors-standby": "#FFD641",
        "--rk-fonts-body": "SFRounded, ui-rounded, \\"SF Pro Rounded\\", -apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Roboto, Helvetica, Arial, sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\"",
        "--rk-radii-actionButton": "9999px",
        "--rk-radii-connectButton": "12px",
        "--rk-radii-menuButton": "12px",
        "--rk-radii-modal": "24px",
        "--rk-radii-modalMobile": "28px",
        "--rk-shadows-connectButton": "0px 4px 12px rgba(0, 0, 0, 0.1)",
        "--rk-shadows-dialog": "0px 8px 32px rgba(0, 0, 0, 0.32)",
        "--rk-shadows-profileDetailsAction": "0px 2px 6px rgba(37, 41, 46, 0.04)",
        "--rk-shadows-selectedOption": "0px 2px 6px rgba(0, 0, 0, 0.24)",
        "--rk-shadows-selectedWallet": "0px 2px 6px rgba(0, 0, 0, 0.12)",
        "--rk-shadows-walletLogo": "0px 2px 16px rgba(0, 0, 0, 0.16)",
      }
    `);
  });
});
