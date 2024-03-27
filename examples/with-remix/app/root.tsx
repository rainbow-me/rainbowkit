import { useState } from 'react';
import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { json } from '@remix-run/node';
import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from '@remix-run/node';

import {
  RainbowKitProvider,
  ConnectButton,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import type { Chain } from 'wagmi/chains';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

import globalStylesUrl from './styles/global.css';
import rainbowStylesUrl from '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Env = { PUBLIC_ENABLE_TESTNETS?: string };

type LoaderData = { ENV: Env };

export const meta: MetaFunction = () => ([
  {
    charset: 'utf-8',
    title: 'RainbowKit Remix Example',
    viewport: 'width=device-width,initial-scale=1',
  },
]);

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: globalStylesUrl },
  { rel: 'stylesheet', href: rainbowStylesUrl },
];

// Note: These environment variables are hard coded for demonstration purposes.
// See: https://remix.run/docs/en/v1/guides/envvars#browser-environment-variables
export const loader: LoaderFunction = () => {
  const data: LoaderData = {
    ENV: {
      PUBLIC_ENABLE_TESTNETS: process.env.PUBLIC_ENABLE_TESTNETS || 'false',
    },
  };

  return json(data);
};

const queryClient = new QueryClient();

export default function App() {
  const { ENV } = useLoaderData<LoaderData>();

  // Remix modules cannot have side effects so the initialization of `wagmi`
  // client happens during render, but the result is cached via `useState`
  // and a lazy initialization function.
  // See: https://remix.run/docs/en/v1/guides/constraints#no-module-side-effects
  const [{ config, chains }] = useState(() => {
    const testChains = ENV.PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : [];

    const chains: readonly [Chain, ...Chain[]] = [
      mainnet,
      polygon,
      optimism,
      arbitrum,
      base,
      ...testChains,
    ];

    const config = getDefaultConfig({
      appName: 'RainbowKit Remix Example',
      projectId: 'YOUR_PROJECT_ID',
      chains,
      ssr: true,
    });

    return {
      config,
      chains,
    };
  });

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {config && chains ? (
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '12px',
                  }}
                >
                  <ConnectButton />
                </div>
              </RainbowKitProvider>
              <Outlet />
            </QueryClientProvider>
          </WagmiProvider>
        ) : null}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
