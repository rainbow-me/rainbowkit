import { InjectedConnector } from '@wagmi/core';
import {
  CHAIN_NAMESPACES,
  CustomChainConfig,
  WEB3AUTH_NETWORK_TYPE,
} from '@web3auth/base';
import { Web3AuthMPCCoreKit } from '@web3auth/mpc-core-kit';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { RainbowKitEmailWallet } from '../../../connectors/RainbowKitEmailWallet';
import { Wallet } from '../../Wallet';

export interface EmailWalletOptions {
  chains: Chain[];
  clientId: string;
  network: WEB3AUTH_NETWORK_TYPE;
}

export const emailWallet = ({
  chains,
  clientId,
  network,
}: EmailWalletOptions): Wallet => {
  // Create Web3Auth Instance
  const chainConfig: CustomChainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: `0x${chains[0].id.toString(16)}`,
    rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorer: chains[0].blockExplorers?.default.url[0] ?? '',
  };

  const coreKitInstance =
    typeof window !== 'undefined'
      ? new Web3AuthMPCCoreKit({
          web3AuthClientId: clientId ?? '',
          web3AuthNetwork: network as any,
          chainConfig,
        })
      : undefined;

  return {
    id: 'email',
    name: 'Email Wallet',
    iconUrl: async () => (await import('./emailWallet.svg')).default,
    iconBackground: '#000000',
    installed: true,
    createConnector: () => ({
      connector: coreKitInstance
        ? new RainbowKitEmailWallet({
            chains,
            options: {
              web3AuthInstance: coreKitInstance,
            },
          })
        : new InjectedConnector({ chains }),
    }),
  };
};
