import { assignInlineVars } from '@vanilla-extract/dynamic';
import { type ThemeVars, themeVars } from './sprinkles.css';

const resolveThemeVars = (theme: ThemeVars | (() => ThemeVars)) =>
  typeof theme === 'function' ? theme() : theme;

export function cssObjectFromTheme(
  theme: ThemeVars | (() => ThemeVars),
  { extends: baseTheme }: { extends?: ThemeVars | (() => ThemeVars) } = {},
) {
  const resolvedThemeVars = {
    // We use an object spread here to ensure it's a plain object since vanilla-extract's
    // var objects have a custom 'toString' method that returns a CSS string, but we don't
    // want to leak this to our consumers since they're unaware we're using vanilla-extract.
    // Instead, we want them to handle this explicitly via our 'cssStringFromTheme' function.
    ...assignInlineVars(themeVars, resolveThemeVars(theme)),
  };

  if (!baseTheme) {
    return resolvedThemeVars;
  }

  const resolvedBaseThemeVars = assignInlineVars(
    themeVars,
    resolveThemeVars(baseTheme),
  );

  const filteredVars = Object.fromEntries(
    Object.entries(resolvedThemeVars).filter(
      ([varName, value]) => value !== resolvedBaseThemeVars[varName],
    ),
  );

  return filteredVars;
}
