import React, { useMemo, useRef, useState } from 'react'
import { useWalletModal } from '@rainbow-me/kit-modal'
import type { UseWalletModalOptions } from '@rainbow-me/kit-modal'
import { useENSWithAvatar } from '@rainbow-me/kit-hooks'
import { JsonRpcProvider } from '@ethersproject/providers'
import { Badge } from '../Badge'
import { WalletDropdown, WalletDropdownProps } from '../WalletDropdown'

import { DropdownIcon } from './Icons'
import { Box } from '../Box'
import { ConnectButton } from './ConnectButton'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import useToggle from '../../hooks/useToggle'

export interface ProfileProps {
  modalOptions: UseWalletModalOptions
  copyAddress?: boolean | ((props: { address: string }) => JSX.Element)
  ENSProvider?: JsonRpcProvider
  ipfsGatewayUrl?: string
  classNames?: Partial<{
    pill: string
    menu: string
    container: string
  }>
  button?: (props: {
    connect: () => void
    disconnect: () => void
    isConnected: boolean
    isConnecting: boolean
    toggleDropdown: () => void
  }) => JSX.Element
  dropdown?: (props: WalletDropdownProps) => JSX.Element
}

export const Profile = ({
  modalOptions,
  copyAddress: CopyAddressComponent,
  ENSProvider,
  ipfsGatewayUrl = 'ipfs.infura-ipfs.io',
  classNames,
  button: ButtonComponent = ConnectButton,
  dropdown: DropdownComponent = WalletDropdown
}: ProfileProps) => {
  const {
    state: { isConnected, isConnecting, disconnect, connect },
    Modal,
    provider,
    address: accountAddress,
    chainId
  } = useWalletModal(modalOptions)

  const ens = useENSWithAvatar({ address: accountAddress, provider: ENSProvider })
  const address = useMemo(() => ens?.domain || accountAddress, [ens?.domain, accountAddress])

  const [open, toggle] = useToggle(false)

  const node = useRef<HTMLDivElement>()
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    <Box position="relative" width="max" className={classNames?.container}>
      {isConnected ? (
        <>
          <div ref={node}>
            <Badge
              {...{ ipfsGatewayUrl, address, provider }}
              onClick={toggle}
              className={classNames?.pill || ''}
              {...ens}
            >
              <DropdownIcon />
            </Badge>

            <DropdownComponent
              {...{ address, accountAddress, chainId, provider, isExpanded: open }}
              copyAddress={CopyAddressComponent}
              disconnect={disconnect}
              className={classNames?.menu || ''}
            />
          </div>
        </>
      ) : (
        <>
          <ButtonComponent {...{ connect, disconnect, isConnected, isConnecting, toggleDropdown: toggle }} />
          {isConnecting && typeof Modal !== 'undefined' && <Modal />}
        </>
      )}
    </Box>
  )
}
