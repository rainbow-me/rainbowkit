import React, { useCallback, useEffect, useState } from 'react';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { chainIdToExplorerLink } from '../../utils/chainIdToExplorerLink';
import { Avatar } from '../Avatar/Avatar';
import { Box } from '../Box/Box';
import { formatAddress } from '../ConnectButton/formatAddress';
import ConnectOptions from '../ConnectOptions/ConnectOptions';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { CloseIcon } from '../Icons/Close';
import { CopyIcon } from '../Icons/Copy';
import { DisconnectIcon } from '../Icons/Disconnect';
import { ExploreIcon } from '../Icons/Explore';
import { SwitchAccountIcon } from '../Icons/SwitchAccount';
import { Text } from '../Text/Text';
import { CloseButtonClassName } from './ProfileDetails.css';
import { ProfileDetailsAction } from './ProfileDetailsAction';

interface ProfileDetailsProps {
  accountData: ReturnType<typeof useAccount>[0]['data'];
  balanceData: ReturnType<typeof useBalance>[0]['data'];
  networkData: ReturnType<typeof useNetwork>[0]['data'];
  onClose: () => void;
  onDisconnect: () => void;
}

export function ProfileDetails({
  accountData,
  balanceData,
  networkData,
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

  if (!accountData || !networkData) {
    return null;
  }

  const accountName =
    accountData.ens?.name ?? formatAddress(accountData.address);
  const ethBalance = balanceData?.formatted;
  const balance = Number(ethBalance).toPrecision(3);
  const titleId = 'rk_profile_title';

  const explorerUrl = `${chainIdToExplorerLink(networkData?.chain?.id)}${
    accountData.address
  }`;

  return (
    <>
      <Box display="flex" flexDirection="column" gap="12">
        <Box
          alignItems="flex-start"
          display="flex"
          flexDirection="row"
          height="54"
          justifyContent="space-between"
          margin="10"
        >
          <Box display="flex" flexDirection="row" gap="12">
            <Avatar
              address={accountData.address}
              imageUrl={accountData.ens?.avatar}
              size={54}
            />
            <Box display="flex" flexDirection="column">
              <Box marginBottom="6">
                <Text
                  as="h1"
                  color="modalText"
                  id={titleId}
                  size="23"
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
                      size="16"
                      weight="heavy"
                    >
                      {balance} {balanceData.symbol}
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            as="button"
            borderRadius="full"
            className={CloseButtonClassName}
            height="34"
            onClick={onClose}
          >
            <CloseIcon />
          </Box>
        </Box>
        <Box background="menuDivider" borderRadius="6" height="2" marginX="8" />
        <ProfileDetailsAction
          action={copyAddressAction}
          color="modalText"
          icon={<CopyIcon />}
          label={copiedAddress ? 'Copied!' : 'Copy Address'}
        />
        <ProfileDetailsAction
          action={() => {}}
          color="modalText"
          icon={<ExploreIcon />}
          label="View on Explorer"
          url={explorerUrl}
        />
        <ProfileDetailsAction
          action={() => setSwitchWalletOpen(true)}
          color="modalText"
          icon={<SwitchAccountIcon />}
          label="Switch Accounts"
        />
        <ProfileDetailsAction
          action={onDisconnect}
          color="error"
          icon={<DisconnectIcon />}
          label="Disconnect"
        />
      </Box>
      <Dialog
        onClose={() => setSwitchWalletOpen(false)}
        open={switchWalletOpen}
        titleId={titleId}
      >
        <DialogContent>
          <ConnectOptions onClose={() => setSwitchWalletOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
