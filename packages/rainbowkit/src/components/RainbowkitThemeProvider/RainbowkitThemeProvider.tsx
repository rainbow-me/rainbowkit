import React, { ReactNode } from 'react'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { themeVars, Theme } from '../../css/sprinkles.css'

export function RainbowkitThemeProvider({
  children,
  theme
}: {
  children: ReactNode | ((style: Record<string, string>) => ReactNode)
  theme: Theme | (() => Theme)
}) {
  const style = assignInlineVars(themeVars, typeof theme === 'function' ? theme() : theme)

  return typeof children === 'function' ? children(style) : <div style={style}>{children}</div>
}
