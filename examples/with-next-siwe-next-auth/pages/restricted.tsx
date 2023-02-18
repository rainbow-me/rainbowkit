import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { getAuthOptions } from './api/auth/[...nextauth]';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(
    req,
    res,
    getAuthOptions(req)
  );

  if (!session)
    return {
      redirect: {
        statusCode: 301,
        destination: '/',
      },
    };

  return {
    props: { session },
  };
};

const Restricted: NextPage = () => {
  const { status } = useSession();
  const prevStatus = useRef(status);
  const router = useRouter();

  useEffect(() => {
    console.log({
      prev: prevStatus.current,
      curr: status,
    });

    if (
      prevStatus.current === 'authenticated' &&
      status === 'unauthenticated'
    ) {
      router.push('/');
    }
    prevStatus.current = status;
  }, [status]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 12,
        }}
      >
        <ConnectButton />
      </div>

      <h1>Restricted Page</h1>
      <Link href="/">Home</Link>
    </>
  );
};

export default Restricted;
