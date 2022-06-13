import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
} from 'wagmi';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useRecentTransactions } from '../../transactions/useRecentTransactions';
import { isMobile } from '../../utils/isMobile';
import { isNotNullish } from '../../utils/isNotNullish';
import { useWalletConnectors } from '../../wallets/useWalletConnectors';
import { AccountModal } from '../AccountModal/AccountModal';
import { loadImages, useAsyncImage } from '../AsyncImage/useAsyncImage';
import { ChainModal } from '../ChainModal/ChainModal';
import { ConnectModal } from '../ConnectModal/ConnectModal';
import { preloadAssetsIcon } from '../Icons/Assets';
import { preloadLoginIcon } from '../Icons/Login';
import {
  useRainbowKitChains,
  useRainbowKitChainsById,
} from '../RainbowKitProvider/RainbowKitChainContext';
import { ShowRecentTransactionsContext } from '../RainbowKitProvider/ShowRecentTransactionsContext';
import { abbreviateETHBalance } from './abbreviateETHBalance';
import { formatAddress } from './formatAddress';
import { formatENS } from './formatENS';

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

  const { data: accountData } = useAccount();

  const { data: ensAvatar } = useEnsAvatar({
    addressOrName: accountData?.address,
  });

  const { data: ensName } = useEnsName({ address: accountData?.address });

  const { data: balanceData } = useBalance({
    addressOrName: accountData?.address,
  });

  const {
    activeChain,
    chains,
    error: networkError,
    switchNetwork,
  } = useNetwork();

  const { disconnect } = useDisconnect();

  const rainbowKitChains = useRainbowKitChains();
  const rainbowkitChainsById = useRainbowKitChainsById();

  const rainbowKitChain = activeChain
    ? rainbowkitChainsById[activeChain.id]
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

  const preloadImages = useCallback(() => {
    loadImages(
      ...walletConnectors.map(wallet => wallet.iconUrl),
      ...rainbowKitChains.map(chain => chain.iconUrl).filter(isNotNullish)
    );

    // Preload illustrations used on desktop
    if (!isMobile()) {
      preloadAssetsIcon();
      preloadLoginIcon();
    }
  }, [walletConnectors, rainbowKitChains]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  const displayBalance = balanceData
    ? `${abbreviateETHBalance(parseFloat(balanceData.formatted))} ${
        balanceData.symbol
      }`
    : undefined;

  return (
    <>
      {children({
        account: accountData?.address
          ? {
              address: accountData.address,
              balanceDecimals: balanceData?.decimals,
              balanceFormatted: balanceData?.formatted,
              balanceSymbol: balanceData?.symbol,
              displayBalance,
              displayName: ensName
                ? formatENS(ensName)
                : formatAddress(accountData.address),
              ensAvatar: ensAvatar ?? undefined,
              ensName: ensName ?? undefined,
              hasPendingTransactions,
            }
          : undefined,
        accountModalOpen,
        chain: activeChain
          ? {
              hasIcon: Boolean(chainIconUrl),
              iconBackground: chainIconBackground,
              iconUrl: resolvedChainIconUrl,
              id: activeChain.id,
              name: activeChain.name,
              unsupported: activeChain.unsupported,
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
        ensAvatar={ensAvatar}
        ensName={ensName}
        onClose={closeAccountModal}
        onDisconnect={disconnect}
        open={accountModalOpen}
      />
      <ChainModal
        activeChain={activeChain}
        chains={chains}
        networkError={networkError}
        onClose={closeChainModal}
        onSwitchNetwork={switchNetwork}
        open={chainModalOpen}
      />
    </>
  );
}

ConnectButtonRenderer.displayName = 'ConnectButton.Custom';
