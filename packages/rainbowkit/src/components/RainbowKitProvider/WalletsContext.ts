import { createContext } from 'react';

export interface Wallet {
  id: string;
  name: string;
  iconUrl: string;
  connectorId: string;
}

export const WalletsContext = createContext<Wallet[]>([]);
