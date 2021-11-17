import { BaseProvider } from '@ethersproject/providers'

import React from 'react'

import { Box } from '../Box'
import { CopyAddressButton } from '../CopyAddressButton'
import { CloseIcon, EtherscanIcon } from './Icons'
import { SelectedWalletWithBalance } from './SelectedWalletWithBalance'
import { MenuStyles } from './style.css'

export type WalletDropdownProps = {
  copyAddress?: boolean | ((props: { address: string }) => JSX.Element)
  /**
   * Ethereum or ENS address
   */
  address: string
  /**
   * Ethereum address
   */
  accountAddress: string
  /**
   * Blockchain network ID
   */
  chainId: number
  /**
   * RPC Provider
   */
  provider: BaseProvider
  /**
   * Disconnect from current provider
   */
  disconnect: () => void
  /**
   * Visible state
   */
  isExpanded: boolean
} & React.ClassAttributes<HTMLUListElement> &
  React.HTMLAttributes<HTMLUListElement>

export const WalletDropdown = ({
  copyAddress: CopyAddressComponent,
  address,
  accountAddress,
  chainId,
  provider,
  disconnect,
  isExpanded,
  ...props
}: WalletDropdownProps) => (
  // might need {...props} here?
  <Box
    as="ul"
    position="absolute"
    margin="0"
    borderRadius="16"
    padding="14"
    className={MenuStyles}
    display={isExpanded ? 'block' : 'none'}
  >
    <SelectedWalletWithBalance {...{ chainId, provider, accountAddress }} />
    <Box
      as="li"
      fontSize="14"
      color="sky90"
      marginBottom="16"
      fontWeight="heavy"
      display="flex"
      width="full"
      justifyContent="space-between"
      alignItems="center"
    >
      {CopyAddressComponent === true || CopyAddressComponent === undefined ? (
        <CopyAddressButton {...{ address }} />
      ) : (
        typeof CopyAddressComponent !== 'boolean' && <CopyAddressComponent {...{ address }} />
      )}
    </Box>
    <Box
      as="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="full"
      marginBottom="16"
      color="sky90"
    >
      <Box as="span" fontSize="14" fontWeight="semibold">
        Etherscan
      </Box>
      <EtherscanIcon />
    </Box>
    <Box as="li" fontSize="14">
      <Box
        as="button"
        fontWeight="semibold"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="full"
        color="red"
        onClick={() => disconnect()}
      >
        Disconnect <CloseIcon />
      </Box>
    </Box>
  </Box>
)
