import type { NextPage } from 'next';
import { useAccount, useDisconnect } from 'wagmi';
import { RainbowButton } from '@rainbow-me/rainbow-button';

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

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
      {isConnected && <button onClick={() => disconnect()}>Disconnect</button>}
    </div>
  );
};

export default Home;
