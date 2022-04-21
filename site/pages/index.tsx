import { Box } from 'components/Box/Box';
import { Button } from 'components/Button/Button';
import { Header } from 'components/Header/Header';
import { Playground } from 'components/Playground/Playground';
import { Text } from 'components/Text/Text';
import { TitleAndMetaTags } from 'components/TitleAndMetaTags/TitleAndMetaTags';
import { Wrapper } from 'components/Wrapper/Wrapper';
import { vars } from 'css/vars.css';
import Image from 'next/image';
import React from 'react';

export default function Home() {
  return (
    <Box
      backgroundColor="background"
      data-mode="dark"
      style={{ minHeight: '100vh', overflow: 'hidden' }}
    >
      <TitleAndMetaTags />
      <Header />
      <Wrapper>
        <Box marginTop="11" textAlign="center">
          <Text
            as="h1"
            marginBottom="3"
            style={{
              backgroundImage: `linear-gradient(270deg, ${vars.colors.purple50} 0%, ${vars.colors.blue50} 100%)`,
              display: 'inline-block',
              fontSize: 40,
              lineHeight: 1,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            weight="bold"
          >
            RainbowKit
          </Text>
          <Text
            as="h2"
            marginBottom="5"
            style={{ fontSize: 52, lineHeight: 1 }}
            weight="bold"
          >
            The best way to connect a wallet
          </Text>
          <Text
            as="p"
            marginBottom="10"
            size="5"
            style={{ lineHeight: 1 }}
            weight="semibold"
          >
            Designed for everyone. Built for developers.
          </Text>
          <Button marginBottom="11" size="xl" variant="purpleGradient">
            View the Docs
          </Button>
        </Box>
      </Wrapper>
      <Box position="relative">
        <Box
          backgroundColor="purple50"
          position="absolute"
          style={{
            borderRadius: '100%',
            filter: 'blur(150px)',
            height: '80%',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50vw',
            zIndex: '1',
          }}
        />
        <Wrapper position="relative" style={{ zIndex: '2' }}>
          <Box
            position="relative"
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            <Box
              display={{
                xs: 'none',
                // eslint-disable-next-line sort-keys-fix/sort-keys-fix
                md: 'block',
              }}
              style={{ maxWidth: 1568 / 2 }}
            >
              <Image height="1136" src="/hero-modal.png" width="1568" />
            </Box>
            <Box
              bottom="0"
              marginX="auto"
              position={{ md: 'absolute' }}
              right={{
                md: '0',
                // eslint-disable-next-line sort-keys-fix/sort-keys-fix
                lg: '-7',
              }}
              style={{ maxWidth: 580 / 2 }}
            >
              <Image height="1064" src="/hero-iphone.png" width="580" />
            </Box>
          </Box>
        </Wrapper>
      </Box>

      <Playground />

      <Box style={{ padding: '128px 0' }}>
        <Wrapper>
          <Text
            as="h2"
            style={{ fontSize: 52, lineHeight: 1, textAlign: 'center' }}
            weight="bold"
          >
            Rainbow 🤝 Developers
          </Text>
          <Text
            as="p"
            marginTop="9"
            marginX="auto"
            style={{
              maxWidth: 760,
              textAlign: 'center',
            }}
            variant="title2"
          >
            RainbowKit provides a fast, easy and highly customizable way for
            developers to add a great wallet experience to their application. We
            handle the hard stuff so developers and teams can focus on building
            amazing products and communities for their users.
          </Text>
        </Wrapper>
      </Box>
    </Box>
  );
}
