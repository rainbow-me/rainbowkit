import React, { createContext, ReactNode } from 'react';

export type DisclaimerComponent = React.FunctionComponent<{
  Text: React.FunctionComponent<{ children: ReactNode }>;
  Link: React.FunctionComponent<{ children: ReactNode; href: string }>;
}>;

export const defaultAppInfo = {
  appName: undefined,
  disclaimer: undefined,
  learnMoreUrl: 'https://learn.rainbow.me/what-is-a-cryptoweb3-wallet-actually',
};

export const AppContext = createContext<{
  appName?: string;
  learnMoreUrl?: string;
  disclaimer?: DisclaimerComponent;
}>(defaultAppInfo);
