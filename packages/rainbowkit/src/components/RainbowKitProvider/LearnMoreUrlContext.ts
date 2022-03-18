import { createContext } from 'react';

export const defaultLearnMoreUrl =
  'https://learn.rainbow.me/what-is-a-cryptoweb3-wallet-actually';

export const LearnMoreUrlContext = createContext<string>(defaultLearnMoreUrl);
