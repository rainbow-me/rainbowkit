import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 12,
        }}
      >
        <ConnectButton />
      </div>
    </main>
  );
}
