import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useRecentTransactions } from '../../transactions/useRecentTransactions';
import { isNotNullish } from '../../utils/isNotNullish';
import { useWalletConnectors } from '../../wallets/useWalletConnectors';
import { AccountModal } from '../AccountModal/AccountModal';
import { loadImages, useAsyncImage } from '../AsyncImage/useAsyncImage';
import { ChainModal } from '../ChainModal/ChainModal';
import { ConnectModal } from '../ConnectModal/ConnectModal';
import {
  useRainbowKitChains,
  useRainbowKitChainsById,
} from '../RainbowKitProvider/RainbowKitChainContext';
import { ShowRecentTransactionsContext } from '../RainbowKitProvider/ShowRecentTransactionsContext';
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
      hasPendingTransactions: boolean;
    };
    chain?: {
      hasIcon: boolean;
      iconUrl?: string;
      iconBackground?: string;
      id: number;
      name?: string;
      unsupported?: boolean;
    };
    mounted: boolean;
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
  const mounted = useIsMounted();

  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  const [{ data: balanceData }] = useBalance({
    addressOrName: accountData?.address,
  });

  const [{ data: networkData }, switchNetwork] = useNetwork();

  const rainbowKitChains = useRainbowKitChains();
  const rainbowkitChainsById = useRainbowKitChainsById();

  const rainbowKitChain = networkData.chain
    ? rainbowkitChainsById[networkData.chain.id]
    : undefined;
  const chainIconUrl = rainbowKitChain?.iconUrl ?? undefined;
  const chainIconBackground = rainbowKitChain?.iconBackground ?? undefined;

  const resolvedChainIconUrl = useAsyncImage(chainIconUrl);

  const showRecentTransactions = useContext(ShowRecentTransactionsContext);
  const hasPendingTransactions =
    useRecentTransactions().some(({ status }) => status === 'pending') &&
    showRecentTransactions;

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

  const walletConnectors = useWalletConnectors();

  const preloadImages = useCallback(
    () =>
      loadImages(
        ...walletConnectors.map(wallet => wallet.iconUrl),
        ...rainbowKitChains.map(chain => chain.iconUrl).filter(isNotNullish)
      ),
    [walletConnectors, rainbowKitChains]
  );

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

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
              hasPendingTransactions,
            }
          : undefined,
        accountModalOpen,
        chain: networkData?.chain
          ? {
              hasIcon: Boolean(chainIconUrl),
              iconBackground: chainIconBackground,
              iconUrl: resolvedChainIconUrl,
              id: networkData.chain.id,
              name: networkData.chain.name,
              unsupported: networkData.chain.unsupported,
            }
          : undefined,
        chainModalOpen,
        connectModalOpen,
        mounted,
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
        networkData={networkData}
        onClose={closeChainModal}
        onSwitchNetwork={switchNetwork}
        open={chainModalOpen}
      />
    </>
  );
}

ConnectButtonRenderer.displayName = 'ConnectButton.Custom';
