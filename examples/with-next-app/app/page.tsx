'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

function Page() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton />
    </div>
  );
}

export default Page;
