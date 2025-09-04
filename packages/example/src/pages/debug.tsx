import { useEffect, useState } from 'react';
import { createStore, type EIP6963ProviderDetail } from 'mipd';

function extractFlags(obj: Record<string, unknown>) {
  const flags: Record<string, boolean> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('is') && typeof value === 'boolean') {
      flags[key] = value;
    }
  }
  return flags;
}

export default function Debug() {
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
      (providerDetails) => {
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
    <div style={{ padding: 20 }}>
      <h1>Debug</h1>
      <section>
        <h2>window.ethereum</h2>
        {ethereumFlags ? (
          <table>
            <tbody>
              {Object.entries(ethereumFlags).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No window.ethereum detected</p>
        )}
        {providerFlags.length > 0 && (
          <>
            <h3>window.ethereum.providers</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Flag</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {providerFlags.map((flags, idx) =>
                  Object.entries(flags).map(([key, value], i) => (
                    <tr key={`${idx}-${key}`}>
                      {i === 0 && (
                        <td rowSpan={Object.keys(flags).length}>{idx}</td>
                      )}
                      <td>{key}</td>
                      <td>{String(value)}</td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </>
        )}
      </section>
      <section>
        <h2>EIP-6963 Wallets</h2>
        {wallets.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Logo</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map(({ info }) => (
                <tr key={info.uuid}>
                  <td>{info.name}</td>
                  <td>
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
