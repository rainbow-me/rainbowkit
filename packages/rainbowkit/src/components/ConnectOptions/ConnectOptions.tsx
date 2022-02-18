import React from 'react';
import { isMobile } from '../../utils/isMobile';

import { useWallets } from '../RainbowKitProvider/useWallets';
import { DesktopOptions } from './DesktopOptions';

import { MobileOptions } from './MobileOptions';

export default function ConnectOptions() {
  const wallets = useWallets();

  return isMobile() ? (
    <MobileOptions wallets={wallets} />
  ) : (
    <DesktopOptions wallets={wallets} />
  );
}
