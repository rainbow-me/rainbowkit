import React from 'react';
import {
  ThemeProvider,
  ThemeProviderProps,
} from '../ThemeProvider/ThemeProvider';

export type RainbowKitProviderProps = ThemeProviderProps;

export function RainbowKitProvider(props: RainbowKitProviderProps) {
  return <ThemeProvider {...props} />;
}
