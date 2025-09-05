// This page captures window.ethereum exactly once, prior to React hydration.
// Guarantees:
// - Uses <Script strategy="beforeInteractive"/> so the snapshot runs before Next.js hydrates the page,
//   ensuring all React components on this route read from a single cached value, not window directly.
// - The snapshot assignment is idempotent (write-once). If the script runs again (e.g., dev HMR),
//   it does not overwrite an existing snapshot.
// - On the server, no window is available, so SSR renders a fallback. On the client, the snapshot
//   exists before hydration; we hydrate state from it after mount to avoid hydration mismatch.
import { useEffect, useState, type CSSProperties } from 'react';
import { createStore, type EIP6963ProviderDetail } from 'mipd';
import Script from 'next/script';

function extractFlags(obj: Record<string, unknown>) {
  const flags: Record<string, boolean> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (
      key.startsWith('is') &&
      key !== 'isReady' &&
      typeof value === 'boolean'
    ) {
      flags[key] = value;
    }
  }
  return flags;
}

const tableStyle: CSSProperties = {
  borderCollapse: 'collapse',
  textAlign: 'left',
};
const cellStyle: CSSProperties = {
  border: '1px solid #ccc',
  padding: '4px 8px',
};

// The snapshot shape cached on window.__ETHEREUM_SNAPSHOT__
type EthereumSnapshot = {
  ethereum: any | null;
  ethereumRaw: any | null;
  providers: any[];
};

export default function EthereumProviders() {
  // Avoid hydration mismatches by keeping the SSR structure for the first client render.
  // We still read window.ethereum before hydration via the inline <Script>, and then
  // hydrate local state from that snapshot in an effect.
  const [ethereumFlags, setEthereumFlags] = useState<Record<
    string,
    boolean
  > | null>(null);
  const [providerFlags, setProviderFlags] = useState<Record<string, boolean>[]>(
    [],
  );
  const [wallets, setWallets] = useState<readonly EIP6963ProviderDetail[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const snap = (
      typeof window !== 'undefined'
        ? (window as any).__ETHEREUM_SNAPSHOT__
        : undefined
    ) as EthereumSnapshot | undefined;
    if (snap?.ethereumRaw) {
      setEthereumFlags(
        extractFlags(snap.ethereumRaw as unknown as Record<string, unknown>),
      );
    }
    if (Array.isArray(snap?.providers)) {
      setProviderFlags(
        snap.providers.map((p: Record<string, unknown>) => extractFlags(p)),
      );
    }
  }, []);

  useEffect(() => {
    const store = createStore();
    const unsubscribe = store.subscribe(
      (providerDetails: readonly EIP6963ProviderDetail[]) => {
        setWallets(providerDetails);
      },
      { emitImmediately: true },
    );
    return () => {
      unsubscribe();
      store.destroy();
    };
  }, []);

  return (
    <div style={{ padding: 20, textAlign: 'left' }} suppressHydrationWarning>
      {/**
       * Runs before React hydrates this route and before any app code executes.
       * We snapshot window.ethereum once and store it on window.__ETHEREUM_SNAPSHOT__.
       * The assignment is write-once to avoid multiple reads in dev/HMR.
       *
       * If you prefer to capture strictly on the first DOM load (potentially later),
       * wrap the capture in a DOMContentLoaded listener instead of running immediately:
       *
       *   if (document.readyState === 'loading') {
       *     window.addEventListener('DOMContentLoaded', capture, { once: true });
       *   } else {
       *     capture();
       *   }
       */}
      <Script id="ethereum-snapshot" strategy="beforeInteractive">{`
        (function () {
          try {
            if (typeof window !== 'undefined' && !window.__ETHEREUM_SNAPSHOT__) {
              var eth = window.ethereum ? window.ethereum : null;
              var providers = Array.isArray(eth && eth.providers) ? eth.providers.slice() : [];
              // Prefer MetaMask when multiple injected providers exist
              var chosen = (providers.find(function (p) { return p && p.isMetaMask; })) || providers[0] || eth;
              window.__ETHEREUM_SNAPSHOT__ = { ethereum: chosen || null, ethereumRaw: eth || null, providers: providers };
              console.log('snapshot set');
            }
          } catch (e) {
            window.__ETHEREUM_SNAPSHOT__ = { ethereum: null, ethereumRaw: null, providers: [] };
          }
        })();
      `}</Script>
      <h1>Ethereum Providers</h1>
      <section>
        <h2>eip-1193</h2>
        {ethereumFlags ? (
          <table style={tableStyle}>
            <tbody>
              {Object.entries(ethereumFlags).map(([key, value]) => (
                <tr key={key}>
                  <td style={cellStyle}>{key}</td>
                  <td style={cellStyle}>{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No window.ethereum detected</p>
        )}
        {providerFlags.length > 0 && (
          <>
            <h2>eip-1193 providers[]</h2>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={cellStyle}>#</th>
                  <th style={cellStyle}>flag</th>
                  <th style={cellStyle}>value</th>
                </tr>
              </thead>
              <tbody>
                {providerFlags.map((flags, idx) =>
                  Object.entries(flags).map(([key, value], i) => (
                    <tr key={`${idx}-${key}`}>
                      {i === 0 && (
                        <td
                          style={cellStyle}
                          rowSpan={Object.keys(flags).length}
                        >
                          {idx}
                        </td>
                      )}
                      <td style={cellStyle}>{key}</td>
                      <td style={cellStyle}>{String(value)}</td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </>
        )}
      </section>
      <section>
        <h2>eip-6963</h2>
        {wallets.length > 0 ? (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={cellStyle}>id</th>
                <th style={cellStyle}>name</th>
                <th style={cellStyle}>logo</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map(({ info }) => (
                <tr key={info.uuid}>
                  <td style={cellStyle}>{info.rdns}</td>
                  <td style={cellStyle}>{info.name}</td>
                  <td style={cellStyle}>
                    <img
                      alt={info.name}
                      src={info.icon}
                      style={{ width: 32, height: 32 }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No wallets detected</p>
        )}
      </section>
    </div>
  );
}
