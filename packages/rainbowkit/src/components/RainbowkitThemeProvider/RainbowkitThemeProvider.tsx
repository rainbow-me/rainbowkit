import React, { ReactNode } from 'react';
import { cssStringFromTheme } from '../../css/cssStringFromTheme';
import { Theme } from '../../css/sprinkles.css';

export interface RainbowkitThemeProviderProps {
  id?: string;
  children: ReactNode;
  theme: Theme | (() => Theme);
  darkModeTheme?: Theme | (() => Theme);
}

export function RainbowkitThemeProvider({
  children,
  darkModeTheme,
  id,
  theme,
}: RainbowkitThemeProviderProps) {
  const selector = id ? `[data-rk-id="${id}"]` : '[data-rk]';

  const themeCss = `${selector}{${cssStringFromTheme(theme)}}`;
  const darkModeThemeCss = darkModeTheme
    ? `@media(prefers-color-scheme:dark){${selector}{${cssStringFromTheme(
        darkModeTheme
      )}}}`
    : null;

  return (
    <div {...(id ? { 'data-rk-id': id } : { 'data-rk': '' })}>
      <style>
        {themeCss}
        {darkModeThemeCss}
      </style>
      {children}
    </div>
  );
}
