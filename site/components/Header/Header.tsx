import {
  ConnectButton,
  darkTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { Badge } from 'components/Badge/Badge';
import { Box } from 'components/Box/Box';
import { chains, Provider } from 'components/Provider/Provider';
import { Text } from 'components/Text/Text';
import NextLink from 'next/link';
import React from 'react';
import { header, logo, row } from './Header.css';

const RAINBOWKIT_VERSION = '0.0.2';

export function Header({
  docsMobileMenuRef,
  ...props
}: {
  docsMobileMenuRef?: React.RefObject<HTMLDivElement>;
}) {
  return (
    <Box className={header} {...props}>
      <Box className={row}>
        <NextLink href="/">
          <Box
            alt="Rainbow logo"
            as="img"
            className={logo}
            marginRight="4"
            src="/rainbow.svg"
          />
        </NextLink>

        <Box
          // eslint-disable-next-line sort-keys-fix/sort-keys-fix
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          display="flex"
          // eslint-disable-next-line sort-keys-fix/sort-keys-fix
          flexDirection={{ xs: 'column', sm: 'row' }}
          // eslint-disable-next-line sort-keys-fix/sort-keys-fix
          gap={{ xs: '1', sm: '4' }}
        >
          <Text style={{ lineHeight: 1 }} variant="title3" weight="bold">
            RainbowKit
          </Text>
          <Badge>{RAINBOWKIT_VERSION}</Badge>
        </Box>

        <Box style={{ marginLeft: 'auto' }}>
          <Provider>
            <RainbowKitProvider chains={chains} theme={darkTheme()}>
              <ConnectButton />
            </RainbowKitProvider>{' '}
          </Provider>
        </Box>
      </Box>
      {docsMobileMenuRef && (
        <Box
          borderBottomWidth="1"
          borderColor="separator"
          display={{ lg: 'none' }}
          // eslint-disable-next-line sort-keys-fix/sort-keys-fix
          paddingX={{ xs: '6', sm: '6', md: '10', lg: '10' }}
          paddingY="4"
          ref={docsMobileMenuRef}
        />
      )}
    </Box>
  );
}
