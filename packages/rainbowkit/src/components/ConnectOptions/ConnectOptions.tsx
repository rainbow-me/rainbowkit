import React from 'react';
import { isMobile } from '../../utils/isMobile';
import { DesktopOptions } from './DesktopOptions';
import { MobileOptions } from './MobileOptions';

export default function ConnectOptions({
  onClose,
  onConnect,
}: {
  onClose: () => void;
  onConnect?: () => void;
}) {
  return isMobile() ? (
    <MobileOptions onClose={onClose} onConnect={onConnect} />
  ) : (
    <DesktopOptions onClose={onClose} onConnect={onConnect} />
  );
}
