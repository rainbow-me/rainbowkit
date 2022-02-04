import React from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Box } from '../Box/Box';
import { CloseIcon } from '../Icons/Close';
import { CopyIcon } from '../Icons/Copy';
import { Text } from '../Text/Text';
import { ProfileDetailsImageClassName } from './ProfileDetails.css';
import { ProfileDetailsAction } from './ProfileDetailsAction';
import { formatAddress } from './formatAddress';

interface ProfileDetailsProps {
  //   accountName: string | null;
  //   balance: string | null;
  //   disconnect: () => void;
  onClose: () => void;
}

export function ProfileDetails({ onClose }: ProfileDetailsProps) {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

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
    <Box display="flex" flexDirection="column" gap="24">
      {/* Top row */}
      <Box
        alignItems="flex-start"
        display="flex"
        flexDirection="row"
        height="48"
        justifyContent="space-between"
      >
        {/* details */}
        <Box display="flex" flexDirection="row">
          {/* img box */}
          {accountData.ens?.avatar ? (
            <Box marginRight="12">
              <img
                alt="ENS Avatar"
                className={ProfileDetailsImageClassName}
                src={accountData.ens.avatar}
              />
            </Box>
          ) : null}
          {/* name & balance box */}
          <Box display="flex" flexDirection="column">
            <Box marginBottom="6">
              <Text
                as="h1"
                color="modalText"
                id={titleId}
                // ref={initialFocusRef}
                size="20"
                tabIndex={-1}
                weight="bold"
              >
                {accountName}
              </Text>
            </Box>
            <Box>
              <Box>
                <Text
                  as="h1"
                  color="modalText"
                  id={titleId}
                  size="16"
                  tabIndex={-1}
                  weight="heavy"
                >
                  {balance} ETH
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Box */}
        <Box as="button" borderRadius="full" onClick={onClose}>
          <CloseIcon />
        </Box>
      </Box>
      {/* <Box
        as="button"
        borderRadius="full"
        color="modalText"
        fontFamily="body"
        onClick={disconnect}
        type="button"
      >
        Disconnect
      </Box> */}
      <ProfileDetailsAction
        action={() => {}}
        icon={<CopyIcon />}
        label="Copy Address"
      />
      <ProfileDetailsAction
        action={disconnect}
        icon={<CopyIcon />}
        label="Disconnect"
      />
    </Box>
  );
}
