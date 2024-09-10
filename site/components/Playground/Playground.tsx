import * as RadioGroup from '@radix-ui/react-radio-group';
import {
  type Locale,
  RainbowKitProvider,
  __private__,
  darkTheme,
  lightTheme,
  midnightTheme,
} from '@rainbow-me/rainbowkit';
import clsx from 'clsx';
import { Box } from 'components/Box/Box';
import { MeshGradient } from 'components/MeshGradient/MeshGradient';
import { Text } from 'components/Text/Text';
import { Wrapper } from 'components/Wrapper/Wrapper';
import { motion } from 'framer-motion';
import { isAndroid } from 'lib/isMobile';
import { useIsMounted } from 'lib/useIsMounted';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import type React from 'react';
import { useState } from 'react';
import { CompactIcon } from './CompactIcon';
import { radio, ring } from './Playground.css';
import { WideIcon } from './WideIcon';

const { DesktopOptions, dialogContent } = __private__;

const THEMES = {
  dark: darkTheme,
  light: lightTheme,
  midnight: midnightTheme,
};

type Modes = keyof typeof THEMES;
type ThemeOptions = Parameters<typeof lightTheme>[0];
type Accents = NonNullable<NonNullable<ThemeOptions>['accentColor']>;
type Radii = NonNullable<NonNullable<ThemeOptions>['borderRadius']>;
type ModalSizes = 'compact' | 'wide';

// @ts-ignore - Accents could be undefined
const gradientColors: Record<Accents, any> = {
  blue: [
    [29, 100, 192],
    [47, 9, 148],
    [14, 116, 253],
  ],
  purple: [
    [150, 69, 235],
    [11, 21, 136],
    [106, 57, 224],
  ],
  pink: [
    [116, 6, 116],
    [238, 103, 176],
    [144, 12, 125],
  ],
  red: [
    [83, 10, 6],
    [172, 22, 52],
    [189, 38, 13],
  ],
  orange: [
    [255, 151, 31],
    [112, 0, 0],
    [250, 137, 51],
  ],
  green: [
    [10, 80, 28],
    [42, 150, 140],
    [22, 160, 59],
  ],
};

