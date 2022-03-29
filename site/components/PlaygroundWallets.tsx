import * as RadioGroup from '@radix-ui/react-radio-group';
import {
  Chain,
  connectorsForWallets,
  DesktopOptions,
  dialogContent,
  RainbowKitProvider,
  wallet,
} from '@rainbow-me/rainbowkit';
import React, { useState } from 'react';
import { chain } from 'wagmi';
import { radio } from '../css/radio.css';
import { infuraId, Provider } from './Provider';
import { Wrapper } from './Wrapper/Wrapper';

export const chains: Chain[] = [
  { ...chain.mainnet, name: 'Ethereum' },
  { ...chain.polygonMainnet, name: 'Polygon' },
  { ...chain.optimism, name: 'Optimism' },
  { ...chain.arbitrumOne, name: 'Arbitrum' },
];

const walletRainbow = wallet.rainbow({ chains, infuraId });
const walletWalletConnect = wallet.walletConnect({ chains, infuraId });
const walletCoinbase = wallet.coinbase({
  appName: 'My RainbowKit App',
  chains,
  jsonRpcUrl: ({ chainId }) =>
    chains.find(x => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0],
});

const walletMetaMask = wallet.metaMask({ chains, infuraId });

export const connectors = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [walletRainbow, walletWalletConnect],
  },
]);
export const connectors1 = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [walletRainbow, walletWalletConnect, walletCoinbase],
  },
]);
export const connectors2 = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [
      walletRainbow,
      walletWalletConnect,
      walletCoinbase,
      walletMetaMask,
    ],
  },
]);
export const connectors3 = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [walletWalletConnect, walletCoinbase, walletMetaMask],
  },
]);
export const connectors4 = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [walletCoinbase, walletMetaMask],
  },
]);

const allConnectors = [
  connectors,
  connectors1,
  connectors2,
  connectors3,
  connectors4,
];

export function PlaygroundWallets() {
  const [index, setIndex] = useState<any>(0);

  const handleChange = value => setIndex(Number(value));

  return (
    <Provider connectors={allConnectors[index]}>
      <RainbowKitProvider chains={chains} id="playground-wallets">
        <Wrapper style={{ marginBottom: 80, maxWidth: 'fit-content' }}>
          <div
            style={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 24,
              display: 'flex',
              height: 510,
              justifyContent: 'center',
              margin: '0 auto',
              width: 712,
            }}
          >
            <div
              className={dialogContent}
              style={{
                width: 712,
              }}
            >
              <DesktopOptions onClose={() => {}} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 60, marginTop: 80 }}>
            <div>
              <h4>Configuration</h4>
              <ControlBox>
                <RadioGroup.Root
                  name="mode"
                  onValueChange={handleChange}
                  style={{ display: 'inline-flex', gap: 22 }}
                  value={String(index)}
                >
                  <RadioGroup.Item className={radio} data-label="1" value="0" />
                  <RadioGroup.Item className={radio} data-label="2" value="1" />
                  <RadioGroup.Item className={radio} data-label="3" value="2" />
                  <RadioGroup.Item className={radio} data-label="4" value="3" />
                  <RadioGroup.Item className={radio} data-label="5" value="4" />
                </RadioGroup.Root>
              </ControlBox>
            </div>
          </div>
        </Wrapper>
      </RainbowKitProvider>
    </Provider>
  );
}

function ControlBox(props) {
  return (
    <div
      style={{
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        marginTop: 22,
      }}
      {...props}
    />
  );
}
