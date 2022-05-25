import { createContext, ReactNode } from 'react';

export type TermsOfService = ({
  Link,
  Text,
}: {
  Text: any;
  Link: any;
}) => ReactNode;

export const defaultAppInfo = {
  appName: undefined,
  disclaimerUrl: undefined,
  termsOfService: undefined,
};

export const AppContext = createContext<{
  appName?: string;
  learnMoreUrl?: string;
  termsOfService?: TermsOfService;
}>(defaultAppInfo);
