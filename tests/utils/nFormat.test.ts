import { nFormat } from '../../packages/rainbowkit/src/utils/nFormat'
import { suite } from 'uvu'
import * as assert from 'uvu/assert'

const t = suite('nFormat')

t('converts different numbers to different groups', () => {
  assert.equal(
    [2 * 10 ** 3, 2 * 10 ** 5, 2 * 10 ** 6, 2 * 10 ** 9, 2 * 10 ** 12].map((x) => nFormat(x)),
    ['2K', '200K', '2M', '2B', '2T']
  )
})

t.run()
