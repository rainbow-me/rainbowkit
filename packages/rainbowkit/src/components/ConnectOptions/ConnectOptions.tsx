import React, { useContext } from 'react';
import { isMobile } from '../../utils/isMobile';
import { WalletButtonContext } from '../RainbowKitProvider/WalletButtonContext';
import { isEIP6963Connector } from '../../wallets/groupedWallets';
import { DesktopOptions } from './DesktopOptions';
import { MobileOptions } from './MobileOptions';
import { MobileStatus } from './MobileStatus';

export default function ConnectOptions({ onClose }: { onClose: () => void }) {
  const { connector } = useContext(WalletButtonContext);

  // Don't show mobile status for injected wallets or in dapp browsers
  // These wallet interactions should be instant not require loading indicator
  const showMobileStatus =
    connector &&
    !(connector.id === 'injected' || isEIP6963Connector(connector));

  return isMobile() ? (
    showMobileStatus ? (
      <MobileStatus onClose={onClose} />
    ) : (
      <MobileOptions onClose={onClose} />
    )
  ) : (
    <DesktopOptions onClose={onClose} />
  );
}
