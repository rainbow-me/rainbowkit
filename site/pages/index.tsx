import { Box } from 'components/Box/Box';
import { Button } from 'components/Button/Button';
import { Header } from 'components/Header/Header';
import { CheckIcon } from 'components/Icons/Check';
import { CopyIcon } from 'components/Icons/Copy';
import { TickIcon } from 'components/Icons/Tick';
import { Link } from 'components/Link/Link';
import { Playground } from 'components/Playground/Playground';
import { Text } from 'components/Text/Text';
import { TitleAndMetaTags } from 'components/TitleAndMetaTags/TitleAndMetaTags';
import { Wrapper } from 'components/Wrapper/Wrapper';
import copy from 'copy-to-clipboard';
import { vars } from 'css/vars.css';
import { useCoolMode } from 'lib/useCoolMode';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React, { Ref, useState } from 'react';

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
          <Box marginBottom="8">
            <InstallScript />
          </Box>
          <Box marginBottom="11">
            <NextLink href="/docs" passHref>
              <Button as="a" size="xl" variant="purpleGradient">
                View the Docs
              </Button>
            </NextLink>
          </Box>
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
            transform: 'translate3d(-50%, -50%, 0)',
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
              <NextImage height="1136" src="/hero-modal.png" width="1568" />
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
              <NextImage height="1064" src="/hero-iphone.png" width="580" />
            </Box>
          </Box>
        </Wrapper>
      </Box>

      <Playground />

      <Box
        backgroundColor="backgroundElevated"
        style={{
          backgroundImage: 'linear-gradient(to bottom, #000, #1C1D1F)',
          padding: '128px 0',
        }}
      >
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
              maxWidth: 720,
              textAlign: 'center',
            }}
            variant="title2"
            weight="semibold"
          >
            RainbowKit provides a fast, easy and highly customizable way for
            developers to add a great wallet experience to their application. We
            handle the hard stuff so developers and teams can focus on building
            amazing products and communities for their users.
          </Text>

          <Box marginTop="11" marginX="auto">
            <Box
              as="ul"
              display="flex"
              flexWrap="wrap"
              // eslint-disable-next-line sort-keys-fix/sort-keys-fix
              marginLeft={{ md: '10', lg: '11' }}
              paddingLeft={{ lg: '11' }}
              paddingY="5"
            >
              {[
                'Easy Installation',
                'Custom Themes',
                'Built-in Themes',
                'Custom Wallets List',
                'Light and Dark Mode',
                'Custom Chains',
                'App Store and Google Play Integration',
                'Custom Connect Button',
              ].map(value => (
                <Box
                  alignItems="center"
                  as="li"
                  display="flex"
                  gap="4"
                  key={value}
                  marginBottom="5"
                  whiteSpace="nowrap"
                  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
                  width={{ xs: 'full', md: '1/2' }}
                >
                  <Box as="span" flexShrink={0}>
                    <TickIcon />
                  </Box>
                  <Text weight="bold">{value}</Text>
                </Box>
              ))}
            </Box>
            <Box
              marginTop="11"
              // eslint-disable-next-line sort-keys-fix/sort-keys-fix
              textAlign={{ xs: 'left', md: 'center' }}
            >
              <NextLink href="/docs" passHref>
                <Button
                  as="a"
                  size="xl"
                  style={{ alignSelf: 'flex-start' }}
                  variant="purpleGradient"
                >
                  View the Docs
                </Button>
              </NextLink>
            </Box>
          </Box>
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
              fontSize: 52,
              lineHeight: '56px',
              textAlign: 'center',
            }}
            weight="bold"
          >
            Made with ❤️ by your frens at{' '}
            <Box
              as="span"
              marginLeft="2"
              style={{
                verticalAlign: 'middle',
              }}
            >
              <NextImage
                alt="Rainbow logo"
                height={56}
                src="/rainbow-logo.png"
                width={56}
              />
            </Box>
          </Text>
          <Text
            as="p"
            marginX="auto"
            marginY="9"
            style={{
              maxWidth: 720,
              textAlign: 'center',
            }}
            variant="title2"
            weight="semibold"
          >
            Building RainbowKit has been an incredibly fun effort across many
            people at Rainbow and our frens at other companies. We&apos;re
            always looking to make RainbowKit better, so please let us know how
            we can improve.
          </Text>

          <Box
            display="flex"
            // eslint-disable-next-line sort-keys-fix/sort-keys-fix
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap="8"
            justifyContent="center"
          >
            <Button
              as="a"
              href="https://twitter.com/rainbowdotme"
              size="xl"
              variant="blueGradient"
            >
              <Box
                as="span"
                marginX={{ sm: '4' }}
                textAlign="center"
                width="full"
              >
                Follow us on Twitter
              </Box>
            </Button>
            <Button as="a" href="" size="xl" variant="pinkGradient">
              <Box as="span" textAlign="center" width="full">
                Share feedback with us
              </Box>
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
            <Text size="4" weight="bold">
              <Link
                href="https://github.com/rainbow-me/rainbowkit"
                variant="gray"
              >
                <span>👾</span> github
              </Link>
            </Text>
            <Text size="4" weight="bold">
              <Link href="https://rainbow.me/media-kit.zip" variant="gray">
                <span>⬇️</span> media kit
              </Link>
            </Text>
            <Text size="4" weight="bold">
              <Link href="https://rainbow.me/terms-of-use" variant="gray">
                <span>📜</span> terms of use
              </Link>
            </Text>
            <Text size="4" weight="bold">
              <Link href="https://rainbow.me/privacy" variant="gray">
                <span>🔒</span> privacy policy
              </Link>
            </Text>
            <Text color="labelTertiary" size="4" weight="bold">
              © Rainbow
            </Text>
          </Box>
        </Wrapper>
      </Box>
    </Box>
  );
}

function InstallScript() {
  const [requestCopy, setRequestCopy] = useState(false);
  const code = 'npm i @rainbow-me/rainbowkit wagmi ethers';
  const ref = useCoolMode('/rainbow.svg') as Ref<HTMLButtonElement>;

  React.useEffect(() => {
    if (requestCopy) copy(code);
    setTimeout(() => setRequestCopy(false), 3000);
  }, [requestCopy]);

  return (
    <Box
      alignItems="center"
      backgroundColor="fillElevated"
      borderRadius="round"
      color="label"
      // eslint-disable-next-line sort-keys-fix/sort-keys-fix
      display={{ xs: 'none', md: 'inline-flex' }}
      fontSize="2"
      paddingX="7"
      style={{ height: 44, lineHeight: 1 }}
    >
      <code>{code}</code>
      <Button
        marginLeft="7"
        onClick={() => setRequestCopy(true)}
        ref={ref}
        shape="circle"
        size="xs"
        style={{
          color: requestCopy ? vars.colors.green : vars.colors.labelTertiary,
        }}
        tabIndex={-1}
        variant="ghost"
      >
        {requestCopy ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </Box>
  );
}
