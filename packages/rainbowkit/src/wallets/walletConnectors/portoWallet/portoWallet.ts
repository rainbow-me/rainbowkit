import { porto, type PortoParameters } from 'wagmi/connectors';
import type { Wallet, WalletDetailsParams, WalletFactory } from '../../Wallet';
import { createConnector } from 'wagmi';

export const portoWallet: WalletFactory<PortoParameters, 'porto'> = (
  parameters,
) => {
  return {
    id: 'porto' as const,
    name: 'Porto',
    shortName: 'Porto',
    rdns: 'xyz.ithaca.porto',
    iconUrl: async () => (await import('./portoWallet.svg')).default,
    iconAccent: '#2E7CF6',
    iconBackground: '#2E7CF6',
    installed: true,
    createConnector: (walletDetails: WalletDetailsParams) =>
      createConnector((config) => ({
        ...porto(parameters)(config),
        ...walletDetails,
      })),
  } satisfies Wallet;
};
