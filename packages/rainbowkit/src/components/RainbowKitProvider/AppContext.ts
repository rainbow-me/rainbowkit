import { createContext, ReactNode } from 'react';

export type DisclaimerComponent = ({
  Link,
  Text,
}: {
  Text: ({ children }: { children: ReactNode }) => JSX.Element;
  Link: ({
    children,
    href,
  }: {
    children: ReactNode;
    href: string;
  }) => JSX.Element;
}) => ReactNode;

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
