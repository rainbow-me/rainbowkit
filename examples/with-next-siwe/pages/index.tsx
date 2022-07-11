import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { SiweMessage } from 'siwe';
import { useAccount, useNetwork, useSigner } from 'wagmi';
import UserInfo from '../components/UserInfo';

const useSIWE = () => {
  const { isConnected, address } = useAccount();
  const { data: session } = useSession();
  const { chain } = useNetwork();
  const { data: signer, isLoading } = useSigner();
  const login = useCallback(async () => {
    console.log('Login');
    if (chain && signer) {
      console.log('Login');
      const callbackUrl = '/protected';

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });
      console.log(message.prepareMessage());
      const signature = await signer.signMessage(message.prepareMessage());
      signIn('credentials', {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });
    }
  }, [signer, address, chain]);

  const logout = useCallback(() => {
    if (!isConnected) {
      console.log('Log Out');
      signOut();
    }
  }, [isConnected]);

  useEffect(() => {
    if (!isLoading && typeof session !== 'undefined') {
      if (isConnected && !session) {
        login();
      }
      if (session && !isConnected) {
        logout();
      }
    }
  }, [isConnected, isLoading, login, logout, session]);
};

const Home: NextPage = () => {
  const { data: session } = useSession();
  useSIWE();

  return (
    <>
      <header>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 12,
          }}
        >
          <ConnectButton />
        </div>
      </header>
      <main style={{ textAlign: 'center' }}>
        <UserInfo session={session} />
      </main>
    </>
  );
};

export default Home;
