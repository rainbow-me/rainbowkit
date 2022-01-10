import React, { Dispatch, useMemo, useRef } from 'react'
import { useENSWithAvatar, useOnClickOutside, useToggle, useWalletModal, UseWalletModalOptions } from '../../hooks'
import { JsonRpcProvider } from '@ethersproject/providers'
import { Badge } from '../Badge/Badge'
import { WalletDropdown, WalletDropdownProps } from '../WalletDropdown/WalletDropdown'
import { Modal } from '../Modal/Modal'
import { DropdownIcon } from './Icons'
import { Box } from '../Box/Box'
import { ConnectButton } from './ConnectButton'

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
    setConnecting: Dispatch<boolean>
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
    state: { isConnected, isConnecting, disconnect, setConnecting, connect },

    provider,
    address: accountAddress,
    chainId
  } = useWalletModal(modalOptions)

  // @ts-expect-error accountAddress and ENSProvider could be undefined?
  const ens = useENSWithAvatar({ address: accountAddress, provider: ENSProvider })
  const address = useMemo(() => ens?.domain || accountAddress, [ens?.domain, accountAddress])

  const [open, toggle] = useToggle(false)

  const node = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    <Box position="relative" width="max" className={classNames?.container}>
      {isConnected ? (
        <>
          <div ref={node}>
            {/* @ts-expect-error address could be undefined? */}
            <Badge
              {...{ ipfsGatewayUrl, address, provider }}
              onClick={toggle}
              className={classNames?.pill || ''}
              {...ens}
            >
              <DropdownIcon />
            </Badge>

            {/* @ts-expect-error address could be undefined? */}
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
          <ButtonComponent {...{ setConnecting, disconnect, isConnected, isConnecting, toggleDropdown: toggle }} />
          {isConnecting && <Modal {...{ setConnecting, isConnecting, connect }} {...modalOptions} />}
        </>
      )}
    </Box>
  )
}
