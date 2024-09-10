import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getToken } from 'next-auth/jwt';
import React from 'react';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req });
  const address = token?.sub ?? null;

  return {
    props: {
      address,
    },
  };
};

type MeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Me = ({ address }: MeProps) => {
  return (
    <div style={{ marginBottom: '100vh' }}>
      {address !== '0x2896d64dB515686DB0CB8D8F084eF67e492687B8' ? (
        <h1 style={{ fontFamily: 'sans-serif' }}>
          {address ? `✅ Signed in as ${address}` : '❌ Signed out'}
        </h1>
      ) : (
        <div
          style={{
            height: 0,
            marginBottom: '100vh',
            overflow: 'hidden',
            paddingBottom: '56.25%',
            position: 'relative',
          }}
        >
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            height="480"
            src="https://www.youtube.com/embed/zLhoDB-ORLQ?rel=0"
            style={{
              height: '100%',
              left: 0,
              position: 'absolute',
              top: 0,
              width: '100%',
            }}
            title="Oh hai mark"
            width="853"
          />
        </div>
      )}
    </div>
  );
};

export default Me;
