import type { UnsupportedChainIdError } from '@web3-react/core';
import type { UserRejectedRequestError } from '@web3-react/injected-connector';
import clsx from 'clsx';
import React, { Dispatch, useCallback, useMemo, useRef, useState } from 'react';
import { getWalletInfo, Wallet } from '../../utils/wallets';
import { Box } from '../Box/Box';
import { Dialog } from './Dialog';
import * as styles from './Modal.css';
import { CloseIcon, NextIcon } from './icons';

export interface ModalProps {
  classNames?: Partial<{
    caption: string;
    close: string;
    error: string;
    hidden: string;
    modal: string;
    overlay: string;
    terms: string;
    title: string;
    wallets: string;
  }>;
  connect: (w: Wallet) => Promise<void>;
  error?: UserRejectedRequestError | UnsupportedChainIdError | Error;
  isConnecting: boolean;
  setConnecting: Dispatch<boolean>;
  terms?: JSX.Element;
  wallets: Wallet[];
}

type BoxProps<T = HTMLDivElement> = React.ClassAttributes<T> &
  React.HTMLAttributes<T>;

const Caption = ({ children, className, ...props }: BoxProps) => (
  <div className={clsx(styles.Caption, className)} {...props}>
    {children}
  </div>
);

const WalletLabel = ({ children, className, ...props }: BoxProps) => (
  <div className={clsx(styles.WalletLabel, className)} {...props}>
    {children}
  </div>
);

const Terms = ({ children, className, ...props }: BoxProps) => (
  <div className={clsx(styles.Terms, className)} {...props}>
    {children}
  </div>
);

const Icon = ({
  className,
  logoURI,
  name,
  ...props
}: { logoURI: string; name: string } & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => (
  <img
    alt={name}
    className={clsx(styles.Icon, className)}
    src={logoURI}
    {...props}
  />
);

const WalletIcon = ({
  connect,
  wallet,
}: { wallet: Wallet } & Partial<Pick<ModalProps, 'connect'>>) => {
  const { logoURI, name } = useMemo(
    () => getWalletInfo(wallet.name),
    [wallet.name]
  );

  return (
    <li className={styles.WalletOption} key={name}>
      <button
        className={styles.ButtonOption}
        onClick={() => {
          // @ts-expect-error connect could be undefined?
          connect(wallet);
        }}
        type="button"
      >
        <WalletLabel>
          <Icon {...{ logoURI, name }} className={styles.OptionIcon} />
          {name}
        </WalletLabel>
        <Box color="modalTextSecondary">
          <NextIcon />
        </Box>
      </button>
    </li>
  );
};

const MoreWalletsIcon = ({ wallet }: { wallet: Wallet }) => {
  const { logoURI, name } = useMemo(
    () => getWalletInfo(wallet.name),
    [wallet.name]
  );

  return (
    <Box color="modalTextSecondary">
      <Icon {...{ logoURI, name }} className={styles.MoreWalletsIcon} />
    </Box>
  );
};

/**
 * Rainbow-styled Modal
 */
export const Modal = ({
  classNames,
  connect,
  error,
  isConnecting,
  setConnecting,
  terms,
  wallets,
}: ModalProps) => {
  const { hiddenWallets, visibleWallets } = useMemo(() => {
    const visibleWallets: Wallet[] = [];
    const hiddenWallets: Wallet[] = [];

    for (const wallet of wallets) {
      if (wallet.hidden) {
        hiddenWallets.push(wallet);
      } else visibleWallets.push(wallet);
    }
    return { hiddenWallets, visibleWallets };
  }, [wallets]);

  const [isHiddenWalletsOpened, setHiddenWalletsOpened] = useState(false);

  const initialFocusRef = useRef<HTMLHeadingElement | null>(null);
  const titleId = 'rk_modal_title';

  const stopConnecting = useCallback(
    () => setConnecting(false),
    [setConnecting]
  );

  return (
    <Dialog
      initialFocusRef={initialFocusRef}
      onClose={stopConnecting}
      open={isConnecting}
      titleId={titleId}
    >
      <Box
        aria-label="Close"
        as="button"
        className={clsx(styles.CloseButton, classNames?.close)}
        onClick={stopConnecting}
        type="button"
      >
        <CloseIcon />
      </Box>

      <div>
        <h1
          className={clsx(styles.ModalTitle, classNames?.title)}
          id={titleId}
          ref={initialFocusRef}
          tabIndex={-1}
        >
          Connect to a wallet
        </h1>
        <Caption className={classNames?.caption}>
          Choose your preferred wallet
        </Caption>
        {error && (
          <div className={clsx(styles.ErrorMessage, classNames?.error)}>
            {error.message}
          </div>
        )}
        <div className={clsx(styles.Wallets, classNames?.wallets)}>
          {(isHiddenWalletsOpened ? hiddenWallets : visibleWallets).map(c => {
            return <WalletIcon connect={connect} key={c.name} wallet={c} />;
          })}
        </div>
        {hiddenWallets.length !== 0 && !isHiddenWalletsOpened && (
          <button
            className={clsx(styles.MoreWallets, styles.ButtonOption)}
            onClick={() => setHiddenWalletsOpened(true)}
            type="button"
          >
            <div className={styles.MoreWalletsInner}>
              <div className={styles.MoreWalletsGroup}>
                {hiddenWallets.map(w => (
                  <MoreWalletsIcon key={w.name} wallet={w} />
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
          <button
            className={styles.BackButton}
            onClick={() => setHiddenWalletsOpened(false)}
            type="button"
          >
            <Caption className={styles.BackButtonCaption}>Back</Caption>
          </button>
        )}
      </div>
      {terms && <Terms className={classNames?.terms}>{terms}</Terms>}
    </Dialog>
  );
};
