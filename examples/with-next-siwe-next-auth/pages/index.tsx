import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { getAuthOptions } from './api/auth/[...nextauth]';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      session: await unstable_getServerSession(req, res, getAuthOptions(req)),
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
