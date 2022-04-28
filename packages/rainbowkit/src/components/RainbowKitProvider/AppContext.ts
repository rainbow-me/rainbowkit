import { createContext } from 'react';

export const defaultAppInfo = {
  appName: undefined,
  learnMoreUrl: 'https://learn.rainbow.me/what-is-a-cryptoweb3-wallet-actually',
};

export const AppContext =
  createContext<{ learnMoreUrl?: string; appName?: string }>(defaultAppInfo);
