import {
  ConnectButton,
  darkTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { Badge } from 'components/Badge/Badge';
import { Box } from 'components/Box/Box';
import { vars } from 'css/vars.css';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { chains, Provider } from '../Provider';
import { header, logo, row, title } from './Header.css';

export function Header({
  docsMobileMenuRef,
}: {
  docsMobileMenuRef?: React.RefObject<HTMLDivElement>;
}) {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
  }, [mode]);

  return (
    <Box className={header}>
      <Box className={row}>
        <NextLink href="/">
          <img alt="Rainbow logo" className={logo} src="/rainbow-avatar.png" />
        </NextLink>
        <span className={title}>RainbowKit</span>
        <Badge>0.0.1</Badge>

        <button
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          style={{ all: 'unset', color: vars.colors.label }}
          type="button"
        >
          &nbsp;&nbsp;&nbsp;
        </button>
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
          paddingX="10"
          paddingY="4"
          ref={docsMobileMenuRef}
        />
      )}
    </Box>
  );
}
