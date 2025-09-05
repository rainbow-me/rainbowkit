import { useEffect, useState, type CSSProperties } from 'react';
import { createStore, type EIP6963ProviderDetail } from 'mipd';

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

export default function EthereumProviders() {
  const [ethereumFlags, setEthereumFlags] = useState<Record<
    string,
    boolean
  > | null>(null);
  const [providerFlags, setProviderFlags] = useState<Record<string, boolean>[]>(
    [],
  );
  const [wallets, setWallets] = useState<readonly EIP6963ProviderDetail[]>([]);

  useEffect(() => {
    const eth = (window as any).ethereum as Record<string, unknown> | undefined;
    if (!eth) return;

    setEthereumFlags(extractFlags(eth));

    const providers = Array.isArray((eth as any).providers)
      ? (eth as any).providers
      : [];
    setProviderFlags(
      providers.map((p: Record<string, unknown>) => extractFlags(p)),
    );
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
    <div style={{ padding: 20, textAlign: 'left' }}>
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
