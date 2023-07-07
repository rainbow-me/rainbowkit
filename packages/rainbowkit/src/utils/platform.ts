import { UAParser } from 'ua-parser-js';

const ua = UAParser();
const { os } = ua;

export function isWindows(): boolean {
  return os.name === 'Windows';
}

export function isMacOS(): boolean {
  return os.name === 'Mac OS';
}

export function isLinux(): boolean {
  return ['Ubuntu', 'Mint', 'Fedora', 'Debian', 'Arch', 'Linux'].includes(
    os.name!
  );
}
