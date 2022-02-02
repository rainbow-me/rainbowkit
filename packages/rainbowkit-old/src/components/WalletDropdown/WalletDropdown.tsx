import { BaseProvider } from '@ethersproject/providers';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { chainIDToExplorer } from '../../utils/convert';
import { Box, BoxProps } from '../Box/Box';
import { CopyAddressButton } from '../CopyAddressButton/CopyAddressButton';
import { Text } from '../Text/Text';
import { SelectedWalletWithBalance } from './SelectedWalletWithBalance';
import { MenuStyles } from './WalletDropdown.css';
import { CloseIcon, ExplorerIcon } from './icons';

export interface WalletDropdownProps extends BoxProps {
  copyAddress?: boolean | ((props: { address: string }) => JSX.Element);
  /**
   * Ethereum or ENS address
   */
  address: string;
  /**
   * Ethereum address
   */
  accountAddress: string;
  /**
   * Blockchain network ID
   */
  chainId: number;
  /**
   * RPC Provider
   */
  provider: BaseProvider;
  /**
   * Disconnect from current provider
   */
  disconnect: () => void;
  /**
   * Visible state
   */
  isExpanded: boolean;
}

export const WalletDropdown = ({
  accountAddress,
  address,
  chainId,
  className,
  copyAddress: CopyAddressComponent,
  disconnect,
  isExpanded,
  provider,
  ...props
}: WalletDropdownProps) => {
  const explorerName = useMemo(() => {
    if (chainId) {
      const name = chainIDToExplorer(chainId).name;
      return `${name[0].toUpperCase()}${name.slice(1)}`;
    }
    return 'Etherscan';
  }, [chainId]);

  return (
    <Box
      as="ul"
      background="menuBackground"
      borderRadius="menu"
      className={clsx(MenuStyles, className)}
      display={isExpanded ? 'block' : 'none'}
      margin="0"
      padding="12"
      position="absolute"
      {...props}
    >
      <SelectedWalletWithBalance {...{ accountAddress, chainId, provider }} />
      <Box
        alignItems="center"
        as="li"
        display="flex"
        fontSize="14"
        fontWeight="heavy"
        justifyContent="space-between"
        marginBottom="16"
        width="full"
      >
        {CopyAddressComponent === true || CopyAddressComponent === undefined ? (
          <CopyAddressButton {...{ address }} />
        ) : (
          typeof CopyAddressComponent !== 'boolean' && (
            <CopyAddressComponent {...{ address }} />
          )
        )}
      </Box>
      <Box as="li" marginBottom="16" width="full">
        <Box
          alignItems="center"
          as="a"
          display="flex"
          href={`${chainIDToExplorer(chainId).url}/address/${accountAddress}`}
          justifyContent="space-between"
          rel="noreferrer"
          target="_blank"
        >
          <Text as="h3" color="menuText" size="14" weight="bold">
            {explorerName}
          </Text>
          <Box
            alignItems="center"
            color="menuText"
            display="flex"
            height="20"
            justifyContent="center"
            width="20"
          >
            <ExplorerIcon />
          </Box>
        </Box>
      </Box>
      <Box as="li">
        <Box
          alignItems="center"
          as="button"
          color="menuTextDisconnect"
          display="flex"
          justifyContent="space-between"
          onClick={() => disconnect()}
          width="full"
        >
          <Text color="menuTextDisconnect" size="14" weight="bold">
            Disconnect
          </Text>
          <Box
            alignItems="center"
            display="flex"
            height="20"
            justifyContent="center"
            width="20"
          >
            <CloseIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
