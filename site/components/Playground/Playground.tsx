import * as RadioGroup from '@radix-ui/react-radio-group';
import {
  darkTheme,
  DesktopOptions,
  dialogContent,
  lightTheme,
  midnightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { Box } from 'components/Box/Box';
import { useMounted } from 'components/DocsMobileMenu/DocsMobileMenu';
import { MeshGradient } from 'components/MeshGradient/MeshGradient';
import { chains, Provider } from 'components/Provider/Provider';
import { Text } from 'components/Text/Text';
import { Wrapper } from 'components/Wrapper/Wrapper';
import { vars } from 'css/vars.css';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { radio, ring } from './Playground.css';

const THEMES = {
  dark: darkTheme,
  light: lightTheme,
  midnight: midnightTheme,
};

type Modes = keyof typeof THEMES;
type ThemeOptions = Parameters<typeof lightTheme>[0];
type Accents = ThemeOptions['accentColor'];
type Radii = ThemeOptions['borderRadius'];

const gradientColors: Record<Accents, any> = {
  blue: [
    [29, 100, 192],
    [47, 9, 148],
    [14, 116, 253],
  ],
  green: [
    [10, 80, 28],
    [42, 150, 140],
    [22, 160, 59],
  ],
  orange: [
    [255, 151, 31],
    [112, 0, 0],
    [250, 137, 51],
  ],
  pink: [
    [116, 6, 116],
    [238, 103, 176],
    [144, 12, 125],
  ],
  purple: [
    [150, 69, 235],
    [11, 21, 136],
    [106, 57, 224],
  ],
  red: [
    [83, 10, 6],
    [172, 22, 52],
    [189, 38, 13],
  ],
  yellow: [
    [83, 10, 6],
    [172, 22, 52],
    [189, 38, 13],
  ],
};

export function Playground() {
  const [mode, setMode] = useState<Modes>('light');
  const [accent, setAccent] = useState<Accents>('purple');
  const [radii, setRadii] = useState<Radii>('large');

  const handleModeChange = value => setMode(value);
  const handleAccentChange = value => setAccent(value);
  const handleRadiiChange = value => setRadii(value);

  const selectedTheme = THEMES[mode]({
    accentColor: accent,
    borderRadius: radii,
  });

  const gradient = gradientColors[accent];

  return useMounted() ? (
    <Box
      position="relative"
      style={{ marginTop: '128px ', padding: '128px 0' }}
    >
      <Box
        inset="0"
        position="absolute"
        style={{ height: '100%', width: '100%' }}
      >
        <MeshGradient
          u_c1={gradient[0]}
          u_c2={gradient[1]}
          u_c3={gradient[2]}
        />
      </Box>
      <Box position="relative">
        <Wrapper>
          <Text
            as="h2"
            style={{ fontSize: 52, lineHeight: 1, textAlign: 'center' }}
            weight="bold"
          >
            Give RainbowKit a spin
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
          >
            Make your Ethereum login experience feel right at home on your
            website. RainbowKit allows you to fully customize color, corner
            radius, wallet providers and a lot more — all through an easy-to-use
            API. Get a feel for it below!
          </Text>
        </Wrapper>

        <Provider>
          <RainbowKitProvider
            chains={chains}
            id="playground"
            theme={selectedTheme}
          >
            <Wrapper
              style={{
                marginBottom: vars.space[11],
                marginTop: vars.space[11],
                maxWidth: 'fit-content',
                pointerEvents: 'none',
              }}
            >
              <div
                className={dialogContent}
                style={{
                  width: 712,
                }}
              >
                <DesktopOptions onClose={() => {}} />
              </div>
            </Wrapper>
          </RainbowKitProvider>
        </Provider>

        <Wrapper style={{ maxWidth: 'fit-content' }}>
          <div style={{ display: 'flex', gap: 60 }}>
            <div>
              <Text
                style={{ mixBlendMode: 'overlay' }}
                variant="title3"
                weight="bold"
              >
                Mode
              </Text>
              <ControlBox>
                <RadioGroup.Root
                  name="mode"
                  onValueChange={handleModeChange}
                  style={{ display: 'inline-flex', gap: 22 }}
                  value={mode}
                >
                  <Radio
                    activeValue={mode}
                    id="mode"
                    style={{ backgroundColor: 'white' }}
                    value="light"
                  />
                  <Radio
                    activeValue={mode}
                    id="mode"
                    style={{ backgroundColor: '#1A1B1F' }}
                    value="midnight"
                  />
                  <Radio
                    activeValue={mode}
                    id="mode"
                    style={{ backgroundColor: 'black' }}
                    value="dark"
                  />
                </RadioGroup.Root>
              </ControlBox>
            </div>
            <div>
              <Text
                style={{ mixBlendMode: 'overlay' }}
                variant="title3"
                weight="bold"
              >
                Accent
              </Text>
              <ControlBox>
                <RadioGroup.Root
                  name="mode"
                  onValueChange={handleAccentChange}
                  style={{ display: 'inline-flex', gap: 22 }}
                  value={accent}
                >
                  {(Object.keys(gradientColors) as Accents[]).map(color => (
                    <Radio
                      activeValue={accent}
                      id="accent"
                      key={color}
                      style={{
                        backgroundColor: THEMES[mode]({ accentColor: color })
                          .colors.accentColor,
                      }}
                      value={color}
                    />
                  ))}
                </RadioGroup.Root>
              </ControlBox>
            </div>
            <div>
              <Text
                style={{ mixBlendMode: 'overlay' }}
                variant="title3"
                weight="bold"
              >
                Radius
              </Text>
              <ControlBox>
                <RadioGroup.Root
                  name="mode"
                  onValueChange={handleRadiiChange}
                  style={{ display: 'inline-flex', gap: 22 }}
                  value={radii}
                >
                  <Radio
                    activeValue={radii}
                    data-label="L"
                    id="radii"
                    value="large"
                  />
                  <Radio
                    activeValue={radii}
                    data-label="M"
                    id="radii"
                    value="medium"
                  />
                  <Radio
                    activeValue={radii}
                    data-label="S"
                    id="radii"
                    value="small"
                  />
                  <Radio
                    activeValue={radii}
                    data-label="-"
                    id="radii"
                    value="none"
                  />
                </RadioGroup.Root>
              </ControlBox>
            </div>
          </div>
        </Wrapper>
      </Box>
    </Box>
  ) : null;
}

function ControlBox(props) {
  return (
    <div
      style={{
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        marginTop: 22,
      }}
      {...props}
    />
  );
}

function Radio({ activeValue, id, value, ...props }) {
  return (
    <div style={{ position: 'relative' }}>
      <RadioGroup.Item className={radio} value={value} {...props} />
      {activeValue === value && <Ring id={id} />}
    </div>
  );
}

function Ring({ id }) {
  return (
    <motion.div
      className={ring}
      layoutId={id}
      transition={{
        duration: 0.65,
        type: 'spring',
      }}
    />
  );
}
