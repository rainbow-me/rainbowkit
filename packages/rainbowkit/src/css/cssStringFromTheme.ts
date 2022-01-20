import { cssObjectFromTheme } from './cssObjectFromTheme';
import { Theme } from './sprinkles.css';

export function cssStringFromTheme(theme: Theme | (() => Theme)) {
  return Object.entries(cssObjectFromTheme(theme))
    .map(([key, value]) => `${key}:${value};`)
    .join('');
}
