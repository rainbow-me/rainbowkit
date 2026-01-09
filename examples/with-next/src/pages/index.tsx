import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { GetServerSideProps, NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton />
    </div>
  );
};

// Opt out of static generation to avoid SSG errors with wagmi v3
// wagmi v3 requires hooks to be used within WagmiProvider context
export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default Home;
