/* eslint-disable sort-keys-fix/sort-keys-fix */
import * as RadioGroup from '@radix-ui/react-radio-group';
import {
  ConnectButton,
  darkTheme,
  DesktopOptions,
  dialogContent,
  lightTheme,
  midnightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { ConnectButtonProps } from '@rainbow-me/rainbowkit/dist/components/ConnectButton/ConnectButton';
import { title2, titleLarge } from 'css/text.css';
import { colors } from 'css/tokens';
import { vars } from 'css/vars.css';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { radio, ring } from '../../css/radio.css';
import { chains } from '../Provider';
import { Wrapper } from '../Wrapper/Wrapper';
import { gradientBox } from './Playground.css';

const THEMES = {
  dark: darkTheme,
  light: lightTheme,
  midnight: midnightTheme,
};

export type Modes = keyof typeof THEMES;
type ThemeOptions = Parameters<typeof lightTheme>[0];
export type Accents = ThemeOptions['accentColor'];
export type Radii = ThemeOptions['borderRadius'];
type ExtractString<Value> = Value extends string ? Value : never;
type AccountStatus = ExtractString<ConnectButtonProps['accountStatus']>;
type ChainStatus = ExtractString<ConnectButtonProps['chainStatus']>;
export type Views = 'initial' | 'connecting' | 'connected';

const gradients = {
  blue: {
    from: colors.blue50,
    to: colors.blue70,
  },
  green: {
    from: colors.green50,
    to: colors.green70,
  },
  pink: {
    from: colors.pink50,
    to: colors.pink70,
  },
  purple: {
    from: colors.purple50,
    to: colors.purple70,
  },
};

export function Playground() {
  const [mode, setMode] = useState<Modes>('light');
  const [accent, setAccent] = useState<Accents>('purple');
  const [radii, setRadii] = useState<Radii>('large');
  const [accountStatus, setAccountStatus] = useState<AccountStatus>('full');
  const [chainStatus, setChainStatus] = useState<ChainStatus>('full');
  const [view, setView] = useState<Views>('initial');
  const [showBalance, setShowBalance] = useState('yes');
  const [{ data: connectData }] = useConnect();
  const [, disconnect] = useAccount();

  useEffect(() => {
    // needed to force disconnect
    setTimeout(() => {
      disconnect();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (connectData.connected) {
      setView('connected');
    }
  }, [connectData]);

  const handleModeChange = value => setMode(value);
  const handleAccentChange = value => setAccent(value);
  const handleRadiiChange = value => setRadii(value);
  const handleAccountStatusChange = value => setAccountStatus(value);
  const handleChainStatusChange = value => setChainStatus(value);
  const handleShowBalanceChange = value => setShowBalance(value);

  const selectedTheme = THEMES[mode]({
    accentColor: accent,
    borderRadius: radii,
  });

  return (
    <section style={{ padding: '160px 0', position: 'relative' }}>
      <motion.div
        animate={{
          backgroundImage: `linear-gradient(136deg, ${gradients[accent].from} 0%, ${gradients[accent].to} 100%)`,
        }}
        className={gradientBox}
        initial={false}
        transition={{ duration: 1.5 }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          color: vars.colors.white100,
        }}
      >
        <Wrapper>
          <h2
            className={titleLarge}
            style={{ fontSize: 52, textAlign: 'center' }}
          >
            We&lsquo;re all gonna customize it.
          </h2>
          <p
            className={title2}
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: vars.space[9],
              maxWidth: 760,
              textAlign: 'center',
            }}
          >
            Make your Web3 login experience feel right at home on your website.
            RainbowKit allows you to fully customize apprearance, color, corner
            radius, wallet providers and a lot more - all through an easy-to-use
            API. Get a feel for it below!
          </p>
        </Wrapper>

        <RainbowKitProvider
          chains={chains}
          id="playground"
          theme={selectedTheme}
        >
          <Wrapper
            style={{
              marginTop: vars.space[11],
              marginBottom: vars.space[11],
              maxWidth: 'fit-content',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 24,
                display: 'flex',
                height: 510,
                justifyContent: 'center',
                margin: '0 auto',
                width: 712,
              }}
            >
              {(view === 'initial' || view === 'connected') && (
                <ConnectButton
                  accountStatus={accountStatus}
                  chainStatus={chainStatus}
                  onClick={() => {
                    if (view === 'initial') {
                      setView('connecting');
                    } else {
                      return false;
                    }
                  }}
                  showBalance={showBalance === 'yes' ? true : false}
                />
              )}

              {view === 'connecting' && (
                <div
                  className={dialogContent}
                  style={{
                    width: 712,
                  }}
                >
                  <DesktopOptions onClose={() => {}} />
                </div>
              )}
            </div>
          </Wrapper>

          <Wrapper style={{ maxWidth: 'fit-content' }}>
            {view === 'initial' && (
              <div style={{ opacity: 0 }}>
                <h4>Mode</h4>
                <ControlBox>
                  <RadioGroup.Root
                    name="mode"
                    onValueChange={handleModeChange}
                    style={{ display: 'inline-flex', gap: 22 }}
                    value={mode}
                  >
                    <RadioGroup.Item
                      className={radio}
                      style={{ backgroundColor: 'white' }}
                      value="light"
                    />
                  </RadioGroup.Root>
                </ControlBox>
              </div>
            )}
            {view === 'connecting' && (
              <div style={{ display: 'flex', gap: 60 }}>
                <div>
                  <h4>Mode</h4>
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
                        style={{ backgroundColor: 'black' }}
                        value="dark"
                      />
                      <Radio
                        activeValue={mode}
                        id="mode"
                        style={{ backgroundColor: '#333' }}
                        value="midnight"
                      />
                    </RadioGroup.Root>
                  </ControlBox>
                </div>
                <div>
                  <h4>Accent</h4>
                  <ControlBox>
                    <RadioGroup.Root
                      name="mode"
                      onValueChange={handleAccentChange}
                      style={{ display: 'inline-flex', gap: 22 }}
                      value={accent}
                    >
                      <Radio
                        activeValue={accent}
                        id="accent"
                        style={{ backgroundColor: '#6F55F2' }}
                        value="purple"
                      />
                      <Radio
                        activeValue={accent}
                        id="accent"
                        style={{ backgroundColor: '#0077FF' }}
                        value="blue"
                      />
                      <Radio
                        activeValue={accent}
                        id="accent"
                        style={{ backgroundColor: '#00B34A' }}
                        value="green"
                      />
                      <Radio
                        activeValue={accent}
                        id="accent"
                        style={{ backgroundColor: '#FA4B85' }}
                        value="pink"
                      />
                    </RadioGroup.Root>
                  </ControlBox>
                </div>
                <div>
                  <h4>Radius</h4>
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
            )}
            {view === 'connected' && (
              <div style={{ display: 'flex', gap: 60 }}>
                <div>
                  <h4>Chain status</h4>
                  <ControlBox>
                    <RadioGroup.Root
                      name="chainStatus"
                      onValueChange={handleChainStatusChange}
                      style={{ display: 'inline-flex', gap: 22 }}
                      value={chainStatus}
                    >
                      <RadioGroup.Item
                        className={radio}
                        data-label="F"
                        value="full"
                      />
                      <RadioGroup.Item
                        className={radio}
                        data-label="I"
                        value="icon"
                      />
                      <RadioGroup.Item
                        className={radio}
                        data-label="N"
                        value="name"
                      />
                      <RadioGroup.Item
                        className={radio}
                        data-label="-"
                        value="none"
                      />
                    </RadioGroup.Root>
                  </ControlBox>
                </div>
                <div>
                  <h4>Account status</h4>
                  <ControlBox>
                    <RadioGroup.Root
                      name="accountStatus"
                      onValueChange={handleAccountStatusChange}
                      style={{ display: 'inline-flex', gap: 22 }}
                      value={accountStatus}
                    >
                      <RadioGroup.Item
                        className={radio}
                        data-label="F"
                        value="full"
                      />
                      <RadioGroup.Item
                        className={radio}
                        data-label="Ad"
                        value="address"
                      />
                      <RadioGroup.Item
                        className={radio}
                        data-label="Av"
                        value="avatar"
                      />
                    </RadioGroup.Root>
                  </ControlBox>
                </div>
                <div>
                  <h4>Show balance</h4>
                  <ControlBox>
                    <RadioGroup.Root
                      name="Show balance"
                      onValueChange={handleShowBalanceChange}
                      style={{ display: 'inline-flex', gap: 22 }}
                      value={showBalance}
                    >
                      <RadioGroup.Item
                        className={radio}
                        data-label="Y"
                        value="yes"
                      />
                      <RadioGroup.Item
                        className={radio}
                        data-label="F"
                        value="no"
                      />
                    </RadioGroup.Root>
                  </ControlBox>
                </div>
              </div>
            )}
          </Wrapper>
        </RainbowKitProvider>
      </div>
    </section>
  );
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
        type: 'spring',
        duration: 0.65,
      }}
    />
  );
}
