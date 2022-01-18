import { BigNumber } from '@ethersproject/bignumber';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { guessTitle } from '../../packages/rainbowkit/src/utils/guessTitle';

const ADDRESS = '0x0000000000000000000000000000000000000000';

const t = suite('guessTitle');

t('if sender is the same as receiver return `Cancel transaction`', () => {
  assert.equal(
    guessTitle({ data: '0x', from: ADDRESS, to: ADDRESS }),
    'Cancel transaction'
  );
});

t('if transaction contains value return `Transfer ...`', () => {
  assert.equal(
    guessTitle({
      chainId: 1,
      data: '0x',
      from: ADDRESS,
      to: '0x0000000000000000000000000000000000000001',
      value: BigNumber.from(`${12 * 10 ** 18}`),
    }),
    `Transfer 12.0 ETH from 0x000...000 to 0x000...001`
  );
});

t('returns "Contract call" if data is not empty', () => {
  assert.equal(
    guessTitle({
      data: '0x123456',
      from: ADDRESS,
      to: '0x0000000000000000000000000000000000000001',
    }),
    'Contract call'
  );
});

t('returns "Transaction" if not enough data', () => {
  assert.equal(
    guessTitle({
      from: ADDRESS,
      to: '0x0000000000000000000000000000000000000001',
    }),
    'Transaction'
  );
});

t.run();
