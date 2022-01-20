import React, { useMemo, useState, Dispatch, useRef } from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import type { UserRejectedRequestError } from '@web3-react/injected-connector'
import type { UnsupportedChainIdError } from '@web3-react/core'
import clsx from 'clsx'
import { sprinkles } from '../../css/sprinkles.css'
import { getWalletInfo, Wallet } from '../../utils/wallets'
import { useThemeRootProps } from '../RainbowkitThemeProvider/RainbowkitThemeProvider'
import * as styles from './Modal.css'
import { CloseIcon, NextIcon } from './icons'
import { Box } from '../Box/Box'

export interface ModalProps {
  wallets: Wallet[]
  error?: UserRejectedRequestError | UnsupportedChainIdError | Error
  connect: (w: Wallet) => Promise<void>

  isConnecting: boolean
  setConnecting: Dispatch<boolean>

  terms?: JSX.Element
  classNames?: Partial<{
    modal: string
    close: string
    overlay: string
    hidden: string
    title: string
    caption: string
    wallets: string
    terms: string
    error: string
  }>
}

type BoxProps<T = HTMLDivElement> = React.ClassAttributes<T> & React.HTMLAttributes<T>

const Caption = ({ className, children, ...props }: BoxProps) => (
  <div className={clsx(styles.Caption, className)} {...props}>
    {children}
  </div>
)

const WalletLabel = ({ className, children, ...props }: BoxProps) => (
  <div className={clsx(styles.WalletLabel, className)} {...props}>
    {children}
  </div>
)

const Terms = ({ className, children, ...props }: BoxProps) => (
  <div className={clsx(styles.Terms, className)} {...props}>
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
>) => <img className={clsx(styles.Icon, className)} src={logoURI} alt={name} {...props} />

const WalletIcon = ({ wallet, connect }: { wallet: Wallet } & Partial<Pick<ModalProps, 'connect'>>) => {
  const { name, logoURI } = useMemo(() => getWalletInfo(wallet.name), [wallet.name])

  return (
    <li className={styles.WalletOption} key={name}>
      <button
        onClick={() => {
          // @ts-expect-error connect could be undefined?
          connect(wallet)
        }}
        className={styles.ButtonOption}
      >
        <WalletLabel>
          <Icon {...{ name, logoURI }} className={styles.OptionIcon} />
          {name}
        </WalletLabel>
        <Box color="modalTextSecondary">
          <NextIcon />
        </Box>
      </button>
    </li>
  )
}

const MoreWalletsIcon = ({ wallet }: { wallet: Wallet }) => {
  const { name, logoURI } = useMemo(() => getWalletInfo(wallet.name), [wallet.name])

  return (
    <Box color="modalTextSecondary">
      <Icon {...{ name, logoURI }} className={styles.MoreWalletsIcon} />
    </Box>
  )
}

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

  const initialFocusRef = useRef<HTMLHeadingElement | null>(null)
  const titleId = 'rk_modal_title'

  return (
    <DialogOverlay
      {...useThemeRootProps()}
      aria-labelledby={titleId}
      className={clsx(
        styles.ModalOverlay,
        sprinkles({
          background: 'modalBackdrop',
          position: 'fixed'
        })
      )}
      initialFocusRef={initialFocusRef}
      isOpen={isConnecting}
      onDismiss={() => setConnecting(false)}
    >
      <DialogContent className={styles.StyledModal}>
        <Box
          aria-label="Close"
          as="button"
          className={clsx(styles.CloseButton, classNames?.close)}
          onClick={() => setConnecting(false)}
          type="button"
        >
          <CloseIcon />
        </Box>

        <div>
          <h1 className={clsx(styles.ModalTitle, classNames?.title)} id={titleId} ref={initialFocusRef} tabIndex={-1}>
            Connect to a wallet
          </h1>
          <Caption className={classNames?.caption}>Choose your preferred wallet</Caption>
          {error && <div className={clsx(styles.ErrorMessage, classNames?.error)}>{error.message}</div>}
          <div className={clsx(styles.Wallets, classNames?.wallets)}>
            {(isHiddenWalletsOpened ? hiddenWallets : visibleWallets).map((c) => {
              return <WalletIcon key={c.name} connect={connect} wallet={c} />
            })}
          </div>
          {hiddenWallets.length !== 0 && !isHiddenWalletsOpened && (
            <button
              className={clsx(styles.MoreWallets, styles.ButtonOption)}
              onClick={() => setHiddenWalletsOpened(true)}
            >
              <div className={styles.MoreWalletsInner}>
                <div className={styles.MoreWalletsGroup}>
                  {hiddenWallets.map((w) => (
                    <MoreWalletsIcon wallet={w} key={w.name} />
                  ))}
                </div>
                <WalletLabel>More wallets</WalletLabel>
              </div>

              <Box color="modalTextSecondary">
                <NextIcon />
              </Box>
            </button>
          )}
          {isHiddenWalletsOpened && (
            <button className={styles.BackButton} onClick={() => setHiddenWalletsOpened(false)}>
              <Caption className={styles.BackButtonCaption}>Back</Caption>
            </button>
          )}
        </div>
        {terms && <Terms className={classNames?.terms}>{terms}</Terms>}
      </DialogContent>
    </DialogOverlay>
  )
}
