import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { ironOptions } from '../lib/iron';

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async context => {
    const address = context.req.session?.siwe?.address;

    if (!address) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {
        address,
      },
    };
  },
  ironOptions
);

type MeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Me = ({ address }: MeProps) => {
  return (
    <div style={{ marginBottom: '100vh' }}>
      {address !== '0x2896d64dB515686DB0CB8D8F084eF67e492687B8' ? (
        <h1 style={{ fontFamily: 'sans-serif' }}>✅ Signed in as {address}</h1>
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
