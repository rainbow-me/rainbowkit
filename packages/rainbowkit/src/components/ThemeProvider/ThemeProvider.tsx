import React, { createContext, ReactNode, useContext } from 'react';
import { cssStringFromTheme } from '../../css/cssStringFromTheme';
import { Theme } from '../../css/sprinkles.css';
import { lightTheme } from '../../themes/lightTheme';

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

export type ThemeProviderProps = {
  id?: string;
  children: ReactNode;
  theme?: Theme | (() => Theme);
  darkModeTheme?: Theme | (() => Theme);
} & (
  | {
      theme?: Theme | (() => Theme);
      darkModeTheme?: Theme | (() => Theme);
    }
  | {
      theme: null;
      darkModeTheme?: never;
    }
);

export function ThemeProvider({
  children,
  darkModeTheme,
  id,
  theme = lightTheme,
}: ThemeProviderProps) {
  const selector = createThemeRootSelector(id);

  if (!theme) {
    return (
      <ThemeIdContext.Provider value={id}>{children}</ThemeIdContext.Provider>
    );
  }

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
