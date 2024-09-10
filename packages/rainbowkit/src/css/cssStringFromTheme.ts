import { cssObjectFromTheme } from './cssObjectFromTheme';
import type { ThemeVars } from './sprinkles.css';

export function cssStringFromTheme(
  theme: ThemeVars | (() => ThemeVars),
  options: { extends?: ThemeVars | (() => ThemeVars) } = {},
) {
  return Object.entries(cssObjectFromTheme(theme, options))
    .map(([key, value]) => `${key}:${value.replace(/[:;{}</>]/g, '')};`)
    .join('');
}
