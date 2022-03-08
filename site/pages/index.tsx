import {
  ConnectButton,
  darkTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import React from 'react';
import { Blur } from '../components/Blur/Blur';
import { Playground } from '../components/Playground/Playground';
import { PlaygroundWallets } from '../components/Playground/PlaygroundWallets';
import { chains, Provider } from '../components/Provider/Provider';
import { Wrapper } from '../components/Wrapper/Wrapper';

const Home = () => {
  return (
    <>
      <Wrapper style={{ position: 'relative', zIndex: 0 }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '24px 0',
          }}
        >
          <img
            alt="Rainbow logo"
            src="rainbow-avatar.png"
            style={{
              borderRadius: 12,
              height: 38,
              width: 38,
            }}
          />
          <Provider>
            <RainbowKitProvider chains={chains} theme={darkTheme()}>
              <ConnectButton />
            </RainbowKitProvider>{' '}
          </Provider>
        </header>
        <main style={{ textAlign: 'center' }}>
          <h1
            style={{
              background: 'linear-gradient(270deg, #7E51FF 0%, #5790FF 100%)',
              display: 'inline-block',
              fontSize: 40,
              marginTop: 60,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            RainbowKit
          </h1>
          <h2 style={{ fontSize: 60, margin: '5px 0 20px' }}>
            The best way to connect a wallet
          </h2>
          <h3 style={{ fontSize: 28, fontWeight: 600 }}>
            Designed for everyone. Built for developers.
          </h3>
        </main>
        <img
          alt="hero"
          src="hero.png"
          style={{ display: 'block', margin: '60px 0', width: '100%' }}
        />
      </Wrapper>
      <Blur style={{ right: 0, top: 0 }} />
      <Blur style={{ left: 0, top: 400 }} />

      <section
        style={{
          background: 'linear-gradient(180deg, #6F55F2 0%, #3F21D9 100%)',
          padding: '160px 0',
        }}
      >
        <Wrapper>
          <h2 style={{ fontSize: 60, margin: '0 0 32px', textAlign: 'center' }}>
            Customization made easy.
          </h2>
          <p
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 0.6,
              lineHeight: '33px',
              margin: '0 auto 80px',
              maxWidth: 760,
              textAlign: 'center',
            }}
          >
            Customize apprearance, color and corner radius Get a feel for it
            below!
          </p>
        </Wrapper>
        <Provider>
          <Playground />
        </Provider>
      </section>
      <section
        style={{
          background: 'linear-gradient(180deg, #6F55F2 0%, #3F21D9 100%)',
          padding: '160px 0',
        }}
      >
        <Wrapper>
          <h2 style={{ fontSize: 60, margin: '0 0 32px', textAlign: 'center' }}>
            Configurable to your needs.
          </h2>
          <p
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 0.6,
              lineHeight: '33px',
              margin: '0 auto 80px',
              maxWidth: 760,
              textAlign: 'center',
            }}
          >
            Cofigure which wallet providers to expose - all through an
            easy-to-use API. Get a feel for it below!
          </p>
        </Wrapper>

        <PlaygroundWallets />
      </section>
    </>
  );
};

export default Home;
