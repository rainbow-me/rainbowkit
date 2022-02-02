import React from 'react';
import { isAddress, shortenAddress } from '../../utils/address';
import { Box, BoxProps } from '../Box/Box';
import { Text } from '../Text/Text';

export interface EthAddressProps extends BoxProps {
  address: string;
  profileIcon?: string | React.ComponentType<any>;
  shorten?: boolean;
  classNames?: Partial<{
    profileIcon: string;
    container: string;
    address: string;
  }>;
}

export const EthAddress = ({
  address: addr,
  classNames,
  profileIcon: ProfileIconURLOrImage,
  shorten,
  ...props
}: EthAddressProps) => {
  shorten = shorten === undefined && /^0x[a-fA-F0-9]{40}$/ ? true : shorten;

  return (
    <Box
      alignItems="center"
      className={classNames?.container}
      display="flex"
      flexDirection="row"
      justifyContent="center"
      width="max"
      {...props}
    >
      {ProfileIconURLOrImage &&
        (typeof ProfileIconURLOrImage === 'string' ? (
          <Box
            as="img"
            borderRadius="full"
            className={classNames?.profileIcon}
            height="24"
            marginRight="6"
            src={ProfileIconURLOrImage}
            width="24"
          />
        ) : (
          <ProfileIconURLOrImage />
        ))}

      <Text
        as="span"
        className={classNames?.address}
        color="dropdownButtonText"
        weight="heavy"
      >
        {(shorten && isAddress(addr) && shortenAddress(addr)) || addr}
      </Text>
    </Box>
  );
};
