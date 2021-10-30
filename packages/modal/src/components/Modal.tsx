import React, { useEffect, useMemo, useState } from 'react'
import type { ModalProps } from '../types'
import close from '../../assets/close.svg'
import next from '../../assets/next.svg'
import { styled } from '@linaria/react'
import type { Wallet } from '@rainbow-me/kit-utils'

import { getWalletInfo } from '@rainbow-me/kit-utils'

const Title = styled.span`
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.4px;
  font-feature-settings: 'ss08' on, 'cv09' on;

  color: #25292e;

  display: block;
  margin-bottom: 4px;
`

const ModalOverlay = styled.div<{ $isConnecting: boolean }>`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.$isConnecting ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`

const StyledModal = styled.div`
  min-height: 525px;
  width: 390px;
  padding: 24px;
  position: relative;
  background: #ffffff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Caption = styled.span`
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  line-height: 19px;

  letter-spacing: 0.5px;
  font-feature-settings: 'ss08' on, 'cv09' on;

  color: rgba(60, 66, 82, 0.6);

  display: block;
`

const CloseButton = styled.button`
  text-align: center;
  letter-spacing: 0.4px;

  color: rgba(60, 66, 82, 0.8);

  font-weight: 900;
  font-size: 14px;
  line-height: 17px;

  position: absolute;

  right: 24px;
  top: 24px;
`

const WalletLabel = styled.span`
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;

  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
  font-feature-settings: 'pnum' on, 'lnum' on;

  color: #25292e;

  text-transform: capitalize;
`

const WalletList = styled.ul`
  margin-top: 24px;
  list-style-type: none;
  padding-left: 0;

  li {
    margin-bottom: 12px;
    padding: 11px;
    width: unset;
  }

  li button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background: none;
    border: none;
  }

  li img:first-child {
    margin-right: 12px;
    height: 34px;
    width: 34px;
  }
`

const Icon = styled.img`
  border-radius: 10px;
  filter: drop-shadow(0px 4px 12px rgba(0, 30, 89, 0.3));
`

const Terms = styled.div`
  font-weight: 600;
  color: rgba(60, 66, 82, 0.6);
  font-size: 14px;
  line-height: 1.5;
  a {
    color: #a0c7ff;
    font-weight: 700;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`

const MoreWallets = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 11px;
  & > div {
    display: inherit;
    flex-direction: inherit;
  }
`

const MoreWalletsGroup = styled.div`
  margin-right: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 2px;
  width: max-content;
  & > div > img {
    width: 16px;
    height: 16px;
  }
`

const WalletIcon = ({ wallet, connect }: { wallet: Wallet } & Partial<Pick<ModalProps, 'connect'>>) => {
  const { name, logoURI } = useMemo(() => getWalletInfo(wallet.name), [wallet.name])

  return (
    <li key={name}>
      <button onClick={() => (connect ? connect(wallet) : undefined)}>
        <WalletLabel>
          <Icon src={logoURI} alt={name} />
          {name}
        </WalletLabel>
        <img src={next} alt={`Select ${name}`} />
      </button>
    </li>
  )
}

const MoreWalletsIcon = ({ wallet }: { wallet: Wallet }) => {
  const { name, logoURI } = useMemo(() => getWalletInfo(wallet.name), [wallet.name])

  return (
    <div key={name}>
      <Icon src={logoURI} alt={name} />
    </div>
  )
}

const BackButton = styled.button`
  width: 100%;
  padding: 11px;
  display: flex;
  span {
    color: #25292e;
    font-size: 20px;
  }
  span::before {
    content: '<- ';
  }
`

/**
 * Rainbow-styled Modal
 */
export const Modal = ({ wallets, connect, setConnecting, isConnecting, terms, classNames }: ModalProps) => {
  const { visibleWallets, hiddenWallets } = useMemo(() => {
    const visibleWallets: Wallet[] = []
    const hiddenWallets: Wallet[] = []

    for (const wallet of wallets) {
      if (wallet.hidden) {
        hiddenWallets.push(wallet)
      } else visibleWallets.push(wallet)
    }
    return { visibleWallets, hiddenWallets }
  }, [wallets])

  const [isHiddenWalletsOpened, setHiddenWalletsOpened] = useState(false)

  return (
    <ModalOverlay
      $isConnecting={isConnecting}
      className={isConnecting ? `${classNames?.overlay}` : `${classNames?.hidden}`}
    >
      <StyledModal className={classNames?.modal}>
        <CloseButton className={classNames?.close} onClick={() => setConnecting(false)}>
          <img src={close} alt="close" title="close" />
        </CloseButton>
        <div>
          <Title className={classNames?.title}>Connect to a wallet</Title>
          <Caption className={classNames?.caption}>Choose your preferred wallet</Caption>

          <WalletList className={classNames?.wallets}>
            {(isHiddenWalletsOpened ? hiddenWallets : visibleWallets).map((c) => {
              return <WalletIcon key={c.name} connect={connect} wallet={c} />
            })}
          </WalletList>
          {hiddenWallets.length !== 0 && !isHiddenWalletsOpened && (
            <MoreWallets onClick={() => setHiddenWalletsOpened(true)}>
              <div>
                <MoreWalletsGroup>
                  {hiddenWallets.map((w) => (
                    <MoreWalletsIcon wallet={w} key={w.name} />
                  ))}
                </MoreWalletsGroup>
                <WalletLabel>More wallets</WalletLabel>
              </div>

              <img src={next} alt="Open more wallets" />
            </MoreWallets>
          )}
          {isHiddenWalletsOpened && (
            <BackButton onClick={() => setHiddenWalletsOpened(false)}>
              <Caption>Back</Caption>
            </BackButton>
          )}
        </div>
        {terms && <Terms className={classNames?.terms}>{terms}</Terms>}
      </StyledModal>
    </ModalOverlay>
  )
}
