import { createContext } from 'react';

export const defaultAppInfo = {
  appName: undefined,
  learnMoreUrl: 'https://learn.rainbow.me/what-is-a-cryptoweb3-wallet-actually',
  termsOfServiceUrl: undefined,
};

export const AppContext = createContext<{
  appName?: string;
  learnMoreUrl?: string;
  termsOfServiceUrl?: string;
}>(defaultAppInfo);
