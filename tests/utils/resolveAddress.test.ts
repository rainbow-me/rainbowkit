import { AlchemyProvider } from '@ethersproject/providers';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { resolveAddress } from '../../packages/rainbowkit-old/src/utils/resolveAddress';

const t = suite('resolveAddress');

const ADDRESS = '0x0000000000000000000000000000000000000000';

const provider = new AlchemyProvider(
  'homestead',
  'ep6XqV8bdsg6M4UPa7phx7poMlXTL9pk'
);

t('returns Ethereum address if it was passed', async () => {
  assert.equal(await resolveAddress({ addr: ADDRESS, provider }), ADDRESS);
});

t('resolves ENS name', async () => {
  assert.equal(
    await resolveAddress({ addr: 'v1rtl.eth', provider }),
    '0xD3B282e9880cDcB1142830731cD83f7ac0e1043f'
  );
});

t.run();
