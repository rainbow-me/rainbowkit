import { describe, expect, test } from 'vitest';
import { http, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { coinbaseWallet } from './coinbaseWallet.js';

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

describe('coinbaseWallet', () => {
  test('setup', () => {
    const connectorFn = coinbaseWallet({ appName: 'wagmi' });
    const connector = config._internal.connectors.setup(connectorFn);
    expect(connector.name).toEqual('Coinbase Wallet');
  });
});
