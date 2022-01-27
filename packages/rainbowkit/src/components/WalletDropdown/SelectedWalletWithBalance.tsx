import { BaseProvider } from '@ethersproject/providers';
import React from 'react';
import { useSelectedWalletWithBalance } from '../../hooks/useSelectedWalletWithBalance';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

export const SelectedWalletWithBalance = ({
  accountAddress,
  chainId,
  provider,
}: {
  provider: BaseProvider;
  accountAddress: string;
  chainId: number;
}) => {
  const { bal, logoURI, name, symbol } = useSelectedWalletWithBalance({
    address: accountAddress,
    chainId,
    provider,
  });

  return (
    <>
      <Box
        alignItems="flex-start"
        as="li"
        display="flex"
        justifyContent="space-between"
        paddingBottom="12"
      >
        <Box>
          <Text as="div" color="menuText" weight="heavy">
            {bal.slice(0, 5)} {symbol}
          </Text>
          <Text as="div" color="menuTextSecondary" size="14" weight="heavy">
            {name}
          </Text>
        </Box>

        {logoURI && (
          <Box
            alt={name}
            as="img"
            borderRadius="6"
            height="20"
            src={logoURI}
            width="20"
          />
        )}
      </Box>
      <Box
        as="hr"
        background="menuDivider"
        borderRadius="1"
        height="4"
        marginBottom="12"
      />
    </>
  );
};
