import { Box } from 'components/Box/Box';
import { Button } from 'components/Button/Button';
import { Header } from 'components/Header/Header';
import { Link } from 'components/Link/Link';
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

      <Box
        backgroundColor="backgroundElevated"
        data-mode="light"
        style={{ padding: '128px 0' }}
      >
        <Wrapper>
          <Text
            as="h2"
            style={{
              alignItems: 'center',
              display: 'flex',
              fontSize: 52,
              gap: '4px',
              justifyContent: 'center',
              justifyItems: 'center',
              lineHeight: '56px',
              textAlign: 'center',
            }}
            weight="bold"
          >
            Made with ❤️ by your frens at{' '}
            <Box
              alt="Rainbow logo"
              as="img"
              borderRadius="3"
              src="/rainbow-avatar.png"
              style={{
                height: 56,
                verticalAlign: 'middle',
                width: 56,
              }}
            />
          </Text>
          <Text
            as="p"
            marginX="auto"
            marginY="9"
            style={{
              maxWidth: 760,
              textAlign: 'center',
            }}
            variant="title2"
          >
            Building RainbowKit has been an incredibly fun effort across many
            people at Rainbow and our frens at other companies. We$apos;re
            always looking to make RainbowKit better, so please let us know how
            we can improve.
          </Text>

          <Box display="flex" gap="8" justifyContent="center">
            <Button
              as="a"
              href="https://twitter.com/rainbowdotme"
              size="xl"
              variant="blueGradient"
            >
              Follow us on Twitter
            </Button>
            <Button as="a" href="" size="xl" variant="pinkGradient">
              Share feedback with us
            </Button>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap="6"
            justifyContent="center"
            style={{ marginTop: 128 }}
            textAlign="center"
          >
            <Text weight="bold">
              <Link variant="gray">GitHub</Link>
            </Text>
            <Text weight="bold">
              <Link variant="gray">media kit</Link>
            </Text>
            <Text weight="bold">
              <Link variant="gray">terms of use</Link>
            </Text>
            <Text weight="bold">
              <Link variant="gray">privacy policy</Link>
            </Text>
            <Text color="labelTertiary" weight="bold">
              © Rainbow
            </Text>
          </Box>
        </Wrapper>
      </Box>
    </Box>
  );
}
