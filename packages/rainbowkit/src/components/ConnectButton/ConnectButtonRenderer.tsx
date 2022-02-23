import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { useIsMounted } from '../../hooks/useIsMounted';
import { AccountModal } from '../AccountModal/AccountModal';
import { ChainModal } from '../ChainModal/ChainModal';
import { ConnectModal } from '../ConnectModal/ConnectModal';
import { useChainIconUrlsById } from '../RainbowKitProvider/ChainIconsContext';
import { formatAddress } from './formatAddress';

const useBooleanState = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { setFalse, setTrue, value };
};

export interface ConnectButtonRendererProps {
  children: (renderProps: {
    account?: {
      address: string;
      balanceDecimals?: number;
      balanceFormatted?: string;
      balanceSymbol?: string;
      displayBalance?: string;
      displayName: string;
      ensAvatar?: string;
      ensName?: string;
    };
    chain?: {
      iconUrl?: string;
      id: number;
      name?: string;
      unsupported?: boolean;
    };
    openAccountModal: () => void;
    openChainModal: () => void;
    openConnectModal: () => void;
    accountModalOpen: boolean;
    chainModalOpen: boolean;
    connectModalOpen: boolean;
  }) => ReactNode;
}

export function ConnectButtonRenderer({
  children,
}: ConnectButtonRendererProps) {
  const isMounted = useIsMounted();

  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  const [{ data: balanceData }] = useBalance({
    addressOrName: accountData?.address,
  });

  const [{ data: networkData }, switchNetwork] = useNetwork();

  const chainIconUrlsById = useChainIconUrlsById();
  const chainIconUrl = networkData.chain
    ? chainIconUrlsById[networkData.chain.id] ?? undefined
    : undefined;

  const {
    setFalse: closeConnectModal,
    setTrue: openConnectModal,
    value: connectModalOpen,
  } = useBooleanState(false);

  const {
    setFalse: closeAccountModal,
    setTrue: openAccountModal,
    value: accountModalOpen,
  } = useBooleanState(false);

  const {
    setFalse: closeChainModal,
    setTrue: openChainModal,
    value: chainModalOpen,
  } = useBooleanState(false);

  const hasAccountData = Boolean(accountData);
  useEffect(() => {
    closeConnectModal();
    closeAccountModal();
    closeChainModal();
  }, [hasAccountData, closeConnectModal, closeAccountModal, closeChainModal]);

  if (!isMounted) {
    return null;
  }

  const displayBalance = balanceData
    ? `${Number(balanceData.formatted).toPrecision(3)} ${balanceData.symbol}`
    : undefined;

  return (
    <>
      {children({
        account: accountData
          ? {
              address: accountData.address,
              balanceDecimals: balanceData?.decimals,
              balanceFormatted: balanceData?.formatted,
              balanceSymbol: balanceData?.symbol,
              displayBalance,
              displayName:
                accountData.ens?.name ?? formatAddress(accountData.address),
              ensAvatar: accountData.ens?.avatar ?? undefined,
              ensName: accountData.ens?.name,
            }
          : undefined,
        accountModalOpen,
        chain: networkData?.chain
          ? {
              iconUrl: chainIconUrl,
              id: networkData.chain.id,
              name: networkData.chain.name,
              unsupported: networkData.chain.unsupported,
            }
          : undefined,
        chainModalOpen,
        connectModalOpen,
        openAccountModal,
        openChainModal,
        openConnectModal,
      })}

      <ConnectModal onClose={closeConnectModal} open={connectModalOpen} />
      <AccountModal
        accountData={accountData}
        balanceData={balanceData}
        networkData={networkData}
        onClose={closeAccountModal}
        onDisconnect={disconnect}
        open={accountModalOpen}
      />
      <ChainModal
        networkData={networkData}
        onClose={closeChainModal}
        onSwitchNetwork={switchNetwork}
        open={chainModalOpen}
      />
    </>
  );
}

ConnectButtonRenderer.displayName = 'ConnectButton.Custom';
