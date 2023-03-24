import { WalletButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: 10,
        width: 288,
      }}
    >
      <WalletButton wallet='rainbow'/>
      <WalletButton wallet='metaMask'/>
      <WalletButton wallet='coinbase'/>
    </div>
    </div>
  );
};

export default Home;
