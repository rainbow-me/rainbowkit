import type { GetStaticProps } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { Cuer } from 'cuer';

interface Wallet {
  name: string;
  svgDataUrl: string;
}

interface IconsProps {
  wallets: Wallet[];
}

export const getStaticProps: GetStaticProps<IconsProps> = async () => {
  const wallets: Wallet[] = [];

  try {
    const walletConnectorsPath = path.join(
      process.cwd(),
      'node_modules/@rainbow-me/rainbowkit/dist/wallets/walletConnectors',
    );

    const files = fs.readdirSync(walletConnectorsPath);

    // Find hashed JS files (e.g., backpackWallet-QESORHY7.js)
    const hashedJsFiles = files.filter((file) =>
      /^[a-zA-Z0-9]+(Wallet|Account)-[A-Z0-9]+\.js$/.test(file),
    );

    const seenWallets = new Set<string>();

    for (const jsFile of hashedJsFiles) {
      try {
        const walletName = jsFile.split('-')[0];
        const jsFilePath = path.join(walletConnectorsPath, jsFile);
        const jsContent = fs.readFileSync(jsFilePath, 'utf-8');

        const svgDataUrlMatch = jsContent.match(
          /var \w+_default = "(data:image\/svg\+xml,[^"]+)";/,
        );

        if (svgDataUrlMatch?.[1] && !seenWallets.has(walletName)) {
          seenWallets.add(walletName);
          wallets.push({
            name: walletName,
            svgDataUrl: svgDataUrlMatch[1],
          });
        }
      } catch (error) {
        console.error(`Error processing ${jsFile}:`, error);
      }
    }

    wallets.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error reading wallet connectors:', error);
  }

  return {
    props: {
      wallets,
    },
  };
};

export default function Icons({ wallets }: IconsProps) {
  return (
    <>
      <div className="page-wrapper">
        <div className="container">
          <div className="grid">
            {wallets.map((wallet) => (
              <div className="card" key={wallet.name}>
                <div className="wallet-name">{wallet.name}</div>
                <div className="svg-container">
                  <div className="svg-box">
                    <div className="size-label">28×28</div>
                    <div className="svg-display small">
                      <img src={wallet.svgDataUrl} alt={wallet.name} />
                    </div>
                  </div>
                  <div className="svg-box">
                    <div className="size-label">120×120</div>
                    <div className="svg-display large">
                      <img src={wallet.svgDataUrl} alt={wallet.name} />
                    </div>
                  </div>
                  <div className="svg-box">
                    <div className="size-label">QR</div>
                    <div className="svg-display large">
                      <Cuer.Root
                        errorCorrection="medium"
                        size={120}
                        value="https://wevm.dev"
                      >
                        <Cuer.Cells radius={1} />
                        <Cuer.Finder radius={0.25} />
                        <Cuer.Arena>
                          <img
                            alt={wallet.name}
                            src={wallet.svgDataUrl}
                            style={{
                              objectFit: 'cover',
                              height: '88%',
                              width: '88%',
                              borderRadius: '22.5%',
                            }}
                          />
                        </Cuer.Arena>
                      </Cuer.Root>
                    </div>
                  </div>
                </div>
                <button
                  className="file-path"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `packages/rainbowkit/src/wallets/walletConnectors/${wallet.name}/${wallet.name}.svg`,
                    );
                  }}
                  aria-label="Copy file path"
                  title="Copy full path to clipboard"
                >
                  <span>
                    src/wallets/walletConnectors/{wallet.name}/{wallet.name}
                    .svg
                  </span>
                  <svg
                    className="copy-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Copy to clipboard"
                  >
                    <title>Copy to clipboard</title>
                    <path
                      d="M9.5 1H2.5C1.94772 1 1.5 1.44772 1.5 2V9C1.5 9.55228 1.94772 10 2.5 10H9.5C10.0523 10 10.5 9.55228 10.5 9V2C10.5 1.44772 10.0523 1 9.5 1Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.5 10V11.5C3.5 12.0523 3.94772 12.5 4.5 12.5H11.5C12.0523 12.5 12.5 12.0523 12.5 11.5V4.5C12.5 3.94772 12.0523 3.5 11.5 3.5H10"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-wrapper {
            min-height: 100vh;
            background: #f5f5f5;
            padding: 40px 20px;
            font-family: -apple-system, BlinkMacSystemFont,
              'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
              sans-serif;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(
              auto-fill,
              minmax(550px, 1fr)
            );
            gap: 24px;
        }

        .card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .wallet-name {
            font-size: 20px;
            font-weight: 600;
            color: #333;
            margin-bottom: 16px;
        }

        .svg-container {
            display: flex;
            gap: 24px;
            align-items: center;
            margin-bottom: 16px;
            flex-wrap: wrap;
        }

        .svg-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }

        .size-label {
            font-size: 12px;
            font-weight: 600;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .svg-display {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f0f0f0;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            padding: 8px;
        }

        .svg-display.small {
            width: 44px;
            height: 44px;
        }

        .svg-display.large {
            width: 136px;
            height: 136px;
        }

        .svg-box:last-child .svg-display {
            background: white;
        }

        .svg-display.small img {
            width: 28px;
            height: 28px;
            border-radius: 6px;
        }

        .svg-display.large img {
            width: 120px;
            height: 120px;
            border-radius: 25.71px;
        }

        .file-path {
            position: relative;
            width: 100%;
            font-size: 11px;
            color: #999;
            font-family: 'Monaco', 'Menlo', monospace;
            word-break: break-all;
            padding: 8px 32px 8px 8px;
            background: #f9f9f9;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s;
            text-align: left;
        }

        .file-path:hover {
            background: #f0f0f0;
            border-color: #ccc;
        }

        .file-path:active {
            background: #e8e8e8;
        }

        .file-path span {
            flex: 1;
        }

        .copy-icon {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
        }

        @media (max-width: 768px) {
            .grid {
                grid-template-columns: 1fr;
            }

            .svg-container {
                flex-direction: column;
                gap: 16px;
            }
        }
      `}</style>
    </>
  );
}
