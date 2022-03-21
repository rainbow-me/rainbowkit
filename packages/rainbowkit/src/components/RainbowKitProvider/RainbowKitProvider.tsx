import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { cssStringFromTheme } from '../../css/cssStringFromTheme';
import { ThemeVars } from '../../css/sprinkles.css';
import { lightTheme } from '../../themes/lightTheme';
import { ChainIconsContext, ChainWithIconUrl } from './ChainIconsContext';
import {
  defaultLearnMoreUrl,
  LearnMoreUrlContext,
} from './LearnMoreUrlContext';
import { provideChainIconUrls } from './provideChainIconUrls';

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

export type Theme =
  | ThemeVars
  | {
      lightMode: ThemeVars;
      darkMode: ThemeVars;
    };

export interface RainbowKitProviderProps {
  chains: ChainWithIconUrl[];
  id?: string;
  children: ReactNode;
  theme?: Theme | null;
  learnMoreUrl?: string;
}

const defaultTheme = lightTheme();

export function RainbowKitProvider({
  chains,
  id,
  theme = defaultTheme,
  children,
  learnMoreUrl = defaultLearnMoreUrl,
}: RainbowKitProviderProps) {
  const chainsWithIconUrls = useMemo(
    () => provideChainIconUrls(chains),
    [chains]
  );

  if (typeof theme === 'function') {
    throw new Error(
      'A theme function was provided to the "theme" prop instead of a theme object. You must execute this function to get the resulting theme object.'
    );
  }

  const selector = createThemeRootSelector(id);

  return (
    <ChainIconsContext.Provider value={chainsWithIconUrls}>
      <LearnMoreUrlContext.Provider value={learnMoreUrl}>
        <ThemeIdContext.Provider value={id}>
          {theme ? (
            <div {...createThemeRootProps(id)}>
              <style>
                {[
                  `${selector}{${cssStringFromTheme(
                    'lightMode' in theme ? theme.lightMode : theme
                  )}}`,

                  'darkMode' in theme
                    ? `@media(prefers-color-scheme:dark){${selector}{${cssStringFromTheme(
                        theme.darkMode,
                        { extends: theme.lightMode }
                      )}}}`
                    : null,
                ].join('')}
              </style>
              {children}
            </div>
          ) : (
            children
          )}
        </ThemeIdContext.Provider>
      </LearnMoreUrlContext.Provider>
    </ChainIconsContext.Provider>
  );
}
