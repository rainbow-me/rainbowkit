import React, { useMemo, useState } from 'react'
import type { ModalProps } from '../types'
import type { Wallet } from '@rainbow-me/kit-utils'

import { getWalletInfo } from '@rainbow-me/kit-utils'
import {
  BackButtonClassName,
  CaptionClassName,
  CloseButtonClassName,
  IconClassName,
  ModalOverlayClassName,
  ModalTitleClassName,
  MoreWalletsClassName,
  MoreWalletsInnerClassName,
  MoreWalletsGroupClassName,
  MoreWalletsIconClassName,
  StyledModalClassName,
  TermsClassName,
  WalletLabelClassName,
  WalletsClassName,
  BackButtonCaptionClassName,
  OptionIconClassName,
  ButtonOptionClassName,
  WalletOptionClassName
} from './style.css'
import { CloseIcon, NextIcon } from '../icons'

type BoxProps<T = HTMLDivElement> = React.ClassAttributes<T> & React.HTMLAttributes<T>

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

export const ModalOverlay = ({
  className,
  children,
  isConnecting,
  style,
  ...props
}: BoxProps & { isConnecting: boolean }) => (
  <div
    className={`${ModalOverlayClassName} ${className}`}
    style={{
      ...style,
      display: isConnecting ? 'flex' : 'none'
    }}
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

const MoreWallets = ({ className, children, ...props }: BoxProps<HTMLButtonElement>) => (
  <button className={`${MoreWalletsClassName} ${ButtonOptionClassName} ${className}`} {...props}>
    {children}
  </button>
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
    <li className={WalletOptionClassName} key={name}>
      <button onClick={() => (connect ? connect(wallet) : undefined)} className={ButtonOptionClassName}>
        <WalletLabel>
          <Icon {...{ name, logoURI }} className={OptionIconClassName} />
          {name}
        </WalletLabel>
        <NextIcon />
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

const BackButton = ({ className, children, ...props }: BoxProps<HTMLButtonElement>) => (
  <button className={`${BackButtonClassName} ${className}`} {...props}>
    {children}
  </button>
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
          <CloseIcon />
        </CloseButton>
        <div>
          <ModalTitle className={classNames?.title}>Connect to a wallet</ModalTitle>
          <Caption className={classNames?.caption}>Choose your preferred wallet</Caption>

          <div className={`${WalletsClassName} ${classNames?.wallets}`}>
            {(isHiddenWalletsOpened ? hiddenWallets : visibleWallets).map((c) => {
              return <WalletIcon key={c.name} connect={connect} wallet={c} />
            })}
          </div>
          {hiddenWallets.length !== 0 && !isHiddenWalletsOpened && (
            <MoreWallets onClick={() => setHiddenWalletsOpened(true)}>
              <div className={MoreWalletsInnerClassName}>
                <MoreWalletsGroup>
                  {hiddenWallets.map((w) => (
                    <MoreWalletsIcon wallet={w} key={w.name} />
                  ))}
                </MoreWalletsGroup>
                <WalletLabel>More wallets</WalletLabel>
              </div>

              <NextIcon />
            </MoreWallets>
          )}
          {isHiddenWalletsOpened && (
            <BackButton onClick={() => setHiddenWalletsOpened(false)}>
              <Caption className={BackButtonCaptionClassName}>Back</Caption>
            </BackButton>
          )}
        </div>
        {terms && <Terms className={classNames?.terms}>{terms}</Terms>}
      </StyledModal>
    </ModalOverlay>
  )
}
