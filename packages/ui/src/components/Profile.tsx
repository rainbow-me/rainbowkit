import React, { useMemo, useState } from 'react'
import { styled } from '@linaria/react'
import { useWalletModal } from '@rainbow-me/kit-modal'
import type { UseWalletModalOptions } from '@rainbow-me/kit-modal'
import { useENS } from '@rainbow-me/kit-hooks'
import { JsonRpcProvider } from '@ethersproject/providers'
import type { UseENSOptions } from '@rainbow-me/kit-hooks'
import { Pill } from './Pill'
import { Badge } from './Badge'
import { WalletDropdown, WalletDropdownProps } from './WalletDropdown'
import { css } from '@linaria/core'

const Container = styled.div`
  position: relative;
  width: max-content;
`

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
  button?: ({
    connect,
    disconnect,
    isConnected,
    isConnecting
  }: {
    connect: () => void
    disconnect: () => void
    isConnected: boolean
    isConnecting: boolean
  }) => JSX.Element
  dropdown?: (props: WalletDropdownProps) => JSX.Element
  ensOptions?: Partial<UseENSOptions>
}

const ConnectButton = ({ connect }: { connect: () => void }) => <Pill onClick={() => connect()}>Connect</Pill>

const DropdownIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={css`
      margin-left: 6px;
    `}
  >
    <path
      d="M8.992 17.766c4.617 0 8.406-3.782 8.406-8.399 0-4.617-3.789-8.406-8.406-8.406C4.375.96.594 4.75.594 9.367c0 4.617 3.781 8.399 8.398 8.399Zm0-2.438a5.955 5.955 0 0 1-5.96-5.96 5.95 5.95 0 0 1 5.96-5.962 5.95 5.95 0 0 1 5.961 5.961 5.945 5.945 0 0 1-5.96 5.961Zm1-3.555 2.774-2.968c.336-.36.336-.93.015-1.235-.367-.351-.922-.351-1.258.008l-2.53 2.711L6.46 7.58c-.336-.36-.89-.36-1.258-.009-.32.313-.32.867.016 1.235l2.773 2.96a1.345 1.345 0 0 0 2 .008Z"
      fill="white"
    />
  </svg>
)

export const Profile = ({
  modalOptions,
  copyAddress: CopyAddressComponent,
  ENSProvider,
  ipfsGatewayUrl = 'ipfs.infura-ipfs.io',
  classNames,
  button: ButtonComponent = ConnectButton,
  dropdown: DropdownComponent = WalletDropdown,
  ensOptions
}: ProfileProps) => {
  const {
    state: { isConnected, isConnecting, disconnect, connect },
    Modal,
    provider,
    address: accountAddress,
    chainId
  } = useWalletModal(modalOptions)

  const { records, domain } = useENS({
    provider: ENSProvider,
    chainId,
    domain: accountAddress,
    fetchOptions: { cache: 'force-cache' },
    ...ensOptions
  })

  const address = useMemo(() => domain || accountAddress, [domain, accountAddress])

  const [isExpanded, setExpandedState] = useState(false)

  return (
    <Container className={classNames?.container || ''}>
      {isConnected ? (
        <>
          <Badge
            {...{ records, ipfsGatewayUrl, address, provider }}
            onClick={() => setExpandedState(!isExpanded)}
            className={classNames?.pill || ''}
          >
            <DropdownIcon />
          </Badge>
          {isExpanded && (
            <DropdownComponent
              {...{ address, accountAddress, chainId, provider }}
              copyAddress={CopyAddressComponent}
              disconnect={disconnect}
              className={classNames?.menu || ''}
            />
          )}
        </>
      ) : (
        <>
          <ButtonComponent {...{ connect, disconnect, isConnected, isConnecting }} />
          {isConnecting && <Modal />}
        </>
      )}
    </Container>
  )
}
