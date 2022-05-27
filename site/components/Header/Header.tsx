import {
  ConnectButton,
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { Badge } from 'components/Badge/Badge';
import { Box } from 'components/Box/Box';
import { chains } from 'components/Provider/Provider';
import { Text } from 'components/Text/Text';
import { vars } from 'css/vars.css';
import NextLink from 'next/link';
import React from 'react';
import pckg from '../../../packages/rainbowkit/package.json';
import { header, logo, row } from './Header.css';

const RAINBOWKIT_VERSION = pckg.version;

export function Header({
  darkMode,
  docsMobileMenuRef,
  sticky,
  ...props
}: {
  darkMode?: boolean;
  docsMobileMenuRef?: React.RefObject<HTMLDivElement>;
  sticky?: boolean;
}) {
  return (
    <Box className={sticky ? header : undefined} {...props}>
      <Box className={row}>
        <NextLink href="/">
          <Box
            alt="Rainbow logo"
            as="img"
            className={logo}
            marginRight="4"
            src="/rainbow.svg"
            transform={{
              active: 'shrink',
              hover: 'grow',
            }}
            transitionDuration="100"
            transitionProperty="transform"
            transitionTimingFunction="ease"
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
          <RainbowKitProvider
            chains={chains}
            theme={
              darkMode
                ? darkTheme({ accentColor: vars.colors.blue })
                : lightTheme({ accentColor: vars.colors.blue })
            }
          >
            <ConnectButton
              accountStatus={{ largeScreen: 'full', smallScreen: 'avatar' }}
            />
          </RainbowKitProvider>{' '}
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
