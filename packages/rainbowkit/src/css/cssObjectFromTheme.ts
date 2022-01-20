import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Theme, themeVars } from './sprinkles.css';

export function cssObjectFromTheme(theme: Theme | (() => Theme)) {
  return {
    // We use an object spread here to ensure it's a plain object since vanilla-extract's
    // var objects have a custom 'toString' method that returns a CSS string, but we don't
    // want to leak this to our consumers since they're unaware we're using vanilla-extract.
    // Instead, we want them to handle this explicitly via our 'cssStringFromTheme' function.
    ...assignInlineVars(
      themeVars,
      typeof theme === 'function' ? theme() : theme
    ),
  };
}
