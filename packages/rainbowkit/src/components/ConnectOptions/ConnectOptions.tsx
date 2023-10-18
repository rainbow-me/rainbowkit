import React, { useContext } from 'react';
import { isMobile } from '../../utils/isMobile';
import { RainbowButtonContext } from '../RainbowKitProvider/RainbowButtonContext';
import { DesktopOptions } from './DesktopOptions';
import { MobileOptions } from './MobileOptions';

export default function ConnectOptions({ onClose }: { onClose: () => void }) {
  const { connector } = useContext(RainbowButtonContext);

  // When doing mobile view and then switch straight to desktop the
  // rainbowkit modal will pop up if you have custom connector.
  return isMobile() || connector ? (
    <MobileOptions onClose={onClose} />
  ) : (
    <DesktopOptions onClose={onClose} />
  );
}
