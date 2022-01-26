import React, { createContext, ReactNode, useContext } from 'react';
import { cssStringFromTheme } from '../../css/cssStringFromTheme';
import { Theme } from '../../css/sprinkles.css';

const ThemeIdContext = createContext<string | undefined>(undefined);

const anonymousDataAttribute = 'data-rk';
const idDataAttribute = 'data-rk-id';

const createThemeRootProps = (id: string | undefined) =>
  id ? { [idDataAttribute]: id } : { [anonymousDataAttribute]: '' };

const createThemeRootSelector = (id: string | undefined) =>
  id ? `[${idDataAttribute}="${id}"]` : `[${anonymousDataAttribute}]`;

export const useThemeRootProps = () => {
  const id = useContext(ThemeIdContext);
  return createThemeRootProps(id);
};

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
  const selector = createThemeRootSelector(id);

  const themeCss = `${selector}{${cssStringFromTheme(theme)}}`;
  const darkModeThemeCss = darkModeTheme
    ? `@media(prefers-color-scheme:dark){${selector}{${cssStringFromTheme(
        darkModeTheme,
        { extends: theme }
      )}}}`
    : null;

  return (
    <ThemeIdContext.Provider value={id}>
      <div {...createThemeRootProps(id)}>
        <style>
          {themeCss}
          {darkModeThemeCss}
        </style>
        {children}
      </div>
    </ThemeIdContext.Provider>
  );
}
