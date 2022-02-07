import { createContext } from 'react';
import type { Connector } from 'wagmi';

export type ConnectorClass = new (...args: unknown[]) => Connector;

export interface Wallet {
  name: string;
  iconUrl: string;
  connectorClass: ConnectorClass;
}

export const WalletsContext = createContext<Wallet[]>([]);
