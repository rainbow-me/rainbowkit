import { BigNumber } from '@ethersproject/bignumber';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { labelTransaction } from '../../packages/rainbowkit-old/src/utils/labelTransaction';

const ADDRESS = '0x0000000000000000000000000000000000000000';

const ERC20ABI = [
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const t = suite('labelTransaction');

t('if sender is the same as receiver return `Cancel transaction`', () => {
  assert.equal(
    labelTransaction({ data: '0x', from: ADDRESS, to: ADDRESS }),
    'Cancel'
  );
});

t('if transaction contains value return `Transfer ...`', () => {
  assert.equal(
    labelTransaction({
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
    labelTransaction({
      data: '0x123456',
      from: ADDRESS,
      to: '0x0000000000000000000000000000000000000001',
    }),
    'Contract call'
  );
});

t('returns "Transaction" if not enough data', () => {
  assert.equal(
    labelTransaction({
      from: ADDRESS,
      to: '0x0000000000000000000000000000000000000001',
    }),
    'Transaction'
  );
});

t('supports custom ABIs', () => {
  assert.equal(
    labelTransaction({
      abi: ERC20ABI,
      data: '0x095ea7b3000000000000000000000000e5c783ee536cf5e63e792988335c4255169be4e1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    }),
    'Approve'
  );
});

t.run();
