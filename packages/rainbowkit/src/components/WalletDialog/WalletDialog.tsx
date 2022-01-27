import React, { useRef } from 'react';
// import { useExplorerName } from '../../hooks/useExplorerName';
import { useSelectedWalletWithBalance } from '../../hooks/useSelectedWalletWithBalance';
import { Box } from '../Box/Box';
import { Dialog } from '../Dialog/Dialog';
import * as styles from '../Modal/Modal.css';
import { CloseIcon } from '../Modal/icons';
import { DropdownProps } from '../Profile/Profile';
import { Text } from '../Text/Text';

export const WalletDialog = ({
  accountAddress,
  address,
  chainId,
  disconnect,
  isExpanded,
  profileIcon: ProfileIconURLOrImage,
  provider,
}: DropdownProps) => {
  // const explorerName = useExplorerName(chainId);

  const { bal, logoURI, name, symbol } = useSelectedWalletWithBalance({
    address: accountAddress,
    chainId,
    provider,
  });

  const initialFocusRef = useRef<HTMLHeadingElement | null>(null);
  const titleId = 'rk_walletdialog_title';

  return (
    <Dialog open={isExpanded} {...{ initialFocusRef, titleId }}>
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
        className={styles.CloseButton}
        onClick={() => disconnect()}
        type="button"
      >
        <CloseIcon />
      </Box>
      <Box
        as="hr"
        background="menuDivider"
        borderRadius="1"
        height="4"
        marginBottom="12"
      />
    </Dialog>
  );
};
