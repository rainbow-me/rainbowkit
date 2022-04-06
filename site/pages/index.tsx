/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
import {
  bottomSheetOverrides,
  darkTheme,
  DesktopOptions,
  dialogContent,
  dialogContentMobile,
  dialogContentWideMobile,
  MobileOptions,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import clsx from 'clsx';
import { Box } from 'components/Box/Box';
import { Button } from 'components/Button/Button';
import { Header } from 'components/Header/Header';
import { Playground } from 'components/Playground/Playground';
// import { PlaygroundWallets } from 'components/PlaygroundWallets';
import { chains, Provider } from 'components/Provider';
import { Text } from 'components/Text/Text';
import { Wrapper } from 'components/Wrapper/Wrapper';
import React from 'react';

const Home = () => {
  return (
    <Box data-mode="dark">
      <Box
        style={{
          backgroundColor: '#131415',
          backgroundImage:
            'radial-gradient(50% 50% at 50% 50%, #053085 0%, rgba(19, 0, 96, 0) 100%)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center bottom',
          backgroundSize: '95% 70%',
        }}
        overflow="hidden"
      >
        <Header />
        <Box paddingY="11" marginY="11">
          <Wrapper style={{ position: 'relative', zIndex: 0 }}>
            <Box as="main" style={{ textAlign: 'center' }}>
              <Text
                as="h1"
                variant="titleLarge"
                marginBottom="6"
                weight="bold"
                style={{
                  background:
                    'linear-gradient(270deg, #7E51FF 0%, #5790FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                RainbowKit
              </Text>
              <Text
                as="h2"
                variant="titleLarge"
                weight="bold"
                marginBottom="8"
                style={{ fontSize: 52 }}
              >
                The best way to connect a wallet
              </Text>
              <Text as="h3" variant="title2" weight="bold" marginBottom="10">
                Designed for everyone. Built for developers.
              </Text>
              <Button variant="purpleGradient" size="l" marginBottom="11">
                View the Docs
              </Button>
            </Box>

            <Box
              position="relative"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              <Provider>
                <RainbowKitProvider
                  chains={chains}
                  id="hero"
                  theme={darkTheme()}
                >
                  <Box
                    className={dialogContent}
                    style={{
                      width: 712,
                      margin: '0 auto',
                    }}
                  >
                    <DesktopOptions onClose={() => {}} />
                  </Box>

                  <Phone>
                    <MobileOptions onClose={() => {}} />
                  </Phone>
                </RainbowKitProvider>
              </Provider>
            </Box>

            {/* <Box
              as="img"
              alt="hero"
              src="hero.png"
              marginTop="10"
              style={{ display: 'block', width: '100%' }}
            /> */}
          </Wrapper>
        </Box>
      </Box>

      <Provider>
        <Playground />
      </Provider>

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

        {/* <PlaygroundWallets /> */}
      </section>
    </Box>
  );
};

export default Home;

function Phone({ children }) {
  return (
    <Box
      style={{ width: 320, height: 484, position: 'relative' }}
      backgroundColor="background"
      className={clsx(
        dialogContentWideMobile,
        dialogContentMobile,
        bottomSheetOverrides
      )}
    >
      {children}
    </Box>
  );
}
