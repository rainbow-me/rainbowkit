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

const Container = styled.div`
  position: relative;
  width: max-content;
`

export interface ProfileProps {
  modalOptions: UseWalletModalOptions
  copyAddress?: boolean | ((props: { address: string }) => JSX.Element)
  rpcProvider?: JsonRpcProvider
  ipfsGatewayUrl?: string
  classNames?: Partial<{
    pill: string
    menu: string
    container: string
  }>
  button?: ({
    connect,
    disconnect,
    isConnected
  }: {
    connect: () => void
    disconnect: () => void
    isConnected: boolean
  }) => JSX.Element
  dropdown?: (props: WalletDropdownProps) => JSX.Element
  ensOptions?: Partial<UseENSOptions>
}

const ConnectButton = ({ connect }: { connect: () => void }) => <Pill onClick={() => connect()}>Connect</Pill>

export const Profile = ({
  modalOptions,
  copyAddress: CopyAddressComponent,
  rpcProvider,
  ipfsGatewayUrl = 'ipfs.infura-ipfs.io',
  classNames,
  button: ButtonComponent = ConnectButton,
  dropdown: DropdownComponent = WalletDropdown,
  ensOptions
}: ProfileProps) => {
  const { state, Modal, provider, address: accountAddress, chainId } = useWalletModal(modalOptions)

  const { records, domain } = useENS({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    provider: rpcProvider || provider!,
    domain: accountAddress,
    fetchOptions: { cache: 'force-cache' },
    ...ensOptions
  })

  const address = useMemo(() => domain || accountAddress, [domain, accountAddress])

  const [isExpanded, setExpandedState] = useState(false)

  return (
    <Container className={classNames?.container || ''}>
      {state.isConnected ? (
        <>
          <Badge
            {...{ records, ipfsGatewayUrl, address, provider }}
            onClick={() => setExpandedState(!isExpanded)}
            className={classNames?.pill || ''}
          />
          {isExpanded && (
            <DropdownComponent
              {...{ address, accountAddress, chainId, provider }}
              copyAddress={CopyAddressComponent}
              disconnect={state.disconnect}
              className={classNames?.menu || ''}
            />
          )}
        </>
      ) : (
        <>
          <ButtonComponent connect={state.connect} disconnect={state.disconnect} isConnected={state.isConnecting} />
          {state.isConnecting && <Modal />}
        </>
      )}
    </Container>
  )
}
