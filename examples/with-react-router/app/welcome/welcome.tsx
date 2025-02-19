import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Providers } from '../providers';
import 'node_modules/@rainbow-me/rainbowkit/dist/index.css';

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <Providers>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 12,
          }}
        >
          <ConnectButton />
        </div>
      </Providers>
    </main>
  );
}
