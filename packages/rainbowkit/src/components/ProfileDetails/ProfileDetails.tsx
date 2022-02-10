import React from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Box } from '../Box/Box';
import { formatAddress } from '../ConnectButton/formatAddress';
import { CloseIcon } from '../Icons/Close';
import { CopyIcon } from '../Icons/Copy';
import { DisconnectIcon } from '../Icons/Disconnect';
import { ExploreIcon } from '../Icons/Explore';
import { SwitchAccountIcon } from '../Icons/SwitchAccount';
import { Text } from '../Text/Text';
import { ProfileDetailsImageClassName } from './ProfileDetails.css';
import { ProfileDetailsAction } from './ProfileDetailsAction';

interface ProfileDetailsProps {
  accountData: ReturnType<typeof useAccount>[0]['data'];
  initialFocusRef: React.MutableRefObject<HTMLHeadingElement | null>;
  onClose: () => void;
  onDisconnect: () => void;
}

export function ProfileDetails({
  accountData,
  initialFocusRef,
  onClose,
  onDisconnect,
}: ProfileDetailsProps) {
  const [{ data: balanceData }] = useBalance({
    addressOrName: accountData?.address,
  });

  if (!accountData) {
    return null;
  }

  const accountName =
    accountData.ens?.name ?? formatAddress(accountData.address);
  const ethBalance = balanceData?.formatted;
  const balance = Number(ethBalance).toPrecision(3);
  const titleId = 'rk_profile_title';

  return (
    <Box display="flex" flexDirection="column" gap="12">
      <Box
        alignItems="flex-start"
        display="flex"
        flexDirection="row"
        height="48"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="row">
          {accountData.ens?.avatar ? (
            <Box marginRight="12">
              <img
                alt="ENS Avatar"
                className={ProfileDetailsImageClassName}
                src={accountData.ens.avatar}
              />
            </Box>
          ) : null}
          <Box display="flex" flexDirection="column">
            <Box marginBottom="6">
              <Text
                as="h1"
                color="modalText"
                id={titleId}
                ref={initialFocusRef}
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
                    color="modalText"
                    id={titleId}
                    size="16"
                    weight="heavy"
                  >
                    {balance} ETH
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box as="button" borderRadius="full" onClick={onClose}>
          <CloseIcon />
        </Box>
      </Box>
      <ProfileDetailsAction
        action={() => {}}
        color="modalText"
        icon={<CopyIcon />}
        label="Copy Address"
      />
      <ProfileDetailsAction
        action={() => {}}
        color="modalText"
        icon={<ExploreIcon />}
        label="View on Etherscan"
      />
      <ProfileDetailsAction
        action={() => {}}
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
  );
}
