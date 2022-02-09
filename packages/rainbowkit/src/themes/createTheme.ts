import deepmerge from 'deepmerge';
import { ThemePartial, ThemeVars } from '../css/sprinkles.css';

export function createTheme(themeValues: ThemeVars) {
  return function theme(
    options: {
      overrides?: ThemePartial;
    } = {}
  ): ThemeVars {
    return options.overrides
      ? (deepmerge(themeValues, options.overrides) as ThemeVars)
      : themeValues;
  };
}
