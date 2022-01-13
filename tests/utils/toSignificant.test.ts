import { toSignificant } from '../../packages/rainbowkit/src/utils/toSignificant'
import { suite } from 'uvu'
import { BigNumber } from '@ethersproject/bignumber'
import * as assert from 'uvu/assert'

const t = suite('toSignificant')

const toBN = (n: number) => BigNumber.from(BigInt(n))

t('returns integer values as int', () => {
  assert.equal(toSignificant(BigNumber.from(BigInt(200000 * 10 ** 18))), '200K')
})

t('returns a 4-digit fixed value if more than 9999', () => {
  assert.equal(toSignificant(toBN(50000.21 * 10 ** 18)), '50K')
})

t('returns a float number if less than 9999', () => {
  assert.equal(
    [toBN(502.543 * 10 ** 18), toBN(27.2225 * 10 ** 18)].map((n) => toSignificant(n)),
    ['502.5', '27.22']
  )
})

t.run()
