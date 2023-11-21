import React, { useContext } from 'react';
import { isMobile } from '../../utils/isMobile';
import { WalletButtonContext } from '../RainbowKitProvider/WalletButtonContext';
import { DesktopOptions } from './DesktopOptions';
import { MobileOptions } from './MobileOptions';
import { MobileStatus } from './MobileStatus';

export default function ConnectOptions({ onClose }: { onClose: () => void }) {
  const { connector } = useContext(WalletButtonContext);

  return isMobile() ? (
    connector ? (
      <MobileStatus onClose={onClose} />
    ) : (
      <MobileOptions onClose={onClose} />
    )
  ) : (
    <DesktopOptions onClose={onClose} />
  );
}
