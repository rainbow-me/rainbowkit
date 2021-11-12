import React, { Attributes, DetailedHTMLProps, useEffect, useMemo, useState } from 'react'
import type { ModalProps } from '../types'
import close from '../../assets/close.svg'
import next from '../../assets/next.svg'

import type { Wallet } from '@rainbow-me/kit-utils'

import { getWalletInfo } from '@rainbow-me/kit-utils'
import {
  BackButtonClassName,
  CaptionClassName,
  CloseButtonClassName,
  IconClassName,
  ModalTitleClassName,
  MoreWalletsClassName,
  MoreWalletsGroupClassName,
  MoreWalletsIconClassName,
  StyledModalClassName,
  TermsClassName,
  WalletLabelClassName
} from './style.css'
import { style } from '@vanilla-extract/css'

type BoxProps = React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>

export const ModalTitle = ({ className, children, ...props }: BoxProps) => (
  <div className={`${ModalTitleClassName} ${className}`} {...props}>
    {children}
  </div>
)

/* styled.div<{ $isConnecting: boolean }>`
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
 */

export const ModalOverlay = ({ className, children, isConnecting, ...props }: BoxProps & { isConnecting: boolean }) => (
  <div
    className={`${style({
      width: '100%',
      height: '100vh',
      top: 0,
      left: 0,
      zIndex: 999,
      position: 'fixed',
      background: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      display: isConnecting ? 'flex' : 'none'
    })} ${className}`}
    {...props}
  >
    {children}
  </div>
)

export const StyledModal = ({ className, children, ...props }: BoxProps) => (
  <div className={`${StyledModalClassName} ${className}`} {...props}>
    {children}
  </div>
)

export const Caption = ({ className, children, ...props }: BoxProps) => (
  <div className={`${CaptionClassName} ${className}`} {...props}>
    {children}
  </div>
)

export const CloseButton = ({ className, children, ...props }: BoxProps) => (
  <div className={`${CloseButtonClassName} ${className}`} {...props}>
    {children}
  </div>
)

export const WalletLabel = ({ className, children, ...props }: BoxProps) => (
  <div className={`${WalletLabelClassName} ${className}`} {...props}>
    {children}
  </div>
)

/* styled.ul`
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
` */

const Terms = ({ className, children, ...props }: BoxProps) => (
  <div className={`${TermsClassName} ${className}`} {...props}>
    {children}
  </div>
)

const MoreWallets = ({ className, children, ...props }: BoxProps) => (
  <div className={`${MoreWalletsClassName} ${className}`} {...props}>
    {children}
  </div>
)

const Icon = ({
  logoURI,
  name,
  className,
  ...props
}: { logoURI: string; name: string } & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => <img className={`${IconClassName} ${className}`} src={logoURI} alt={name} {...props} />

const WalletIcon = ({ wallet, connect }: { wallet: Wallet } & Partial<Pick<ModalProps, 'connect'>>) => {
  const { name, logoURI } = useMemo(() => getWalletInfo(wallet.name), [wallet.name])

  return (
    <li key={name}>
      <button onClick={() => (connect ? connect(wallet) : undefined)}>
        <WalletLabel>
          <Icon {...{ name, logoURI }} />
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
      <Icon {...{ name, logoURI }} className={MoreWalletsIconClassName} />
    </div>
  )
}

const BackButton = ({ className, children, ...props }: BoxProps) => (
  <div className={`${BackButtonClassName} ${className}`} {...props}>
    {children}
  </div>
)

const MoreWalletsGroup = ({ className, children, ...props }: BoxProps) => (
  <div className={`${MoreWalletsGroupClassName} ${className}`} {...props}>
    {children}
  </div>
)

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
      isConnecting={isConnecting}
      className={isConnecting ? `${classNames?.overlay}` : `${classNames?.hidden}`}
    >
      <StyledModal className={classNames?.modal}>
        <CloseButton className={classNames?.close} onClick={() => setConnecting(false)}>
          <img src={close} alt="close" title="close" />
        </CloseButton>
        <div>
          <ModalTitle className={classNames?.title}>Connect to a wallet</ModalTitle>
          <Caption className={classNames?.caption}>Choose your preferred wallet</Caption>

          <div
            className={`${style({
              marginTop: '24px',
              listStyleType: 'none',
              paddingLeft: 0
            })} ${classNames?.wallets}`}
          >
            {(isHiddenWalletsOpened ? hiddenWallets : visibleWallets).map((c) => {
              return <WalletIcon key={c.name} connect={connect} wallet={c} />
            })}
          </div>
          {hiddenWallets.length !== 0 && !isHiddenWalletsOpened && (
            <MoreWallets onClick={() => setHiddenWalletsOpened(true)}>
              <div
                className={style({
                  display: 'inherit',
                  flexDirection: 'inherit'
                })}
              >
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
              <Caption
                className={style({
                  color: '#25292e',
                  fontSize: '20px',
                  '::before': {
                    content: '<- '
                  }
                })}
              >
                Back
              </Caption>
            </BackButton>
          )}
        </div>
        {terms && <Terms className={classNames?.terms}>{terms}</Terms>}
      </StyledModal>
    </ModalOverlay>
  )
}
