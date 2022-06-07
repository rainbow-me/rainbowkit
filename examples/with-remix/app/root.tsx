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
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
import { useSetupWagmi } from './hooks/useSetupWagmi';
import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from '@remix-run/node';
import type { Chain } from 'wagmi';

import globalStylesUrl from './styles/global.css';
import rainbowStylesUrl from '@rainbow-me/rainbowkit/styles.css';

type Env = { ALCHEMY_ID?: string; PUBLIC_ENABLE_TESTNETS?: string };

type LoaderData = { ENV: Env };

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'RainbowKit Remix Example',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: globalStylesUrl },
  { rel: 'stylesheet', href: rainbowStylesUrl },
];

// Note: These environment variables are hard coded for demonstration purposes.
// See: https://remix.run/docs/en/v1/guides/envvars#browser-environment-variables
export const loader: LoaderFunction = () => {
  const data: LoaderData = {
    ENV: {
      ALCHEMY_ID: process.env.ALCHEMY_ID || '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC',
      PUBLIC_ENABLE_TESTNETS: process.env.PUBLIC_ENABLE_TESTNETS || 'false',
    },
  };

  return json(data);
};

export default function App() {
  const { ENV } = useLoaderData<LoaderData>();

  // Remix modules cannot have side effects so the initialization of `wagmi`
  // client is abstracted away in a `useEffect`.
  // See: https://remix.run/docs/en/v1/guides/constraints#no-module-side-effects
  const { client, chains } = useSetupWagmi({
    appName: 'RainbowKit Remix Example',
    alchemyId: ENV.ALCHEMY_ID,
    enablePublicTestnets: ENV.PUBLIC_ENABLE_TESTNETS,
  });

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {client && chains ? (
          <WagmiConfig client={client}>
            <RainbowKitProvider chains={chains as Chain[]}>
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
          </WagmiConfig>
        ) : null}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
