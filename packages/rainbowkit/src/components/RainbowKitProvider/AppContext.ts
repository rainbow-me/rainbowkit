import { createContext } from 'react';

export interface TermsOfService {
  url?: string;
  disclaimerUrl?: string;
}
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
