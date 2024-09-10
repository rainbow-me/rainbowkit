import type React from 'react';
import { type ReactNode, createContext } from 'react';

export type DisclaimerComponent = React.FunctionComponent<{
  Text: React.FunctionComponent<{ children: ReactNode }>;
  Link: React.FunctionComponent<{ children: ReactNode; href: string }>;
}>;

export const defaultAppInfo = {
  appName: undefined,
  disclaimer: undefined,
  learnMoreUrl:
    'https://learn.rainbow.me/understanding-web3?utm_source=rainbowkit&utm_campaign=learnmore',
};

export const AppContext = createContext<{
  appName?: string;
  learnMoreUrl?: string;
  disclaimer?: DisclaimerComponent;
}>(defaultAppInfo);
