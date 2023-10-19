import { RainbowButton } from '@rainbow-me/button';
import type { NextPage } from 'next';
import { useAccount, useDisconnect } from 'wagmi';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
      <RainbowButton wallet='rainbow' />
      {isMounted && isConnected && (
        <button onClick={() => disconnect()}>Disconnect</button>
      )}
    </div>
  );
};

export default Home;
