import { toSignificant } from '../../packages/utils/src/toSignificant'
import { suite } from 'uvu'
import { BigNumber } from '@ethersproject/bignumber'
import * as assert from 'uvu/assert'

const t = suite('toSignificant')

t('returns integer values as int', () => {
  assert.equal(toSignificant(BigNumber.from(`${2 * 10 ** 18}`)), '2')
})

t.run()
