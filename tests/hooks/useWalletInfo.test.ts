import { renderHook } from '@testing-library/react-hooks';
import { JSDOM } from 'jsdom';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { useWalletInfo } from '../../packages/rainbowkit-old/src/hooks/useWalletInfo';

const { window } = new JSDOM('', { url: 'https://localhost' });

// @ts-ignore
global.window = window;
global.document = window.document;
global.navigator = window.navigator;
global.getComputedStyle = window.getComputedStyle;
global.requestAnimationFrame = null;
global.localStorage = window.localStorage;

const t = suite('useWalletInfo');

t('picks up last used wallet from storage', async () => {
  localStorage.setItem('rk-last-wallet', 'rainbow');

  const { result } = renderHook(() => useWalletInfo());

  assert.equal(result.current, {
    logoURI:
      'https://cloudflare-ipfs.com/ipfs/bafkreico3pudvsd4j6emdtq4pmyfaat34reoebxyei7tvlpzp5hnec24qa',
    name: 'Rainbow',
  });
  localStorage.removeItem('rk-last-wallet');
});

t('accepts initial value', () => {
  const { result } = renderHook(() =>
    useWalletInfo({
      logoURI:
        'https://cloudflare-ipfs.com/ipfs/bafkreico3pudvsd4j6emdtq4pmyfaat34reoebxyei7tvlpzp5hnec24qa',
      name: 'Rainbow',
    })
  );

  assert.equal(result.current, {
    logoURI:
      'https://cloudflare-ipfs.com/ipfs/bafkreico3pudvsd4j6emdtq4pmyfaat34reoebxyei7tvlpzp5hnec24qa',
    name: 'Rainbow',
  });
});

t.run();
