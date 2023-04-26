import { describe, expect, expectTypeOf, it } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
import { walletConnectWallet } from './walletConnectWallet';

describe('walletConnectWallet', () => {
  const chains = [mainnet];
  const projectId = 'test-project-id';

  it('without projectId', () => {
    const wallet = walletConnectWallet({ chains });
    const { connector } = wallet.createConnector();
    expect(connector.id).toBe('walletConnectLegacy');
    expectTypeOf(connector).toMatchTypeOf<WalletConnectLegacyConnector>();
  });

  it('with projectId', () => {
    const wallet = walletConnectWallet({ chains, projectId });
    const { connector } = wallet.createConnector();
    expect(connector.id).toBe('walletConnectLegacy');
    expectTypeOf(connector).toMatchTypeOf<WalletConnectLegacyConnector>();
  });

  it('v1 options', () => {
    const wallet = walletConnectWallet({
      chains,
      options: {
        qrcode: true,
        qrcodeModalOptions: {
          desktopLinks: ['ledger'],
          mobileLinks: ['rainbow'],
        },
      },
      projectId,
    });
    const { connector } = wallet.createConnector();

    expect(connector.id).toBe('walletConnectLegacy');
    expectTypeOf(connector).toMatchTypeOf<WalletConnectLegacyConnector>();

    expect(connector.options.qrcode).toBe(true);
    expect(connector.options.qrcodeModalOptions.desktopLinks).toHaveLength(1);
  });

  it('v2 options', () => {
    const wallet = walletConnectWallet({
      chains,
      options: {
        showQrModal: true,
      },
      projectId,
    });
    const { connector } = wallet.createConnector();

    expect(connector.id).toBe('walletConnectLegacy');
    expectTypeOf(connector).toMatchTypeOf<WalletConnectLegacyConnector>();

    expect(connector.options.qrcode).toBe(false);
    expect(connector.options.showQrModal).toBe(true);
    // needs additional tests once WalletConnectConnector migration is complete
  });
});
