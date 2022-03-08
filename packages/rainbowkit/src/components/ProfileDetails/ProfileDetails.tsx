import React, { useCallback, useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Avatar } from '../Avatar/Avatar';
import { Box } from '../Box/Box';
import { CloseButton } from '../CloseButton/CloseButton';
import { formatAddress } from '../ConnectButton/formatAddress';
import ConnectOptions from '../ConnectOptions/ConnectOptions';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { CopyIcon } from '../Icons/Copy';
import { DisconnectIcon } from '../Icons/Disconnect';
import { SwitchAccountIcon } from '../Icons/SwitchAccount';
import { Text } from '../Text/Text';
import { TxList } from '../Txs/TxList';
import { ProfileDetailsAction } from './ProfileDetailsAction';

interface ProfileDetailsProps {
  accountData: ReturnType<typeof useAccount>[0]['data'];
  balanceData: ReturnType<typeof useBalance>[0]['data'];
  onClose: () => void;
  onDisconnect: () => void;
}

export function ProfileDetails({
  accountData,
  balanceData,
  onClose,
  onDisconnect,
}: ProfileDetailsProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const copyAddressAction = useCallback(() => {
    if (accountData?.address) {
      navigator.clipboard.writeText(accountData?.address);
      setCopiedAddress(true);
    }
  }, [accountData?.address]);

  const [switchWalletOpen, setSwitchWalletOpen] = useState(false);

  useEffect(() => {
    if (copiedAddress) {
      const timer = setTimeout(() => {
        setCopiedAddress(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [copiedAddress]);

  useEffect(() => {
    setSwitchWalletOpen(false);
  }, [accountData?.address]);

  if (!accountData) {
    return null;
  }

  const accountName =
    accountData.ens?.name ?? formatAddress(accountData.address);
  const ethBalance = balanceData?.formatted;
  const balance = Number(ethBalance).toPrecision(3);
  const titleId = 'rk_profile_title';

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box background="profileForeground" padding="16">
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap="12"
            justifyContent="center"
            margin="8"
            style={{ textAlign: 'center' }}
          >
            <CloseButton
              onClose={onClose}
              style={{
                position: 'absolute',
                right: 16,
                top: 16,
                willChange: 'tranform',
              }}
            />{' '}
            <Box>
              <Avatar
                address={accountData.address}
                imageUrl={accountData.ens?.avatar}
                size={74}
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <Box>
                <Text
                  as="h1"
                  color="modalText"
                  id={titleId}
                  size="18"
                  weight="heavy"
                >
                  {accountName}
                </Text>
              </Box>
              <Box>
                {balanceData && (
                  <Box>
                    <Text
                      as="h1"
                      color="modalTextSecondary"
                      id={titleId}
                      size="14"
                      weight="semibold"
                    >
                      {balance} {balanceData.symbol}
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="8"
            margin="2"
            marginTop="16"
          >
            <ProfileDetailsAction
              action={copyAddressAction}
              icon={<CopyIcon />}
              label={copiedAddress ? 'Copied!' : 'Copy'}
            />
            <ProfileDetailsAction
              action={() => setSwitchWalletOpen(true)}
              icon={<SwitchAccountIcon />}
              label="Switch"
            />
            <ProfileDetailsAction
              action={onDisconnect}
              icon={<DisconnectIcon />}
              label="Disconnect"
            />
          </Box>
        </Box>
        <Box background="modalBorder" height="1" />
        <Box>
          <TxList accountData={accountData} />
        </Box>
      </Box>
      <Dialog
        onClose={() => setSwitchWalletOpen(false)}
        open={switchWalletOpen}
        titleId={titleId}
        wide
      >
        <DialogContent bottomSheetOnMobile padding="0">
          <ConnectOptions onClose={() => setSwitchWalletOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
