import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

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

export default Home;
