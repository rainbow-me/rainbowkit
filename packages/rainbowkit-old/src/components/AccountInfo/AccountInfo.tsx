import React from 'react';
import { useWalletInfo } from '../../hooks/useWalletInfo';
import { Box } from '../Box/Box';
import { CopyAddressButton } from '../CopyAddressButton/CopyAddressButton';
import { ExplorerLink, ExplorerLinkProps } from '../ExplorerLink/ExplorerLink';

export interface AccountInfoProps {
  /**
   * Blockchain account address
   */
  address: string;
  /**
   * Wallet name and logo image
   */
  wallet?: { name: string; logoURI: string };
  /**
   * Blockchain explorer component, auto-detected if not set or set to true
   */
  explorer?: boolean | ((props: ExplorerLinkProps) => JSX.Element);
  /**
   * Copy address button component, enabled if set to true or not set
   */
  copyAddress?: boolean | ((props: { address: string }) => JSX.Element);
  /**
   * Current chain ID
   */

  chainId?: number;
  /**
   * URL to a address on a blockchain explorer
   */
  explorerUrl?: string;
  /**
   * Custom CSS classNames
   */
  classNames?: Partial<{
    container: string;
  }>;
}

/**
 * Blockchain account information block.
 */

export const AccountInfo = ({
  address,
  chainId,
  classNames,
  copyAddress: CopyAddress,
  explorer: Explorer,
  explorerUrl,
  wallet,
}: AccountInfoProps) => {
  const { logoURI, name } = useWalletInfo(wallet);

  return (
    <Box
      borderRadius="menu"
      borderWidth="4"
      className={classNames?.container}
      minWidth="max"
      padding="20"
      width="full"
    >
      {name && (
        <div>
          Connected with <strong>{name}</strong>
        </div>
      )}
      {address && (
        <Box
          alignItems="center"
          display="inline-flex"
          fontSize="23"
          fontWeight="semibold"
        >
          {logoURI && (
            <Box
              alt={name}
              as="img"
              height="24"
              marginRight="8"
              src={logoURI}
              title={name}
              width="24"
            />
          )}{' '}
          {address}
        </Box>
      )}
      <Box display="flex" flexDirection="row" paddingRight="24" paddingTop="16">
        <>
          {(CopyAddress === undefined || CopyAddress === true) && (
            <CopyAddressButton {...{ address }} />
          )}
        </>
        <>
          {CopyAddress && typeof CopyAddress !== 'boolean' && (
            <CopyAddress {...{ address }} />
          )}
        </>
        {(explorerUrl || chainId) && (
          <>
            {(Explorer === undefined || Explorer === true) && (
              <ExplorerLink {...{ address, chainId, explorerUrl }} />
            )}
            {Explorer && typeof Explorer !== 'boolean' && (
              <Explorer {...{ address, chainId, explorerUrl }} />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
