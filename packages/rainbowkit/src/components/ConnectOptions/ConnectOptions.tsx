import React, { useContext } from 'react';
import { isMobile } from '../../utils/isMobile';
import { RainbowButtonContext } from '../RainbowKitProvider/RainbowButtonContext';
import { DesktopOptions } from './DesktopOptions';
import { MobileOptions } from './MobileOptions';
import { MobileStatus } from './MobileStatus';

export default function ConnectOptions({ onClose }: { onClose: () => void }) {
  const { connector } = useContext(RainbowButtonContext);

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
