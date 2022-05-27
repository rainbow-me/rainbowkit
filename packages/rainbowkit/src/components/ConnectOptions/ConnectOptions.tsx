import React from 'react';
import { isMobile } from '../../utils/isMobile';
import { ConnectionInfo } from '../ConnectButton/ConnectButton';
import { DesktopOptions } from './DesktopOptions';
import { MobileOptions } from './MobileOptions';

export default function ConnectOptions({
  onClose,
  onConnectChange,
}: {
  onClose: () => void;
  onConnectChange?: (connection: ConnectionInfo) => void;
}) {
  return isMobile() ? (
    <MobileOptions onClose={onClose} onConnectChange={onConnectChange} />
  ) : (
    <DesktopOptions onClose={onClose} onConnectChange={onConnectChange} />
  );
}
