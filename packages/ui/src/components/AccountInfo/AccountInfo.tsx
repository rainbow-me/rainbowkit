import React from 'react'
import { CopyAddressButton } from '../CopyAddressButton'
import { ExplorerLink, ExplorerProps } from '../ExplorerLink'
import { useWalletInfo } from '@rainbow-me/kit-hooks'

import { Box } from '../Box'

export interface AccountInfoProps {
  /**
   * Blockchain account address
   */
  address: string
  /**
   * Wallet name and logo image
   */
  wallet?: { name: string; logoURI: string }
  /**
   * Blockchain explorer component, auto-detected if not set or set to true
   */
  explorer?: boolean | ((props: ExplorerProps) => JSX.Element)
  /**
   * Copy address button component, enabled if set to true or not set
   */
  copyAddress?: boolean | ((props: { address: string }) => JSX.Element)
  /**
   * Current chain ID
   */

  chainId?: number
  /**
   * URL to a address on a blockchain explorer
   */
  explorerUrl?: string
  /**
   * Custom CSS classNames
   */
  classNames?: Partial<{
    container: string
  }>
}

/**
 * Blockchain account information block.
 */

export const AccountInfo = ({
  address,
  wallet,
  chainId,
  explorer: Explorer,
  copyAddress: CopyAddress,
  explorerUrl,
  classNames
}: AccountInfoProps) => {
  const { name, logoURI } = useWalletInfo(wallet)

  return (
    <Box borderRadius="menu" padding="20" borderWidth="4" minWidth="max" width="full" className={classNames?.container}>
      {name && (
        <div>
          Connected with <strong>{name}</strong>
        </div>
      )}
      {address && (
        <Box display="inline-flex" alignItems="center" fontWeight="semibold" fontSize="23">
          {logoURI && <Box as="img" width="24" height="24" marginRight="8" src={logoURI} title={name} alt={name} />}{' '}
          {address}
        </Box>
      )}
      <Box display="flex" flexDirection="row" paddingTop="16" paddingRight="24">
        <>{(CopyAddress === undefined || CopyAddress === true) && <CopyAddressButton {...{ address }} />}</>
        <>{CopyAddress && typeof CopyAddress !== 'boolean' && <CopyAddress {...{ address }} />}</>
        {(explorerUrl || chainId) && (
          <>
            {(Explorer === undefined || Explorer === true) && <ExplorerLink {...{ address, chainId, explorerUrl }} />}
            {Explorer && typeof Explorer !== 'boolean' && <Explorer {...{ address, chainId, explorerUrl }} />}
          </>
        )}
      </Box>
    </Box>
  )
}
