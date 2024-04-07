import { describe, expectTypeOf, it } from 'vitest';
import { CreateConnectorFn } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';
import { createWagmiConnector } from './createWagmiConnector';

describe('createWagmiConnector', () => {
  const projectId = '21fef48091f12692cad574a6f7753643';
  const metaData = {
    title: 'Custom title',
    description: 'Custom description',
  };

  it('should return wagmi connector type for an injected wallet', () => {
    const injectedConnector = injected();
    const wagmiConnector = createWagmiConnector({
      connector: injectedConnector,
    });

    expectTypeOf(wagmiConnector).toMatchTypeOf<CreateConnectorFn>();
  });

  it('should return wagmi connector type for an injected wallet with meta data', () => {
    const injectedConnector = injected();
    const wagmiConnector = createWagmiConnector({
      connector: injectedConnector,
      metaData,
    });

    expectTypeOf(wagmiConnector).toMatchTypeOf<CreateConnectorFn>();
  });

  it('should return wagmi connector type for a WalletConnect wallet', () => {
    const walletConnectConnector = walletConnect({
      projectId,
    });
    const wagmiConnector = createWagmiConnector({
      connector: walletConnectConnector,
    });

    expectTypeOf(wagmiConnector).toMatchTypeOf<CreateConnectorFn>();
  });

  it('should return wagmi connector type for a WalletConnect wallet with meta data', () => {
    const walletConnectConnector = walletConnect({
      projectId,
    });
    const wagmiConnector = createWagmiConnector({
      connector: walletConnectConnector,
      metaData,
    });

    expectTypeOf(wagmiConnector).toMatchTypeOf<CreateConnectorFn>();
  });
});
