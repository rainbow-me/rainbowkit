import clsx from 'clsx';
import React, { forwardRef, useRef } from 'react';
import { useExplorer } from '../../hooks/useExplorerName';
import { useSelectedWalletWithBalance } from '../../hooks/useSelectedWalletWithBalance';
import { shortenAddress } from '../../utils/address';
import { Box } from '../Box/Box';
import { CopyIcon } from '../CopyAddressButton/Icons';
import { Dialog } from '../Dialog/Dialog';
import * as modalStyles from '../Modal/Modal.css';
import { CloseIcon, DisconnectIcon } from '../Modal/icons';
import { AccountInfoProps } from '../Profile/Profile';
import { Text } from '../Text/Text';
import { TxHistory } from '../TxHistory/TxHistory';
import * as styles from './WalletDialog.css';
import { ExplorerIcon } from './icons';

const Divider = () => (
  <Box as="hr" background="menuDivider" borderRadius="1" height="4" />
);

export const WalletDialog = forwardRef<HTMLDivElement, AccountInfoProps>(
  (
    {
      accountAddress,
      address,
      chainId,
      className,
      disconnect,
      isExpanded,
      profileIcon: ProfileIconURLOrImage,
      provider,
      toggle,
      txHistoryProps,
    },
    ref
  ) => {
    const { name: explorerName, url: explorerUrl } = useExplorer(chainId);

    const { bal, logoURI, name, symbol } = useSelectedWalletWithBalance({
      address: accountAddress,
      chainId,
      provider,
    });

    const titleId = 'rk_walletdialog_title';

    const initialFocusRef = useRef<HTMLElement | null>(null);

    return (
      <Dialog
        classNames={{ content: clsx(styles.dialog, className) }}
        open={isExpanded}
        ref={ref}
        {...{ initialFocusRef, titleId }}
      >
        <div className={styles.accountInfo}>
          <Box display="flex" flexDirection="row">
            {typeof ProfileIconURLOrImage === 'string' ? (
              <Box
                as="img"
                borderRadius="full"
                height="54"
                src={ProfileIconURLOrImage}
                width="54"
              />
            ) : (
              ProfileIconURLOrImage
            )}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              marginLeft="12"
              ref={initialFocusRef}
            >
              <Text color="modalText" lineHeight="1.2" size="23" weight="heavy">
                {address}
              </Text>
              <Box alignItems="center" as="div" display="flex">
                {logoURI && (
                  <Box
                    alt={name}
                    as="img"
                    borderRadius="6"
                    height="20"
                    marginRight="6"
                    src={logoURI}
                    width="20"
                  />
                )}
                <Text
                  color="modalTextSecondary"
                  lineHeight="1"
                  size="16"
                  weight="bold"
                >
                  {bal} {symbol}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box
            aria-label="Close"
            as="button"
            className={modalStyles.CloseButton}
            onClick={toggle}
            type="button"
          >
            <CloseIcon />
          </Box>
          <Divider />
          <Box alignItems="center" display="flex" flexDirection="row">
            <Box color="menuText">
              <CopyIcon />
            </Box>
            <Box display="flex" flexDirection="column" marginLeft="10">
              <Text color="menuText" size="16" weight="bold">
                Copy Address
              </Text>
              <Text color="menuTextSecondary" size="16" weight="bold">
                {shortenAddress(accountAddress)}
              </Text>
            </Box>
          </Box>
          <Divider />
          <Box
            alignItems="center"
            as="a"
            color="menuText"
            display="flex"
            href={`${explorerUrl}/address/${accountAddress}`}
          >
            <ExplorerIcon />{' '}
            <Box as="span" fontWeight="bold" marginLeft="10">
              View on {explorerName}
            </Box>
          </Box>
          <Divider />
          <Box
            alignItems="center"
            color="menuTextDisconnect"
            display="flex"
            onClick={() => disconnect()}
          >
            <DisconnectIcon />{' '}
            <Box as="span" fontWeight="bold" marginLeft="10">
              Disconnect
            </Box>
          </Box>
        </div>
        {txHistoryProps && <TxHistory {...txHistoryProps} />}
      </Dialog>
    );
  }
);

WalletDialog.displayName = 'WalletDialog';
