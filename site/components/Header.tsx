import {
  ConnectButton,
  darkTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { vars } from 'css/vars.css';
import React, { useEffect, useState } from 'react';
import { chains, Provider } from './Provider';
import { Wrapper } from './Wrapper/Wrapper';

export function Header() {
  const [mode, setMode] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
  }, [mode]);

  return (
    <div
      style={{
        backdropFilter: 'blur(8px)',
        backgroundColor: vars.colors.backgroundElevated,
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        justifyContent: 'space-between',
        left: 0,
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 10,
      }}
    >
      <Wrapper>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <img
            alt="Rainbow logo"
            src="/rainbow-avatar.png"
            style={{
              borderRadius: 12,
              height: 38,
              width: 38,
            }}
          />
          <button
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            type="button"
          >
            mode
          </button>
          <Provider>
            <RainbowKitProvider chains={chains} theme={darkTheme()}>
              <ConnectButton />
            </RainbowKitProvider>{' '}
          </Provider>
        </div>
      </Wrapper>
    </div>
  );
}
