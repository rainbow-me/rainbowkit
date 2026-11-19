import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render } from '@testing-library/react';
import React, { Profiler, useState } from 'react';
import { http } from 'viem';
import { afterEach, describe, expect, it } from 'vitest';
import { createConfig, WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';
import { mock } from 'wagmi/connectors';
import { ConnectButton } from '../src/components/ConnectButton/ConnectButton';
import { RainbowKitProvider } from '../src/components/RainbowKitProvider/RainbowKitProvider';
import { mockedAccounts } from './mockWallet';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const baseConfig = () =>
  createConfig({
    chains: [base],
    connectors: [mock({ accounts: mockedAccounts })],
    transports: { [base.id]: http() },
  });

afterEach(() => {
  localStorage.clear();
});

describe('stable context values', () => {
  it('does not re-render ConnectButton when the app root re-renders', async () => {
    const config = baseConfig();
    const queryClient = new QueryClient();
    let commits = 0;
    let bump = () => {};

    const Button = React.memo(function Button() {
      return (
        <Profiler id="cb" onRender={() => commits++}>
          <ConnectButton />
        </Profiler>
      );
    });

    function App() {
      const [n, setN] = useState(0);
      bump = () => setN((x) => x + 1);
      return (
        <WagmiProvider config={config} reconnectOnMount={false}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider appInfo={{ appName: 'inline' }}>
              <span>{n}</span>
              <Button />
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      );
    }

    render(<App />);
    await act(async () => {
      await sleep(20);
    });
    const before = commits;
    for (let i = 0; i < 10; i++) {
      await act(async () => {
        bump();
      });
    }
    expect(commits - before).toBe(0);
  });
});
