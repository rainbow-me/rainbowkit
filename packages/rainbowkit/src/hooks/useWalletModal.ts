import type { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';
import type { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import type { Wallet } from '../utils/wallets';

export type WalletInterface = Omit<
  Web3ReactContextInterface<Web3Provider>,
  'activate' | 'deactivate' | 'library' | 'account' | 'active'
> & {
  provider: Web3Provider | undefined;
  address: string | undefined | null;
  state: {
    connect: (w: Wallet) => Promise<void>;
    disconnect: () => void;
    isConnected: boolean;
    isConnecting: boolean;
    setConnecting: Dispatch<boolean>;
  };
};

export interface UseWalletModalOptions {
  wallets: Wallet[];
}

export const useWalletModal = ({
  wallets,
}: UseWalletModalOptions): WalletInterface => {
  const {
    account: address,
    activate,
    active: isConnected,
    connector,
    deactivate,
    error,
    library: provider,
    setError,
    ...web3ReactProps
  } = useWeb3React<Web3Provider>();

  const isRejected = useRef(false);

  const isWC = (connector: AbstractConnector) =>
    'walletConnectProvider' in connector || 'walletLink' in connector;

  const connectToWallet = useCallback(
    async (connector: AbstractConnector) => {
      if (isWC(connector)) {
        // @ts-ignore if the connector is walletconnect and the user has already tried to connect, manually reset the connector
        connector.walletConnectProvider = undefined;
      }

      if (!isConnected && connector)
        try {
          await activate(connector, undefined, true);
        } catch (error) {
          setError(error as Error);

          if (
            error instanceof Error &&
            error.name === 'UserRejectedRequestError'
          ) {
            isRejected.current = true;
            localStorage.removeItem('rk-last-wallet');
          }
        }
    },
    [activate, isConnected, setError]
  );

  useEffect(() => {
    const walletName = localStorage.getItem('rk-last-wallet');
    const wallet = wallets.find(w => w.name === walletName);

    if (!isRejected.current && walletName && !!wallet) {
      connectToWallet(wallet?.connector);
    }
  }, []);

  const [isConnecting, setConnecting] = useState(false);

  const connect = async (c: Wallet) => {
    await connectToWallet(c.connector);

    if (!isRejected.current) {
      localStorage.setItem('rk-last-wallet', c.name);

      return setConnecting(false);
    }
  };

  const disconnect = () => {
    localStorage.removeItem('rk-last-wallet');
    deactivate();
    if (connector && isWC(connector)) {
      // @ts-ignore walletconnect connector needs to be closed manually, see: https://github.com/NoahZinsmeister/web3-react/issues?q=deactivate
      connector.close();
    }
  };

  return {
    address,
    error,
    provider,
    setError,
    state: { connect, disconnect, isConnected, isConnecting, setConnecting },
    ...web3ReactProps,
  };
};
