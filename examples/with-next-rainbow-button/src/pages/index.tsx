import type { NextPage } from 'next';
import { useAccount, useDisconnect } from 'wagmi';
import {
  RainbowButton,
  useRainbowConnectModal,
} from '@rainbow-me/rainbow-button';

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useRainbowConnectModal();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: 10,
      }}
    >
      <RainbowButton />
      <button onClick={connect}>Custom Connect Button</button>
      {isConnected && <button onClick={() => disconnect()}>Disconnect</button>}
    </div>
  );
};

export default Home;
