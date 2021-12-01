import React, { useMemo, useState } from 'react'
import type { ModalProps } from '../types'
import type { Wallet } from '@rainbow-me/kit-utils'
import clsx from 'clsx'

import { getWalletInfo } from '@rainbow-me/kit-utils'
import * as styles from './Modal.css'
import { CloseIcon, NextIcon } from '../icons'

type BoxProps<T = HTMLDivElement> = React.ClassAttributes<T> & React.HTMLAttributes<T>

export const ModalTitle = ({ className, children, ...props }: BoxProps) => (
  <div className={clsx(styles.ModalTitle, className)} {...props}>
    {children}
  </div>
)

export const ModalOverlay = ({
  className,
  children,
  isConnecting,
  style,
  ...props
}: BoxProps & { isConnecting: boolean }) => (
  <div
    className={clsx(styles.ModalOverlay, className)}
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
  <div className={clsx(styles.StyledModal, className)} {...props}>
    {children}
  </div>
)

export const Caption = ({ className, children, ...props }: BoxProps) => (
  <div className={clsx(styles.Caption, className)} {...props}>
    {children}
  </div>
)

export const CloseButton = ({ className, children, ...props }: BoxProps) => (
  <div className={clsx(styles.CloseButton, className)} {...props}>
    {children}
  </div>
)

export const WalletLabel = ({ className, children, ...props }: BoxProps) => (
  <div className={clsx(styles.WalletLabel, className)} {...props}>
    {children}
  </div>
)

const Terms = ({ className, children, ...props }: BoxProps) => (
  <div className={clsx(styles.Terms, className)} {...props}>
    {children}
  </div>
)

const MoreWallets = ({ className, children, ...props }: BoxProps<HTMLButtonElement>) => (
  <button className={clsx(styles.MoreWallets, styles.ButtonOption, className)} {...props}>
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
>) => <img className={clsx(styles.Icon, className)} src={logoURI} alt={name} {...props} />

const WalletIcon = ({ wallet, connect }: { wallet: Wallet } & Partial<Pick<ModalProps, 'connect'>>) => {
  const { name, logoURI } = useMemo(() => getWalletInfo(wallet.name), [wallet.name])

  return (
    <li className={styles.WalletOption} key={name}>
      <button onClick={() => (connect ? connect(wallet) : undefined)} className={styles.ButtonOption}>
        <WalletLabel>
          <Icon {...{ name, logoURI }} className={styles.OptionIcon} />
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
      <Icon {...{ name, logoURI }} className={styles.MoreWalletsIcon} />
    </div>
  )
}

const BackButton = ({ className, children, ...props }: BoxProps<HTMLButtonElement>) => (
  <button className={clsx(styles.BackButton, className)} {...props}>
    {children}
  </button>
)

const MoreWalletsGroup = ({ className, children, ...props }: BoxProps) => (
  <div className={clsx(styles.MoreWalletsGroup, className)} {...props}>
    {children}
  </div>
)

/**
 * Rainbow-styled Modal
 */
export const Modal = ({ wallets, connect, setConnecting, isConnecting, terms, classNames, error }: ModalProps) => {
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
      className={isConnecting ? `${clsx(classNames?.overlay)}` : `${clsx(classNames?.hidden)}`}
    >
      <StyledModal className={clsx(classNames?.modal)}>
        <CloseButton className={clsx(classNames?.close)} onClick={() => setConnecting(false)}>
          <CloseIcon />
        </CloseButton>
        <div>
          <ModalTitle className={clsx(classNames?.title)}>Connect to a wallet</ModalTitle>
          <Caption className={clsx(classNames?.caption)}>Choose your preferred wallet</Caption>
          {error?.message}
          <div className={clsx(styles.Wallets, classNames?.wallets)}>
            {(isHiddenWalletsOpened ? hiddenWallets : visibleWallets).map((c) => {
              return <WalletIcon key={c.name} connect={connect} wallet={c} />
            })}
          </div>
          {hiddenWallets.length !== 0 && !isHiddenWalletsOpened && (
            <MoreWallets onClick={() => setHiddenWalletsOpened(true)}>
              <div className={styles.MoreWalletsInner}>
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
              <Caption className={styles.BackButtonCaption}>Back</Caption>
            </BackButton>
          )}
        </div>
        {terms && <Terms className={clsx(classNames?.terms)}>{terms}</Terms>}
      </StyledModal>
    </ModalOverlay>
  )
}
