import clsx from 'clsx';
import React from 'react';
import { useExplorerName } from '../../hooks/useExplorerName';
import { chainIDToExplorer } from '../../utils/convert';
import { Box } from '../Box/Box';
import { CopyAddressButton } from '../CopyAddressButton/CopyAddressButton';
import { DropdownProps } from '../Profile/Profile';
import { Text } from '../Text/Text';
import { SelectedWalletWithBalance } from './SelectedWalletWithBalance';
import { MenuStyles } from './WalletDropdown.css';
import { CloseIcon, ExplorerIcon } from './icons';

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
}: DropdownProps) => {
  const explorerName = useExplorerName(chainId);

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
        as="hr"
        background="menuDivider"
        borderRadius="1"
        height="4"
        marginBottom="12"
      />
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
