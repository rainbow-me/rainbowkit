import {
  ConnectButton,
  darkTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { Badge } from 'components/Badge/Badge';
import { Box } from 'components/Box/Box';
import { chains, Provider } from 'components/Provider/Provider';
import { Text } from 'components/Text/Text';
import React from 'react';
import { header, logo, row } from './Header.css';

export function Header({
  docsMobileMenuRef,
  ...props
}: {
  docsMobileMenuRef?: React.RefObject<HTMLDivElement>;
}) {
  return (
    <Box className={header} {...props}>
      <Box className={row}>
        <Box
          alt="Rainbow logo"
          as="img"
          className={logo}
          marginRight="4"
          src="/rainbow-avatar.png"
        />

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
          <Badge>0.0.2</Badge>
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
