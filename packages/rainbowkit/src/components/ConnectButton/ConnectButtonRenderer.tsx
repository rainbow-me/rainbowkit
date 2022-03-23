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

  const { data: accountData, disconnect } = useAccount({
    ens: true,
  });

  const { data: balanceData } = useBalance({
    addressOrName: accountData?.address,
  });

  const { activeChain, chains, switchNetwork } = useNetwork();

  const chainIconUrlsById = useChainIconUrlsById();
  const chainIconUrl = activeChain?.id
    ? chainIconUrlsById[activeChain.id] ?? undefined
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
        // @ts-expect-error TODO(jxom): address should be required
        account: accountData
          ? {
              address: accountData.address,
              balanceDecimals: balanceData?.decimals,
              balanceFormatted: balanceData?.formatted,
              balanceSymbol: balanceData?.symbol,
              displayBalance,
              displayName:
                // @ts-expect-error TODO(jxom): address should be required
                accountData.ens?.name ?? formatAddress(accountData.address),
              ensAvatar: accountData.ens?.avatar ?? undefined,
              ensName: accountData.ens?.name,
            }
          : undefined,
        accountModalOpen,
        chain: activeChain
          ? {
              iconUrl: chainIconUrl,
              id: activeChain.id,
              name: activeChain.name,
              unsupported: activeChain.unsupported,
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
        onClose={closeAccountModal}
        onDisconnect={disconnect}
        open={accountModalOpen}
      />
      <ChainModal
        activeChain={activeChain}
        chains={chains}
        onClose={closeChainModal}
        onSwitchNetwork={switchNetwork}
        open={chainModalOpen}
      />
    </>
  );
}

ConnectButtonRenderer.displayName = 'ConnectButton.Custom';
