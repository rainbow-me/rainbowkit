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
import React, { useEffect, useState } from 'react';
import { useConnect } from 'wagmi';
import { radio } from '../../css/radio.css';
import { chains } from '../../pages/_app';
import { Wrapper } from '../Wrapper/Wrapper';

const THEMES = {
  dark: darkTheme,
  light: lightTheme,
  midnight: midnightTheme,
};

export type Modes = keyof typeof THEMES;
type ThemeOptions = Parameters<typeof lightTheme>[0];
export type Accents = ThemeOptions['accentColor'];
export type Radii = ThemeOptions['borderRadius'];
type AccountStatus = ConnectButtonProps['accountStatus'];
type ChainStatus = ConnectButtonProps['chainStatus'];
export type Views = 'initial' | 'connecting' | 'connected';

export function Playground() {
  const [mode, setMode] = useState<Modes>('light');
  const [accent, setAccent] = useState<Accents>('blue');
  const [radii, setRadii] = useState<Radii>('large');
  const [accountStatus, setAccountStatus] = useState<AccountStatus>('full');
  const [chainStatus, setChainStatus] = useState<ChainStatus>('full');
  const [view, setView] = useState<Views>('initial');
  const [showBalance, setShowBalance] = useState('yes');
  const [{ data: connectData }] = useConnect();

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
    <RainbowKitProvider chains={chains} id="playground" theme={selectedTheme}>
      <Wrapper style={{ marginBottom: 80, maxWidth: 'fit-content' }}>
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
                  <RadioGroup.Item
                    className={radio}
                    style={{ backgroundColor: 'white' }}
                    value="light"
                  />
                  <RadioGroup.Item
                    className={radio}
                    style={{ backgroundColor: 'black' }}
                    value="dark"
                  />
                  <RadioGroup.Item
                    className={radio}
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
                  <RadioGroup.Item
                    className={radio}
                    style={{ backgroundColor: '#6F55F2' }}
                    value="purple"
                  />
                  <RadioGroup.Item
                    className={radio}
                    style={{ backgroundColor: '#0077FF' }}
                    value="blue"
                  />
                  <RadioGroup.Item
                    className={radio}
                    style={{ backgroundColor: '#00B34A' }}
                    value="green"
                  />
                  <RadioGroup.Item
                    className={radio}
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
                  <RadioGroup.Item
                    className={radio}
                    data-label="L"
                    value="large"
                  />
                  <RadioGroup.Item
                    className={radio}
                    data-label="M"
                    value="medium"
                  />
                  <RadioGroup.Item
                    className={radio}
                    data-label="S"
                    value="small"
                  />
                  <RadioGroup.Item
                    className={radio}
                    data-label="-"
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
