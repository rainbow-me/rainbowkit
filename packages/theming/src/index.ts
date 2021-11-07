import { createTheming } from '@callstack/react-theme-provider'
import { css } from '@linaria/core'
import type { LinariaClassName as CSS } from '@linaria/core/types/index'

export type RainbowKitTheme = Partial<{
  fonts: {
    ui: string
  }
  background: string
  foreground: string
  fontWeights: Partial<{
    thin: number
    extraLight: number
    light: number
    medium: number
    semiBold: number
    bold: number
    black: number
  }> & {
    normal: number
    extraBold: 800
  }
  components: Partial<{
    NetworkSelect: Partial<{
      list: CSS
      current: CSS
      active: CSS
      option: CSS
      indicator: CSS
    }>
    EmojiIcon: CSS
    EthAddress: Partial<{
      profileIcon: CSS
    }>
    WalletDropdown: Partial<{
      menu: CSS
      disconnect: CSS
    }>
    Pill: CSS
  }>
}>

const common = css`
  backdrop-filter: 20px;
  border-radius: 16px;
`

export const rainbowTheme: RainbowKitTheme = {
  fonts: {
    ui: 'SFProRounded, ui-rounded, sans-serif'
  },
  background: 'linear-gradient(179.83deg, rgba(26, 27, 31, 0.8) 0.15%, #1a1b1f 99.85%)', // used if [Component].background isn't set
  foreground: '#e9f2ff',
  fontWeights: {
    thin: 100,
    extraLight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900
  },
  components: {
    NetworkSelect: {
      list: common,
      current: common,
      active: css`
        background: rgba(255, 255, 255, 0.06);
      `,
      option: css`
        border-radius: 12px;
        backdrop-filter: 20px;
      `,
      indicator: css`
        background: #2ccc00;
      `
    },
    EmojiIcon: css`
      font-size: 0.8em;
      height: 1.8em;
      width: 1.8em;
    `,
    Pill: css`
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
      backdrop-filter: 20px;
      border-radius: 16px;
    `,
    EthAddress: {
      profileIcon: css`
        height: 1.5em;
        width: 1.5em;
      `
    },
    WalletDropdown: {
      menu: css`
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: 20px;
      `,
      disconnect: css`
        color: #ff494a;
      `
    }
  }
}

export const { ThemeProvider, useTheme, withTheme } = createTheming<RainbowKitTheme>(rainbowTheme)
