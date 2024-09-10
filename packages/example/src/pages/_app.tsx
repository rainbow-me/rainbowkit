import '@rainbow-me/rainbowkit/styles.css';
import './global.css';

import type { Session } from 'next-auth';
import { SessionProvider, signOut } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  type AvatarComponent,
  type DisclaimerComponent,
  type Locale,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
  midnightTheme,
} from '@rainbow-me/rainbowkit';
import {
  type GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider,
} from '@rainbow-me/rainbowkit-siwe-next-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, useDisconnect } from 'wagmi';

import type { AppContextProps } from '../lib/AppContextProps';
import { config } from '../wagmi';

const RAINBOW_TERMS = 'https://rainbow.me/terms-of-use';

const demoAppInfo = {
  appName: 'Rainbowkit Demo',
};

const DisclaimerDemo: DisclaimerComponent = ({ Link, Text }) => {
  return (
    <Text>
      By connecting, you agree to this demo&apos;s{' '}
      <Link href={RAINBOW_TERMS}>Terms of Service</Link> and acknowledge you
      have read and understand our <Link href={RAINBOW_TERMS}>Disclaimer</Link>
    </Text>
  );
};

const CustomAvatar: AvatarComponent = ({ size }) => {
  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: 'lightpink',
        color: 'black',
        display: 'flex',
        height: size,
        justifyContent: 'center',
        width: size,
      }}
    >
      :^)
    </div>
  );
};

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to the RainbowKit Demo',
});

const themes = [
  { name: 'light', theme: lightTheme },
  { name: 'dark', theme: darkTheme },
  { name: 'midnight', theme: midnightTheme },
] as const;
type ThemeName = (typeof themes)[number]['name'];

const fontStacks = ['rounded', 'system'] as const;
type FontStack = (typeof fontStacks)[number];

const accentColors = [
  'blue',
  'green',
  'orange',
  'pink',
  'purple',
  'red',
  'custom',
] as const;
type AccentColor = (typeof accentColors)[number];

const radiusScales = ['large', 'medium', 'small', 'none'] as const;
type RadiusScale = (typeof radiusScales)[number];

const overlayBlurs = ['large', 'small', 'none'] as const;
type OverlayBlur = (typeof overlayBlurs)[number];

const modalSizes = ['wide', 'compact'] as const;
type ModalSize = (typeof modalSizes)[number];

function RainbowKitApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const router = useRouter();

  const { disconnect } = useDisconnect();
  const [selectedInitialChainId, setInitialChainId] = useState<number>();
  const [selectedThemeName, setThemeName] = useState<ThemeName>('light');
  const [selectedFontStack, setFontStack] = useState<FontStack>('rounded');
  const [selectedAccentColor, setAccentColor] = useState<AccentColor>('blue');
  const [selectedRadiusScale, setRadiusScale] = useState<RadiusScale>('large');
  const [selectedOverlayBlur, setOverlayBlur] = useState<OverlayBlur>('none');
  const [authEnabled, setAuthEnabled] = useState(pageProps.session !== null);
  const [showRecentTransactions, setShowRecentTransactions] = useState(true);
  const [coolModeEnabled, setCoolModeEnabled] = useState(false);
  const [modalSize, setModalSize] = useState<ModalSize>('wide');
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [customAvatar, setCustomAvatar] = useState(false);

  const routerLocale = router.locale as Locale;

  // Set `locale` as default from next.js and let dropdown set new `locale`
  const [locale, setLocale] = useState<Locale>(routerLocale);

  const currentTheme = (
    themes.find(({ name }) => name === selectedThemeName) ?? themes[0]
  ).theme;

  const backgroundStyles = {
    dark: { background: '#090913', color: '#FFF' },
    light: null,
    midnight: { background: '#0B0E17', color: '#FFF' },
  };

  const selectedBackgroundStyles = backgroundStyles[selectedThemeName];

  const accentColor =
    selectedAccentColor === 'custom'
      ? { accentColor: 'red', accentColorForeground: 'yellow' } // https://blog.codinghorror.com/a-tribute-to-the-windows-31-hot-dog-stand-color-scheme
      : currentTheme.accentColors[selectedAccentColor];

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const appContextProps: AppContextProps = { authEnabled };

  const locales = router.locales as Locale[];

  // Note: Non-RainbowKit providers are wrapped around this component
  // at the bottom of the file. This is so that our example app
  // component can use their corresponding Hooks.
  return (
    <RainbowKitSiweNextAuthProvider
      enabled={authEnabled}
      getSiweMessageOptions={getSiweMessageOptions}
    >
      <RainbowKitProvider
        appInfo={{
          ...demoAppInfo,
          ...(showDisclaimer && { disclaimer: DisclaimerDemo }),
        }}
        avatar={customAvatar ? CustomAvatar : undefined}
        locale={locale}
        coolMode={coolModeEnabled}
        initialChain={selectedInitialChainId}
        modalSize={modalSize}
        showRecentTransactions={showRecentTransactions}
        theme={currentTheme({
          ...accentColor,
          borderRadius: selectedRadiusScale,
          fontStack: selectedFontStack,
          overlayBlur: selectedOverlayBlur,
        })}
      >
        <div
          style={{
            minHeight: '100vh',
            padding: 8,
            ...selectedBackgroundStyles,
          }}
        >
          <Component {...pageProps} {...appContextProps} />

          {isMounted && (
            <>
              <div
                style={{
                  fontFamily: 'sans-serif',
                }}
              >
                <h3>RainbowKitProvider props</h3>
                <table cellSpacing={12}>
                  <tbody>
                    <tr>
                      <td>
                        <label
                          htmlFor="authEnabled"
                          style={{ userSelect: 'none' }}
                        >
                          authentication
                        </label>
                      </td>
                      <td>
                        <input
                          checked={authEnabled}
                          id="authEnabled"
                          name="authEnabled"
                          onChange={(e) => {
                            setAuthEnabled(e.target.checked);

                            // Reset connection and auth state when
                            // toggling the authentication mode.
                            // This better simulates the real dev experience
                            // since they don't normally toggle between
                            // these two modes at run time. Otherwise you
                            // might experience weird behavior when toggling
                            // in the middle of a session.
                            signOut({ redirect: false });
                            disconnect();
                          }}
                          type="checkbox"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="showRecentTransactions"
                          style={{ userSelect: 'none' }}
                        >
                          showRecentTransactions
                        </label>
                      </td>
                      <td>
                        <input
                          checked={showRecentTransactions}
                          id="showRecentTransactions"
                          name="showRecentTransactions"
                          onChange={(e) =>
                            setShowRecentTransactions(e.target.checked)
                          }
                          type="checkbox"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="coolModeEnabled"
                          style={{ userSelect: 'none' }}
                        >
                          coolMode
                        </label>
                      </td>
                      <td>
                        <input
                          checked={coolModeEnabled}
                          id="coolModeEnabled"
                          name="coolModeEnabled"
                          onChange={(e) => setCoolModeEnabled(e.target.checked)}
                          type="checkbox"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="showDisclaimer"
                          style={{ userSelect: 'none' }}
                        >
                          disclaimer
                        </label>
                      </td>
                      <td>
                        <input
                          checked={showDisclaimer}
                          id="showDisclaimer"
                          name="showDisclaimer"
                          onChange={(e) => setShowDisclaimer(e.target.checked)}
                          type="checkbox"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="customAvatar"
                          style={{ userSelect: 'none' }}
                        >
                          avatar
                        </label>
                      </td>
                      <td>
                        <input
                          checked={customAvatar}
                          id="customAvatar"
                          name="customAvatar"
                          onChange={(e) => setCustomAvatar(e.target.checked)}
                          type="checkbox"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>modalSize</td>
                      <td>
                        <select
                          onChange={(e) =>
                            setModalSize(e.target.value as ModalSize)
                          }
                          value={modalSize}
                        >
                          {modalSizes.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>initialChain</td>
                      <td>
                        <select
                          onChange={(e) =>
                            setInitialChainId(
                              e.target.value
                                ? Number.parseInt(e.target.value, 10)
                                : undefined,
                            )
                          }
                          value={selectedInitialChainId ?? 'default'}
                        >
                          {[undefined, ...config.chains].map((chain) => (
                            <option
                              key={chain?.id ?? ''}
                              value={chain?.id ?? ''}
                            >
                              {chain?.name ?? 'Default'}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label style={{ userSelect: 'none' }}>locale</label>
                      </td>
                      <td>
                        <select
                          onChange={(e) => {
                            setLocale(e.target.value as Locale);
                          }}
                          value={locale}
                        >
                          {locales.map((locale) => (
                            <option key={locale} value={locale}>
                              {locale}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 24,
                  }}
                >
                  <div>
                    <h4>Theme</h4>
                    <div
                      style={{
                        alignItems: 'flex-start',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                      }}
                    >
                      {themes.map(({ name: themeName }) => (
                        <label key={themeName} style={{ userSelect: 'none' }}>
                          <input
                            checked={themeName === selectedThemeName}
                            name="theme"
                            onChange={(e) =>
                              setThemeName(e.target.value as ThemeName)
                            }
                            type="radio"
                            value={themeName}
                          />{' '}
                          {themeName}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4>Font stack</h4>
                    <div
                      style={{
                        alignItems: 'flex-start',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                      }}
                    >
                      {fontStacks.map((fontStack) => (
                        <label key={fontStack} style={{ userSelect: 'none' }}>
                          <input
                            checked={fontStack === selectedFontStack}
                            name="fontStack"
                            onChange={(e) =>
                              setFontStack(e.target.value as FontStack)
                            }
                            type="radio"
                            value={fontStack}
                          />{' '}
                          {fontStack}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4>Accent</h4>
                    <div
                      style={{
                        alignItems: 'flex-start',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                      }}
                    >
                      {accentColors.map((accentColor) => (
                        <label key={accentColor} style={{ userSelect: 'none' }}>
                          <input
                            checked={accentColor === selectedAccentColor}
                            name="accentColor"
                            onChange={(e) =>
                              setAccentColor(e.target.value as AccentColor)
                            }
                            type="radio"
                            value={accentColor}
                          />{' '}
                          {accentColor}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4>Border radius</h4>
                    <div
                      style={{
                        alignItems: 'flex-start',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                      }}
                    >
                      {radiusScales.map((radiusScale) => (
                        <label key={radiusScale} style={{ userSelect: 'none' }}>
                          <input
                            checked={radiusScale === selectedRadiusScale}
                            name="radiusScale"
                            onChange={(e) =>
                              setRadiusScale(e.target.value as RadiusScale)
                            }
                            type="radio"
                            value={radiusScale}
                          />{' '}
                          {radiusScale}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4>Overlay blurs</h4>
                    <div
                      style={{
                        alignItems: 'flex-start',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                      }}
                    >
                      {overlayBlurs.map((overlayBlur) => (
                        <label key={overlayBlur} style={{ userSelect: 'none' }}>
                          <input
                            checked={overlayBlur === selectedOverlayBlur}
                            name="overlayBlur"
                            onChange={(e) =>
                              setOverlayBlur(e.target.value as OverlayBlur)
                            }
                            type="radio"
                            value={overlayBlur}
                          />{' '}
                          {overlayBlur}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </RainbowKitProvider>
    </RainbowKitSiweNextAuthProvider>
  );
}

const queryClient = new QueryClient();

export default function App(
  appProps: AppProps<{
    session: Session;
  }>,
) {
  return (
    <>
      <Head>
        <title>RainbowKit Example</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <SessionProvider refetchInterval={0} session={appProps.pageProps.session}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitApp {...appProps} />
          </QueryClientProvider>
        </WagmiProvider>
      </SessionProvider>
    </>
  );
}
