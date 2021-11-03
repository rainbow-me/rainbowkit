import { guessTitle } from '../../packages/utils/src/guessTitle'
import { suite } from 'uvu'
import { BigNumber } from '@ethersproject/bignumber'
import * as assert from 'uvu/assert'

const ADDRESS = '0x0000000000000000000000000000000000000000'

const t = suite('guessTitle')

t('if sender is the same as receiver return `Cancel transaction`', () => {
  assert.equal(guessTitle({ data: '0x', from: ADDRESS, to: ADDRESS }), 'Cancel transaction')
})

t('if transaction contains value return `Transfer ...`', () => {
  assert.equal(
    guessTitle({
      data: '0x',
      value: BigNumber.from(`${12 * 10 ** 18}`),
      chainId: 1,
      from: ADDRESS,
      to: '0x0000000000000000000000000000000000000001'
    }),
    `Transfer 12.00 ETH from 0x0000...0000 to 0x0000...0001`
  )
})

t('returns "Contract call" if data is not empty', () => {
  assert.equal(
    guessTitle({ data: '0x123456', from: ADDRESS, to: '0x0000000000000000000000000000000000000001' }),
    'Contract call'
  )
})

t('returns "Transaction" if not enough data', () => {
  assert.equal(guessTitle({ from: ADDRESS, to: '0x0000000000000000000000000000000000000001' }), 'Transaction')
})

t.run()
