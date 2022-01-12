import React, { ReactNode } from 'react'
import { Theme } from '../../css/sprinkles.css'
import { cssStringFromTheme } from '../../css/cssStringFromTheme'

export function RainbowkitThemeProvider({
  id,
  children,
  theme,
  darkModeTheme
}: {
  id?: string
  children: ReactNode
  theme: Theme | (() => Theme)
  darkModeTheme?: Theme | (() => Theme)
}) {
  const selector = id ? `[data-rk-id="${id}"]` : '[data-rk]'

  const themeCss = `${selector}{${cssStringFromTheme(theme)}}`
  const darkModeThemeCss = darkModeTheme
    ? `@media(prefers-color-scheme:dark){${selector}{${cssStringFromTheme(darkModeTheme)}}}`
    : null

  return (
    <div {...(id ? { 'data-rk-id': id } : { 'data-rk': '' })}>
      <style>
        {themeCss}
        {darkModeThemeCss}
      </style>
      {children}
    </div>
  )
}