export function Playground() {
  const [mode, setMode] = useState<Modes>('light');
  const [accent, setAccent] = useState<Accents>('blue');
  const [radii, setRadii] = useState<NonNullable<Radii>>('large');
  const [modalSize, setModalSize] = useState<ModalSizes>('wide');
  const isCompact = modalSize === 'compact';

  const { locale } = useRouter() as { locale: Locale };

  const handleModeChange = (value: Modes) => setMode(value);
  const handleAccentChange = (value: Accents) => setAccent(value);
  const handleRadiiChange = (value: Radii) => setRadii(value);
  const handleModalSizeChange = (value: ModalSizes) => setModalSize(value);

  const selectedTheme = THEMES[mode]({
    ...(THEMES[mode].accentColors as Record<Accents, any>)[accent],
    borderRadius: radii,
  });

  const gradient = gradientColors[accent];
  const isMounted = useIsMounted();

  const t = useTranslations('landing');

  return isMounted() ? (
    <Box paddingY={{ xs: '11', lg: '12' }} position="relative" zIndex="10">
      <Box
        inset="0"
        position="absolute"
        style={{ height: '100%', width: '100%' }}
      >
        {isAndroid() && (
          <motion.div
            animate={{
              backgroundImage: `linear-gradient(136deg, rgb(${gradient[2]}) 0%, rgb(${gradient[0]}) 100%)`,
            }}
            initial={false}
            style={{ width: '100%', height: '100%' }}
            transition={{ duration: 1.5 }}
          />
        )}

        {!isAndroid() && (
          <MeshGradient
            backgroundColor="#1f4fcc"
            u_c1={gradient[0]}
            u_c2={gradient[1]}
            u_c3={gradient[2]}
          />
        )}
      </Box>
      <Box position="relative">
        <Wrapper>
          <Text
            align={{ xs: 'left', md: 'center' }}
            as="h2"
            size={{ xs: '7', md: '9' }}
            style={{ lineHeight: 1 }}
            weight="bold"
          >
            {t('playground.headline')}
          </Text>
          <Text
            align={{ xs: 'left', md: 'center' }}
            as="p"
            marginTop={{ xs: '7', md: '9' }}
            marginX="auto"
            size={{ xs: '4', md: '5' }}
            style={{ lineHeight: '28px', maxWidth: 720 }}
            weight="semibold"
          >
            {t('playground.subheadline')}
          </Text>
        </Wrapper>

        <RainbowKitProvider
          id="playground"
          modalSize={modalSize}
          theme={selectedTheme}
          locale={locale}
        >
          <Box
            marginX={{ xs: '0', md: 'auto' }}
            marginY={{ xs: '9', md: '11' }}
            paddingX="10"
            style={{
              maxWidth: 'fit-content',
              userSelect: 'none',
            }}
          >
            <Box
              display={{ xs: 'none', md: 'flex' }}
              style={{
                height: 500,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ position: 'relative' }}>
                <div
                  className={dialogContent}
                  style={
                    isCompact
                      ? {}
                      : {
                          width: 712,
                        }
                  }
                >
                  <DesktopOptions onClose={() => {}} />
                </div>
                {/* This div is placed on top of rainbowkit to make it non-interactive.
                  pointer-events: none; was forcing scrollbar to show:
                  https://linear.app/rainbow/issue/RNBW-3686/site-playground-wallet-list-showing-a-scrollbar */}
                <div style={{ position: 'absolute', inset: 0 }} />
              </div>
            </Box>

            <Box display={{ md: 'none' }}>
              <div style={{ position: 'relative' }}>
                <div
                  className={clsx(dialogContent)}
                  style={{ maxWidth: '100%' }}
                >
                  <DesktopOptions onClose={() => {}} />
                </div>
                {/* This div is placed on top of rainbowkit to make it non-interactive.
                  pointer-events: none; was forcing scrollbar to show:
                  https://linear.app/rainbow/issue/RNBW-3686/site-playground-wallet-list-showing-a-scrollbar */}
                <div style={{ position: 'absolute', inset: 0 }} />
              </div>
            </Box>
          </Box>
        </RainbowKitProvider>

        <Box
          marginX={{ xs: '0', md: 'auto' }}
          paddingX="10"
          style={{ maxWidth: 'fit-content' }}
        >
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}
            flexWrap="wrap"
            gap={{ xs: '8', md: '10' }}
          >
            <Box display={{ xs: 'none', md: 'block' }}>
              <Text
                size={{ xs: '3', md: '4' }}
                style={{ mixBlendMode: 'overlay' }}
                weight="bold"
              >
                {t('playground.modal')}
              </Text>
              <ControlBox>
                <RadioGroup.Root
                  name="modalSize"
                  onValueChange={handleModalSizeChange}
                  style={{ display: 'inline-flex', gap: 19 }}
                  value={modalSize}
                >
                  <Radio activeValue={modalSize} id="modalSize" value="wide">
                    <WideIcon />
                  </Radio>
                  <Radio activeValue={modalSize} id="modalSize" value="compact">
                    <CompactIcon />
                  </Radio>
                </RadioGroup.Root>
              </ControlBox>
            </Box>
            <div>
              <Text
                size={{ xs: '3', md: '4' }}
                style={{ mixBlendMode: 'overlay' }}
                weight="bold"
              >
                {t('playground.mode')}
              </Text>
              <ControlBox>
                <RadioGroup.Root
                  name="mode"
                  onValueChange={handleModeChange}
                  style={{ display: 'inline-flex', gap: 19 }}
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
                    value="dark"
                  />
                  <Radio
                    activeValue={mode}
                    id="mode"
                    style={{ backgroundColor: 'black' }}
                    value="midnight"
                  />
                </RadioGroup.Root>
              </ControlBox>
            </div>
            <div>
              <Text
                size={{ xs: '3', md: '4' }}
                style={{ mixBlendMode: 'overlay' }}
                weight="bold"
              >
                {t('playground.accent')}
              </Text>
              <ControlBox>
                <RadioGroup.Root
                  name="mode"
                  onValueChange={handleAccentChange}
                  style={{ display: 'inline-flex', gap: 19, flexWrap: 'wrap' }}
                  value={accent}
                >
                  {(Object.keys(gradientColors) as Accents[]).map((color) => (
                    <Radio
                      activeValue={accent}
                      id="accent"
                      key={color}
                      style={{
                        backgroundColor: THEMES[mode]({
                          ...(
                            THEMES[mode].accentColors as Record<Accents, any>
                          )[color],
                        }).colors.accentColor,
                      }}
                      value={color}
                    />
                  ))}
                </RadioGroup.Root>
              </ControlBox>
            </div>
            <div>
              <Text
                size={{ xs: '3', md: '4' }}
                style={{ mixBlendMode: 'overlay' }}
                weight="bold"
              >
                {t('playground.radius')}
              </Text>
              <ControlBox>
                <RadioGroup.Root
                  name="mode"
                  onValueChange={handleRadiiChange}
                  style={{ display: 'inline-flex', gap: 19 }}
                  value={radii}
                >
                  <Radio
                    activeValue={radii}
                    data-label={t('playground.large')}
                    id="radii"
                    value="large"
                  />
                  <Radio
                    activeValue={radii}
                    data-label={t('playground.medium')}
                    id="radii"
                    value="medium"
                  />
                  <Radio
                    activeValue={radii}
                    data-label={t('playground.small')}
                    id="radii"
                    value="small"
                  />
                  <Radio
                    activeValue={radii}
                    data-label="—"
                    id="radii"
                    value="none"
                  />
                </RadioGroup.Root>
              </ControlBox>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : null;
}

function ControlBox(props: React.ComponentProps<typeof Box>) {
  return (
    <Box
      alignItems="flex-start"
      display="flex"
      flexDirection="column"
      gap="4"
      marginTop={{ md: '5', xs: '3' }}
      {...props}
    />
  );
}

function Radio({
  activeValue,
  id,
  value,
  ...props
}: { activeValue: string; id: string; value: string; [key: string]: any }) {
  return (
    <div style={{ position: 'relative' }}>
      <RadioGroup.Item className={radio} value={value} {...props} />
      {activeValue === value && <Ring id={id} />}
    </div>
  );
}

function Ring({ id }: { id: string }) {
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
