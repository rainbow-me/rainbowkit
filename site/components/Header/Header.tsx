import {
  ConnectButton,
  type Locale,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { Badge } from 'components/Badge/Badge';
import { Box } from 'components/Box/Box';
import { Text } from 'components/Text/Text';
import { vars } from 'css/vars.css';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import type React from 'react';
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
  const { locale } = useRouter() as { locale: Locale };
  return (
    <Box className={sticky ? header : undefined} {...props}>
      <Box className={row}>
        <NextLink href="/" legacyBehavior>
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
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={{ xs: '1', sm: '4' }}
        >
          <Text style={{ lineHeight: 1 }} variant="title3" weight="bold">
            RainbowKit
          </Text>
          <Badge>{RAINBOWKIT_VERSION}</Badge>
        </Box>

        <Box style={{ marginLeft: 'auto' }}>
          <RainbowKitProvider
            theme={
              darkMode
                ? darkTheme({ accentColor: vars.colors.blue })
                : lightTheme({ accentColor: vars.colors.blue })
            }
            locale={locale}
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
          paddingX={{ xs: '6', sm: '6', md: '10', lg: '10' }}
          paddingY="4"
          ref={docsMobileMenuRef}
        />
      )}
    </Box>
  );
}
