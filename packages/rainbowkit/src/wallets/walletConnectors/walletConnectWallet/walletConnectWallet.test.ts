import { describe, expect, expectTypeOf, it } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
import { walletConnectWallet } from './walletConnectWallet';

describe('walletConnectWallet', () => {
  const chains = [mainnet];
  const projectId = 'test-project-id';

  it('without projectId', () => {
    // @ts-ignore - intentionally missing projectId for v2 default
    const wallet = walletConnectWallet({ chains });
    // eslint-disable-next-line jest/require-to-throw-message
    expect(() => wallet.createConnector()).toThrowError();
  });

  it('with projectId', () => {
    const wallet = walletConnectWallet({ chains, projectId });
    const { connector } = wallet.createConnector();
    expect(connector.id).toBe('walletConnect');
    expectTypeOf(connector).toMatchTypeOf<WalletConnectConnector>();
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
      version: '1',
    });
    const { connector } = wallet.createConnector();

    expect(connector.id).toBe('walletConnectLegacy');
    expectTypeOf(connector).toMatchTypeOf<WalletConnectLegacyConnector>();

    expect(connector.options.qrcode).toBe(true);
    expect(connector.options.qrcodeModalOptions.desktopLinks).toHaveLength(1);
  });

  it('v1 custom bridge option', () => {
    const wallet = walletConnectWallet({
      chains,
      options: {
        bridge: 'https://bridge.myhostedserver.com',
      },
      version: '1',
    });
    const { connector } = wallet.createConnector();

    expect(connector.id).toBe('walletConnectLegacy');
    expectTypeOf(connector).toMatchTypeOf<WalletConnectLegacyConnector>();
  });

  it('v2 options', () => {
    const wallet = walletConnectWallet({
      chains,
      options: {
        showQrModal: true,
      },
      projectId,
      version: '2',
    });
    const { connector } = wallet.createConnector();

    expect(connector.id).toBe('walletConnect');
    expectTypeOf(connector).toMatchTypeOf<WalletConnectConnector>();

    expect(connector.options.qrcode).toBe(undefined);
    expect(connector.options.showQrModal).toBe(true);
  });

  it('v2 walletConnectOptions', () => {
    const wallet = walletConnectWallet({
      chains,
      options: {
        showQrModal: true,
      },
      projectId,
      version: '2',
    });
    const { connector } = wallet.createConnector();

    expect(connector.id).toBe('walletConnect');
    expectTypeOf(connector).toMatchTypeOf<WalletConnectConnector>();

    expect(connector.options.qrcode).toBe(undefined);
    expect(connector.options.showQrModal).toBe(true);
  });
});
