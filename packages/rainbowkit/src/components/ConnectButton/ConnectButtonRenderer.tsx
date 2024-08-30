import React, { type ReactNode, useContext } from 'react';
import { useAccount, useConfig } from 'wagmi';
import { normalizeResponsiveValue } from '../../css/sprinkles.css';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useProfile } from '../../hooks/useProfile';
import { useRecentTransactions } from '../../transactions/useRecentTransactions';
import { isMobile } from '../../utils/isMobile';
import { useAsyncImage } from '../AsyncImage/useAsyncImage';
import {
  type AuthenticationStatus,
  useAuthenticationStatus,
} from '../RainbowKitProvider/AuthenticationContext';
import {
  useAccountModal,
  useChainModal,
  useConnectModal,
  useModalState,
} from '../RainbowKitProvider/ModalContext';
import { useRainbowKitChainsById } from '../RainbowKitProvider/RainbowKitChainContext';
import { useShowBalance } from '../RainbowKitProvider/ShowBalanceContext';
import { ShowRecentTransactionsContext } from '../RainbowKitProvider/ShowRecentTransactionsContext';
import { abbreviateETHBalance } from './abbreviateETHBalance';
import { formatAddress } from './formatAddress';
import { formatENS } from './formatENS';

const noop = () => {};

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
    authenticationStatus?: AuthenticationStatus;
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
  const { address } = useAccount();

  const { chainId } = useAccount();
  const { chains: wagmiChains } = useConfig();
  const isCurrentChainSupported = wagmiChains.some(
    (chain) => chain.id === chainId,
  );

  const rainbowkitChainsById = useRainbowKitChainsById();
  const authenticationStatus = useAuthenticationStatus() ?? undefined;
  const rainbowKitChain = chainId ? rainbowkitChainsById[chainId] : undefined;
  const chainName = rainbowKitChain?.name ?? undefined;
  const chainIconUrl = rainbowKitChain?.iconUrl ?? undefined;
  const chainIconBackground = rainbowKitChain?.iconBackground ?? undefined;
  const resolvedChainIconUrl = useAsyncImage(chainIconUrl);

  const showRecentTransactions = useContext(ShowRecentTransactionsContext);
  const hasPendingTransactions =
    useRecentTransactions().some(({ status }) => status === 'pending') &&
    showRecentTransactions;

  const { showBalance } = useShowBalance();

  const computeShouldShowBalance = () => {
    if (typeof showBalance === 'boolean') {
      return showBalance;
    }

    if (showBalance) {
      return normalizeResponsiveValue(showBalance)[
        isMobile() ? 'smallScreen' : 'largeScreen'
      ];
    }

    return true;
  };

  const shouldShowBalance = computeShouldShowBalance();

  const { balance, ensAvatar, ensName } = useProfile({
    address,
    includeBalance: shouldShowBalance,
  });

  const displayBalance = balance
    ? `${abbreviateETHBalance(Number.parseFloat(balance.formatted))} ${balance.symbol}`
    : undefined;

  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { openAccountModal } = useAccountModal();
  const { accountModalOpen, chainModalOpen, connectModalOpen } =
    useModalState();

  return (
    <>
      {children({
        account: address
          ? {
              address,
              balanceDecimals: balance?.decimals,
              balanceFormatted: balance?.formatted,
              balanceSymbol: balance?.symbol,
              displayBalance,
              displayName: ensName
                ? formatENS(ensName)
                : formatAddress(address),
              ensAvatar: ensAvatar ?? undefined,
              ensName: ensName ?? undefined,
              hasPendingTransactions,
            }
          : undefined,
        accountModalOpen,
        authenticationStatus,
        chain: chainId
          ? {
              hasIcon: Boolean(chainIconUrl),
              iconBackground: chainIconBackground,
              iconUrl: resolvedChainIconUrl,
              id: chainId,
              name: chainName,
              unsupported: !isCurrentChainSupported,
            }
          : undefined,
        chainModalOpen,
        connectModalOpen,
        mounted: isMounted(),
        openAccountModal: openAccountModal ?? noop,
        openChainModal: openChainModal ?? noop,
        openConnectModal: openConnectModal ?? noop,
      })}
    </>
  );
}

ConnectButtonRenderer.displayName = 'ConnectButton.Custom';
