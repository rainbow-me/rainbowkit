import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { useIsMounted } from '../../hooks/useIsMounted';
import { AccountModal } from '../AccountModal/AccountModal';
import { Box } from '../Box/Box';
import { ChainModal } from '../ChainModal/ChainModal';
import { ConnectModal } from '../ConnectModal/ConnectModal';
import { DropdownIcon } from '../Icons/Dropdown';
import { useChainIconUrlsById } from '../RainbowKitProvider/ChainIconsContext';
import { formatAddress } from './formatAddress';

const useBooleanState = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { setFalse, setTrue, value };
};

type ConnectButtonRenderer = (renderProps: {
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
  showAccountModal: () => void;
  showChainModal: () => void;
  showConnectModal: () => void;
  accountModalOpen: boolean;
  chainModalOpen: boolean;
  connectModalOpen: boolean;
}) => ReactNode;

const defaultConnectButtonRenderer: ConnectButtonRenderer = ({
  account,
  accountModalOpen,
  chain,
  connectModalOpen,
  showAccountModal,
  showChainModal,
  showConnectModal,
}) =>
  account ? (
    <Box display="flex" gap="12">
      {chain && (
        <Box
          alignItems="center"
          as="button"
          background={
            chain.unsupported
              ? 'connectButtonBackgroundError'
              : 'connectButtonBackground'
          }
          borderRadius="connectButton"
          boxShadow="connectButton"
          color={
            chain.unsupported ? 'connectButtonTextError' : 'connectButtonText'
          }
          display="flex"
          fontFamily="body"
          fontWeight="bold"
          onClick={showChainModal}
          paddingX="10"
          paddingY="8"
          transform={{ active: 'shrink', hover: 'grow' }}
          transition="default"
          type="button"
        >
          {chain.unsupported ? (
            <Box>Invalid network</Box>
          ) : (
            <Box alignItems="center" display="flex" gap="4">
              {chain.iconUrl ? (
                <img
                  alt={chain.name ?? 'Chain icon'}
                  height="24"
                  src={chain.iconUrl}
                  width="24"
                />
              ) : null}
              <div>{chain.name ?? chain.id}</div>
            </Box>
          )}
          <DropdownIcon />
        </Box>
      )}

      <Box
        alignItems="center"
        as="button"
        background="connectButtonBackground"
        borderRadius="connectButton"
        boxShadow="connectButton"
        color="connectButtonText"
        display="flex"
        fontFamily="body"
        fontWeight="bold"
        onClick={showAccountModal}
        transform={{ active: 'shrink', hover: 'grow' }}
        transition="default"
        type="button"
      >
        {account.displayBalance && (
          <Box padding="8" paddingLeft="12">
            {account.displayBalance}
          </Box>
        )}
        <Box
          background="connectButtonInnerBackground"
          borderColor={
            accountModalOpen
              ? 'connectedProfileBorder'
              : 'connectButtonBackground'
          }
          borderRadius="connectButton"
          borderStyle="solid"
          borderWidth="2"
          color="connectButtonText"
          fontFamily="body"
          fontWeight="bold"
          paddingX="8"
          paddingY="6"
          transition="default"
        >
          <Box alignItems="center" display="flex" height="24">
            {account.ensAvatar ? (
              <Box
                alt="ENS Avatar"
                as="img"
                borderRadius="full"
                height="24"
                marginRight="6"
                src={account.ensAvatar}
                width="24"
              />
            ) : null}
            {account.displayName}
            <DropdownIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      background="connectButtonBackground"
      borderRadius="connectButton"
      transform={{ active: 'shrink', hover: 'grow' }}
      transition="default"
    >
      <Box
        as="button"
        background="connectButtonInnerBackground"
        borderColor={
          connectModalOpen
            ? 'connectedProfileBorder'
            : 'connectButtonBackground'
        }
        borderRadius="connectButton"
        borderStyle="solid"
        borderWidth="2"
        boxShadow="connectButton"
        color="connectButtonText"
        fontFamily="body"
        fontWeight="bold"
        onClick={showConnectModal}
        padding="8"
        type="button"
      >
        Connect Wallet
      </Box>
    </Box>
  );

export interface ConnectButtonProps {
  children?: ConnectButtonRenderer;
}

export function ConnectButton({
  children = defaultConnectButtonRenderer,
}: ConnectButtonProps) {
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
    setFalse: hideConnectModal,
    setTrue: showConnectModal,
    value: connectModalOpen,
  } = useBooleanState(false);

  const {
    setFalse: hideAccountModal,
    setTrue: showAccountModal,
    value: accountModalOpen,
  } = useBooleanState(false);

  const {
    setFalse: hideChainModal,
    setTrue: showChainModal,
    value: chainModalOpen,
  } = useBooleanState(false);

  const hasAccountData = Boolean(accountData);
  useEffect(() => {
    hideConnectModal();
    hideAccountModal();
    hideChainModal();
  }, [hasAccountData, hideConnectModal, hideAccountModal, hideChainModal]);

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
        showAccountModal,
        showChainModal,
        showConnectModal,
      })}

      <ConnectModal onClose={hideConnectModal} open={connectModalOpen} />
      <AccountModal
        accountData={accountData}
        balanceData={balanceData}
        networkData={networkData}
        onClose={hideAccountModal}
        onDisconnect={disconnect}
        open={accountModalOpen}
      />
      <ChainModal
        networkData={networkData}
        onClose={hideChainModal}
        onSwitchNetwork={switchNetwork}
        open={chainModalOpen}
      />
    </>
  );
}
