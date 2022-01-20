import type { UnsupportedChainIdError } from '@web3-react/core';
import type { UserRejectedRequestError } from '@web3-react/injected-connector';
import clsx from 'clsx';
import React, { Dispatch, useMemo, useState } from 'react';
import { getWalletInfo, Wallet } from '../../utils/wallets';
import { Box } from '../Box/Box';
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

const ModalTitle = ({ children, className, ...props }: BoxProps) => (
  <div className={clsx(styles.ModalTitle, className)} {...props}>
    {children}
  </div>
);

const ModalOverlay = ({
  children,
  className,
  isConnecting,
  style,
  ...props
}: BoxProps & { isConnecting: boolean }) => (
  <div
    className={clsx(styles.ModalOverlay, className)}
    style={{
      ...style,
      display: isConnecting ? 'flex' : 'none',
    }}
    {...props}
  >
    {children}
  </div>
);

const StyledModal = ({ children, className, ...props }: BoxProps) => (
  <div className={clsx(styles.StyledModal, className)} {...props}>
    {children}
  </div>
);

const Caption = ({ children, className, ...props }: BoxProps) => (
  <div className={clsx(styles.Caption, className)} {...props}>
    {children}
  </div>
);

const CloseButton = ({ children, className, ...props }: BoxProps) => (
  <div className={clsx(styles.CloseButton, className)} {...props}>
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

const MoreWallets = ({
  children,
  className,
  ...props
}: BoxProps<HTMLButtonElement>) => (
  <button
    className={clsx(styles.MoreWallets, styles.ButtonOption, className)}
    type="button"
    {...props}
  >
    {children}
  </button>
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

const BackButton = ({
  children,
  className,
  ...props
}: BoxProps<HTMLButtonElement>) => (
  <button
    className={clsx(styles.BackButton, className)}
    type="button"
    {...props}
  >
    {children}
  </button>
);

const MoreWalletsGroup = ({ children, className, ...props }: BoxProps) => (
  <div className={clsx(styles.MoreWalletsGroup, className)} {...props}>
    {children}
  </div>
);

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

  return (
    <ModalOverlay
      className={
        isConnecting
          ? `${clsx(classNames?.overlay)}`
          : `${clsx(classNames?.hidden)}`
      }
      isConnecting={isConnecting}
    >
      <StyledModal className={clsx(classNames?.modal)}>
        <CloseButton
          className={clsx(classNames?.close)}
          onClick={() => setConnecting(false)}
        >
          <CloseIcon />
        </CloseButton>
        <div>
          <ModalTitle className={clsx(classNames?.title)}>
            Connect to a wallet
          </ModalTitle>
          <Caption className={clsx(classNames?.caption)}>
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
            <MoreWallets onClick={() => setHiddenWalletsOpened(true)}>
              <div className={styles.MoreWalletsInner}>
                <MoreWalletsGroup>
                  {hiddenWallets.map(w => (
                    <MoreWalletsIcon key={w.name} wallet={w} />
                  ))}
                </MoreWalletsGroup>
                <WalletLabel>More wallets</WalletLabel>
              </div>

              <Box color="modalTextSecondary">
                <NextIcon />
              </Box>
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
  );
};
