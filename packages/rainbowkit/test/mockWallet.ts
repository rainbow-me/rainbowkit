import type { Address } from 'viem';
import { createConnector } from 'wagmi';
import { mock } from 'wagmi/connectors';
import type { Wallet, WalletDetailsParams } from '../src/wallets/Wallet';

export const mockedAccounts: readonly [Address, ...Address[]] = [
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
];

export const mockWallet = (id: string, name: string) => {
  return (): Wallet => ({
    id,
    name,
    iconBackground: '#fff',
    iconUrl: '',
    installed: true,
    createConnector: (walletDetails: WalletDetailsParams) => {
      return createConnector((config) => ({
        ...mock({
          accounts: mockedAccounts,
        })(config),
        id,
        name,
        ...walletDetails,
      }));
    },
  });
};
