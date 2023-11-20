import React, { useContext } from 'react';
import { isMobile } from '../../utils/isMobile';
import MobileLinking from '../MobileLinking/MobileLinking';
import { RainbowButtonContext } from '../RainbowKitProvider/RainbowButtonContext';
import { DesktopOptions } from './DesktopOptions';
import { MobileOptions } from './MobileOptions';

export default function ConnectOptions({ onClose }: { onClose: () => void }) {
  const { connector } = useContext(RainbowButtonContext);

  return isMobile() ? (
    connector ? (
      <MobileLinking onClose={onClose} />
    ) : (
      <MobileOptions onClose={onClose} />
    )
  ) : (
    <DesktopOptions onClose={onClose} />
  );
}
