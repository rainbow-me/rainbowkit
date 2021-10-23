import React, { useMemo, useState } from 'react'
import { styled } from '@linaria/react'
import { useWalletModal } from '@rainbow-me/kit-modal'
import type { UseWalletModalOptions } from '@rainbow-me/kit-modal'
import { EthAddress } from './EthAddress'
import { useENS, useSignificantBalance, useWalletInfo } from '@rainbow-me/kit-hooks'
import { addressHashedColorIndex, addressHashedEmoji, chainIDToToken, colors } from '@rainbow-me/kit-utils'
import { CopyAddressButton } from './CopyAddressButton'
import { BaseProvider, JsonRpcProvider } from '@ethersproject/providers'
import type { UseENSOptions } from '@rainbow-me/kit-hooks'

const Container = styled.div`
  position: relative;
  width: max-content;
`

const Pill = styled.div`
  padding: 0.6rem 1.2rem;
  border-radius: 15px;
  border: 4px solid transparent;
  font-weight: 800;
  line-height: 1;
  font-size: 1.25rem;
  height: 54px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`

const Menu = styled.ul`
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  position: absolute;
  top: 64px;
  left: 0;
  margin: 0;

  padding: 12.5px 13px;
  img {
    display: inline-block;
  }
  li {
    list-style-type: none;
  }
  li:nth-child(1) {
    margin-bottom: 1rem;
    font-weight: 800;
  }
  li:nth-child(2) {
    margin-bottom: 11px;
  }
  li:nth-child(3) {
    padding-top: 11px;
    border-top: 2px solid rgba(255, 255, 255, 0.01);
    margin-top: 24px;
    margin-bottom: 0;
  }
  li:nth-child(1),
  li > button {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
  }
  li > button {
    font-weight: 600;
  }
`

const EmojiIcon = styled.span<{ $bgColor: string }>`
  border-radius: 50%;
  height: 1.8em;
  width: 1.8em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.$bgColor};

  font-size: 0.8em;
  margin-right: 10px;
`

const DisconnectButton = styled.button`
  color: #ff494a;
`

const CloseIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.27344 15.7578H12.7109C14.4531 15.7578 15.3828 14.8281 15.3828 13.1094V3.625C15.3828 1.90625 14.4531 0.984375 12.7109 0.984375H3.27344C1.53906 0.984375 0.609375 1.90625 0.609375 3.625V13.1094C0.609375 14.8359 1.53906 15.7578 3.27344 15.7578ZM3.4375 13.9688C2.75781 13.9688 2.39844 13.625 2.39844 12.9141V3.82031C2.39844 3.10938 2.75781 2.77344 3.4375 2.77344H12.5547C13.2188 2.77344 13.5938 3.10938 13.5938 3.82031V12.9141C13.5938 13.625 13.2188 13.9688 12.5547 13.9688H3.4375ZM5.52344 11.6172C5.75 11.6172 5.9375 11.5391 6.08594 11.3906L8 9.47656L9.92188 11.3906C10.0703 11.5391 10.2578 11.6172 10.4844 11.6172C10.9219 11.6172 11.2656 11.2734 11.2656 10.8359C11.2656 10.6328 11.1797 10.4453 11.0312 10.2969L9.10938 8.375L11.0312 6.4375C11.1875 6.28125 11.2656 6.10156 11.2656 5.89844C11.2656 5.46094 10.9297 5.125 10.4922 5.125C10.2734 5.125 10.0938 5.19531 9.9375 5.35938L8 7.27344L6.07812 5.35938C5.92969 5.20312 5.75 5.13281 5.52344 5.13281C5.08594 5.13281 4.74219 5.46875 4.74219 5.90625C4.74219 6.10938 4.82812 6.29688 4.97656 6.44531L6.90625 8.375L4.97656 10.2969C4.82812 10.4453 4.74219 10.6328 4.74219 10.8359C4.74219 11.2734 5.08594 11.6172 5.52344 11.6172Z"
        fill="#FF494A"
      />
    </svg>
  )
}

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
  button: ({
    connect,
    disconnect,
    isConnected
  }: {
    connect: () => void
    disconnect: () => void
    isConnected: boolean
  }) => JSX.Element
  ensOptions?: Partial<UseENSOptions>
}

const SelectedWalletWithBalance = ({
  provider,
  accountAddress,
  chainId
}: {
  provider: BaseProvider
  accountAddress: string
  chainId: number
}) => {
  const bal = useSignificantBalance({ provider, address: accountAddress })

  const symbol = useMemo(() => chainIDToToken(chainId), [chainId])

  const { logoURI, name } = useWalletInfo()

  return (
    <li>
      {bal.slice(0, 5)} {symbol}
      {logoURI && <img src={logoURI} width={32} height={32} alt={name} />}
    </li>
  )
}

const ConnectButton = ({ connect }: { connect: () => void }) => <Pill onClick={() => connect()}>Connect</Pill>

export const Profile = ({
  modalOptions,
  copyAddress: CopyAddressComponent,
  rpcProvider,
  ipfsGatewayUrl = 'ipfs.infura-ipfs.io',
  classNames,
  button: ButtonComponent = ConnectButton,
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

  const { avatar, emoji, color } = useMemo(() => {
    if (records.avatar) {
      const avatar = records.avatar
      if (avatar) {
        if (avatar.startsWith('ipfs://')) {
          return { avatar: `https://${ipfsGatewayUrl}/ipfs/${avatar.slice(7)}`, address }
        } else return { avatar, address }
      }
    } else {
      return {
        emoji: addressHashedEmoji(address),
        color: colors[addressHashedColorIndex(address)],
        address
      }
    }
  }, [address, records.avatar])

  return (
    <Container className={classNames?.container || ''}>
      {state.isConnected ? (
        <>
          <Pill className={classNames?.pill || ''} onClick={() => setExpandedState(!isExpanded)}>
            <EthAddress
              profileIcon={
                avatar ||
                (() => (
                  <EmojiIcon $bgColor={color} role="img">
                    {emoji}
                  </EmojiIcon>
                ))
              }
              {...{ provider, address }}
            />
          </Pill>
          {isExpanded && (
            <Menu className={classNames?.menu || ''}>
              <SelectedWalletWithBalance {...{ chainId, provider, accountAddress }} />
              <li>
                {CopyAddressComponent === true || CopyAddressComponent === undefined ? (
                  <CopyAddressButton {...{ address }} />
                ) : (
                  typeof CopyAddressComponent !== 'boolean' && <CopyAddressComponent {...{ address }} />
                )}
              </li>
              <li>
                <DisconnectButton onClick={() => state.disconnect()}>
                  Disconnect <CloseIcon />
                </DisconnectButton>
              </li>
            </Menu>
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
