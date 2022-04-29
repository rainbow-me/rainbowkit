import { detect } from 'detect-browser';

export function isSafari(): boolean {
  const browser = detect();
  return !!browser && browser.name === 'safari';
}
