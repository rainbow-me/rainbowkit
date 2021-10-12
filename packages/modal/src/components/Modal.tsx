import React, { useEffect, useMemo, useState } from 'react'
import type { ModalProps } from '../types'
import close from '../../assets/close.svg'
import next from '../../assets/next.svg'
import { styled } from '@linaria/react'
import type { Wallet } from '@rainbow-me/kit-utils'

import { getWalletInfo } from '@rainbow-me/kit-utils'

const Title = styled.span`
  font-family: ui-rounded, 'SF Pro Rounded', 'Inter', system-ui, sans-serif;
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
  font-family: ui-rounded, 'SF Pro Rounded', 'Inter', system-ui, sans-serif;
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

const WalletList = styled.ul`
  margin-top: 24px;

  li {
    margin-bottom: 12px;
    padding: 11px;
    width: 100%;
  }

  li button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  li span {
    font-family: ui-rounded, 'SF Pro Rounded', 'Inter', system-ui, sans-serif;
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 24px;

    /* identical to box height */
    display: flex;
    align-items: center;
    letter-spacing: 0.5px;
    font-feature-settings: 'pnum' on, 'lnum' on;

    color: #25292e;

    text-transform: capitalize;
  }
`

const Icon = styled.img`
  margin-right: 12px;
  height: 34px;
  width: 34px;
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

const WalletIcon = ({ wallet, connect }: { wallet: Wallet } & Pick<ModalProps, 'connect'>) => {
  const { name, logoURI } = useMemo(() => getWalletInfo(wallet.name), [wallet.name])

  return (
    <li key={name}>
      <button onClick={() => connect(wallet)}>
        <span>
          <Icon src={logoURI} alt={name} />
          {name}
        </span>
        <img src={next} alt={`Select ${name}`} />
      </button>
    </li>
  )
}

/**
 * Rainbow-styled Modal
 */
export const Modal = ({ wallets, connect, setConnecting, isConnecting, terms, classNames }: ModalProps) => {
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
            {wallets
              .filter((x) => !x.hidden)
              .map((c) => {
                return <WalletIcon key={c.name} connect={connect} wallet={c} />
              })}
          </WalletList>
        </div>
        {terms && <Terms className={classNames?.terms}>{terms}</Terms>}
      </StyledModal>
    </ModalOverlay>
  )
}
