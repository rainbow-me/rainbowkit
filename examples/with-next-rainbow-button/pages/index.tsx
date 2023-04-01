import { RainbowButton } from '@rainbow-me/button';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <RainbowButton />
    </div>
  );
};

export default Home;
