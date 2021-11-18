import { BaseProvider } from '@ethersproject/providers'

import React from 'react'

import { Box } from '../Box'
import { CopyAddressButton } from '../CopyAddressButton'
import { Text } from '../Text'
import { CloseIcon, ExplorerIcon } from './Icons'
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
    background="blackLight"
    position="absolute"
    margin="0"
    borderRadius="16"
    padding="12"
    className={MenuStyles}
    display={isExpanded ? 'block' : 'none'}
  >
    <SelectedWalletWithBalance {...{ chainId, provider, accountAddress }} />
    <Box
      as="li"
      fontSize="14"
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
      color="sky90"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="full"
      marginBottom="16"
    >
      <Text as="h3" color="sky90" size="14" weight="bold">
        Explorer
      </Text>
      <Box width="20" height="20" display="flex" justifyContent="center" alignItems="center">
        <ExplorerIcon />
      </Box>
    </Box>
    <Box as="li">
      <Box
        as="button"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="full"
        color="red"
        onClick={() => disconnect()}
      >
        <Text color="red" size="14" weight="bold">
          Disconnect
        </Text>
        <Box width="20" height="20" display="flex" justifyContent="center" alignItems="center">
          <CloseIcon />
        </Box>
      </Box>
    </Box>
  </Box>
)
