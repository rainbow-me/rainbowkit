import deepmerge from 'deepmerge';
import { Theme, ThemePartial } from '../css/sprinkles.css';

export function createTheme(themeValues: Theme) {
  return function theme(
    options: {
      overrides?: ThemePartial;
    } = {}
  ): Theme {
    return options.overrides
      ? (deepmerge(themeValues, options.overrides) as Theme)
      : themeValues;
  };
}
