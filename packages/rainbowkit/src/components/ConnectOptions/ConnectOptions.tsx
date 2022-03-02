import React from 'react';
import { isMobile } from '../../utils/isMobile';
import { DesktopOptions } from './DesktopOptions';
import { MobileOptions } from './MobileOptions';

export default function ConnectOptions({ onClose }: { onClose: () => void }) {
  return isMobile() ? (
    <MobileOptions onClose={onClose} />
  ) : (
    <DesktopOptions onClose={onClose} />
  );
}
