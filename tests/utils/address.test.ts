import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { isAddress, shortenAddress } from '../../packages/utils/src/address'

const ADDRESS = '0x0000000000000000000000000000000000000000'

let t = suite('isAddress')

t('returns the address if it is a valid Ethereum address', () => {
  assert.equal(isAddress(ADDRESS), ADDRESS)
})

t('returns false if it is not an Ethereum address', () => {
  assert.equal(isAddress('not-ethereum-address'), false)
})

t.run()

t = suite('shortenAddress')

t('shortens an Ethereum address by N characters', () => {
  assert.equal(shortenAddress(ADDRESS, 3), '0x000...000')
})

t('shortens an Ethereum address by 4 characters by default', () => {
  assert.equal(shortenAddress(ADDRESS), '0x0000...0000')
})

t('throws if input address is invalid', () => {
  assert.throws(() => shortenAddress('not-addr', 4), "Invalid 'address' parameter ")
})

t.run()
