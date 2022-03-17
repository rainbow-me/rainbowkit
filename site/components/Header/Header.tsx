import {
  ConnectButton,
  darkTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { Badge } from 'components/Badge/Badge';
import { vars } from 'css/vars.css';
import React, { useEffect, useState } from 'react';
import { chains, Provider } from '../Provider';
import { header, logo, title } from './Header.css';

export function Header() {
  const [mode, setMode] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
  }, [mode]);

  return (
    <div className={header}>
      <img alt="Rainbow logo" className={logo} src="/rainbow-avatar.png" />
      <span className={title}>RainbowKit</span>
      <Badge>0.0.1</Badge>

      <button
        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
        style={{ all: 'unset', color: vars.colors.label }}
        type="button"
      >
        &nbsp;&nbsp;&nbsp;
      </button>
      <div style={{ marginLeft: 'auto' }}>
        <Provider>
          <RainbowKitProvider chains={chains} theme={darkTheme()}>
            <ConnectButton />
          </RainbowKitProvider>{' '}
        </Provider>
      </div>
    </div>
  );
}
