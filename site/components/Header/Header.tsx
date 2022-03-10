import {
  ConnectButton,
  darkTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { chains, Provider } from 'components/Provider/Provider';
import { Wrapper } from 'components/Wrapper/Wrapper';
import React from 'react';

export function Header() {
  return (
    <div
      style={{
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(0,0,0,.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
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
