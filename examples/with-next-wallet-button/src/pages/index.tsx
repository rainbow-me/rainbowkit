import type { NextPage } from 'next';
import { WalletButton } from '@rainbow-me/rainbowkit';
import { useConnect, useConnection, useConnectors, useDisconnect } from 'wagmi';

const Home: NextPage = () => {
  const { isConnected } = useConnection();
  const { mutate: disconnect } = useDisconnect();
  const connectors = useConnectors();
  const { mutate: connect } = useConnect();
  const [metaMaskConnector, coinbaseConnector] = connectors.slice(2);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <span>RainbowKit WalletButton</span>

        <WalletButton wallet="rainbow" />

        <span>RainbowKit WalletButton.Custom</span>

        <WalletButton.Custom wallet="ready">
          {({ ready, connect, connector }) => {
            return (
              <button type="button" disabled={!ready} onClick={connect}>
                {connector.name}
              </button>
            );
          }}
        </WalletButton.Custom>

        <span>Wagmi Connectors</span>

        <button
          type="button"
          onClick={() => connect({ connector: metaMaskConnector })}
          key={metaMaskConnector.id}
        >
          MetaMask SDK
        </button>

        <button
          type="button"
          onClick={() => connect({ connector: coinbaseConnector })}
          key={coinbaseConnector.id}
        >
          Coinbase SDK
        </button>

        {isConnected && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
