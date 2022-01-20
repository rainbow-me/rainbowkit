import { AlchemyWebSocketProvider } from '@ethersproject/providers';
import { renderHook } from '@testing-library/react-hooks';
import { JSDOM } from 'jsdom';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { useENSWithAvatar } from '../../packages/rainbowkit/src/hooks/useENSWithAvatar';

const { window } = new JSDOM('', { url: 'https://localhost' });

// @ts-ignore
global.window = window;
global.document = window.document;
global.requestAnimationFrame = null;

const t = suite<{
  provider: AlchemyWebSocketProvider;
}>('useENSWithAvatar');

t.before(context => {
  context.provider = new AlchemyWebSocketProvider(
    'homestead',
    'vINSe04ri6EJ_hs94sK88MMeIBVPhnNo'
  );
});

t('resolves avatar and domain', async ({ provider }) => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useENSWithAvatar({
      address: '0xD3B282e9880cDcB1142830731cD83f7ac0e1043f',
      provider,
    })
  );
  await waitForNextUpdate({ timeout: 5000 });
  await waitForNextUpdate({ timeout: 5000 });

  assert.equal(result.current, {
    avatar:
      'ipfs://bafkreia4t7isswz3fpqzwc7rokd5m7rd3dom7aavcbthxk5fggixncngru',
    domain: 'v1rtl.eth',
  });
});

t.after(({ provider }) => {
  provider.destroy();
});

t.run();
