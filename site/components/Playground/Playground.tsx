import * as RadioGroup from '@radix-ui/react-radio-group';
import {
  darkTheme,
  DesktopOptions,
  dialogContent,
  lightTheme,
  midnightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import React, { useState } from 'react';
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

export function Playground() {
  const [mode, setMode] = useState<Modes>('light');
  const [accent, setAccent] = useState<Accents>('blue');
  const [radii, setRadii] = useState<Radii>('large');

  const handleModeChange = value => setMode(value);
  const handleAccentChange = value => setAccent(value);
  const handleRadiiChange = value => setRadii(value);

  const selectedTheme = THEMES[mode]({
    accentColor: accent,
    borderRadius: radii,
  });

  return (
    <RainbowKitProvider chains={chains} id="playground" theme={selectedTheme}>
      <Wrapper style={{ marginBottom: 80, maxWidth: 'fit-content' }}>
        <div className={dialogContent} style={{ margin: '0 auto', width: 712 }}>
          <DesktopOptions onClose={() => {}} />
        </div>
      </Wrapper>

      <Wrapper style={{ maxWidth: 'fit-content' }}>
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
