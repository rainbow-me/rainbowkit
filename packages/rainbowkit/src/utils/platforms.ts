import { UAParser } from 'ua-parser-js';

const ua = UAParser();
const { os } = ua;

export enum PlatformType {
  Windows = 'Windows',
  MacOS = 'macOS',
  Linux = 'Linux',
  Desktop = 'Desktop',
}

export function isWindows(): boolean {
  return os.name === 'Windows';
}

export function isMacOS(): boolean {
  return os.name === 'Mac OS';
}

export function isLinux(): boolean {
  return ['Ubuntu', 'Mint', 'Fedora', 'Debian', 'Arch', 'Linux'].includes(
    os.name!,
  );
}

export function getPlatform(): PlatformType {
  if (isWindows()) return PlatformType.Windows;
  if (isMacOS()) return PlatformType.MacOS;
  if (isLinux()) return PlatformType.Linux;
  return PlatformType.Desktop;
}
