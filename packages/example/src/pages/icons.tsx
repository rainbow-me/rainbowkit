import { useState, useEffect } from 'react';
import { Cuer } from 'cuer';
import * as wallets from '@rainbow-me/rainbowkit/wallets';

const names = Object.keys(wallets)
  .filter((k) => typeof (wallets as Record<string, unknown>)[k] === 'function')
  .sort();

async function loadIcon(fn: unknown): Promise<string | null> {
  for (const p of [
    {},
    { projectId: '_' },
    { appName: '_' },
    { projectId: '_', appName: '_' },
  ]) {
    try {
      const w = Object.keys(p).length
        ? (fn as Function)(p)
        : (fn as Function)();
      if (w?.iconUrl) {
        const icon =
          typeof w.iconUrl === 'function' ? await w.iconUrl() : w.iconUrl;
        if (icon) return icon;
      }
    } catch {}
  }
  return null;
}

export default function Icons() {
  const [icons, setIcons] = useState<Record<string, string>>({});

  useEffect(() => {
    for (const name of names) {
      loadIcon((wallets as Record<string, unknown>)[name]).then((icon) => {
        if (icon) setIcons((prev) => ({ ...prev, [name]: icon }));
      });
    }
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f5f5',
        padding: '40px 20px',
        fontFamily: 'system-ui',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(550px,1fr))',
          gap: 24,
        }}
      >
        {names.map((name) => {
          const icon = icons[name];
          return (
            <div
              key={name}
              style={{
                background: 'white',
                borderRadius: 12,
                padding: 24,
                boxShadow: '0 2px 8px rgba(0,0,0,.1)',
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
                {name}
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 24,
                  marginBottom: 16,
                  flexWrap: 'wrap',
                }}
              >
                {[28, 120].map((s) => (
                  <div
                    key={s}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <div
                      style={{ fontSize: 12, fontWeight: 600, color: '#666' }}
                    >
                      {s}×{s}
                    </div>
                    <div
                      style={{
                        width: s + 16,
                        height: s + 16,
                        background: '#f0f0f0',
                        border: '2px solid #e0e0e0',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {icon && (
                        <img
                          src={icon}
                          alt={name}
                          style={{
                            width: s,
                            height: s,
                            borderRadius: s === 28 ? 6 : 25.71,
                            background: 'white',
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#666' }}>
                    QR
                  </div>
                  <div
                    style={{
                      width: 136,
                      height: 136,
                      background: 'white',
                      border: '2px solid #e0e0e0',
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {icon && (
                      <Cuer.Root
                        errorCorrection="medium"
                        size={120}
                        value="https://wevm.dev"
                      >
                        <Cuer.Cells radius={1} />
                        <Cuer.Finder radius={0.25} />
                        <Cuer.Arena>
                          <img
                            src={icon}
                            alt={name}
                            style={{
                              objectFit: 'cover',
                              height: '88%',
                              width: '88%',
                              borderRadius: '22.5%',
                              background: 'white',
                            }}
                          />
                        </Cuer.Arena>
                      </Cuer.Root>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `packages/rainbowkit/src/wallets/walletConnectors/${name}/${name}.svg`,
                  )
                }
                style={{
                  width: '100%',
                  fontSize: 11,
                  color: '#999',
                  fontFamily: 'monospace',
                  padding: '8px 32px 8px 8px',
                  background: '#f9f9f9',
                  borderRadius: 4,
                  border: '1px solid #e0e0e0',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                src/wallets/walletConnectors/{name}/{name}.svg
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
