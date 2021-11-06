import { createTheming } from '@callstack/react-theme-provider'
import { CSSProperties } from '@linaria/core'

export type RainbowKitTheme = Partial<{
  fonts: {
    ui: string
  }
  background: string
  foreground: string
  components: Partial<{
    NetworkSelect: Partial<{
      list: CSSProperties
      current: CSSProperties
      active: CSSProperties
      option: CSSProperties
      indicator: CSSProperties
    }>
    EmojiIcon: CSSProperties
    EthAddress: Partial<{
      profileIcon: CSSProperties
      address: CSSProperties
    }>
    WalletDropdown: Partial<{
      menu: CSSProperties
      menuItem: CSSProperties
      disconnect: CSSProperties
    }>
    Pill: CSSProperties
  }>
}>

export const rainbowTheme: RainbowKitTheme = {
  fonts: {
    ui: 'SFProRounded, ui-rounded, sans-serif'
  },
  background: 'linear-gradient(179.83deg, rgba(26, 27, 31, 0.8) 0.15%, #1a1b1f 99.85%)', // used if [Component].background isn't set
  foreground: '#e9f2ff',
  components: {
    NetworkSelect: {
      list: {
        backdropFilter: '20px',
        borderRadius: '16px',
        fontWeight: 800
      },
      current: {
        backdropFilter: '20px',
        borderRadius: '16px'
      },
      active: {
        background: 'rgba(255, 255, 255, 0.06)'
      },
      option: {
        borderRadius: '12px',
        backdropFilter: '20px'
      },
      indicator: {
        background: '#2ccc00'
      }
    },
    EmojiIcon: {
      fontSize: '0.8em',
      height: '1.8em',
      width: '1.8em'
    },
    Pill: {
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      backdropFilter: '20px',
      borderRadius: '16px',
      fontWeight: 800
    },
    EthAddress: {
      profileIcon: {
        height: '1.5em',
        width: '1.5em'
      },
      address: {
        fontWeight: 800
      }
    },
    WalletDropdown: {
      menu: {
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: '20px'
      },
      disconnect: {
        color: '#ff494a'
      }
    }
  }
}

export const { ThemeProvider, useTheme, withTheme } = createTheming<RainbowKitTheme>(rainbowTheme)
