import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { connectorByWallet, walletByConnector, chainNametoId, chainIdToName } from '../../packages/utils/src/convert'

let t = suite('connectorByWallet')

t('returns connector name by wallet name', () => {
  const WALLETS = ['metamask', 'coinbase', 'walletlink', 'frame', 'walletconnect', 'rainbow', 'argent']
  const CONNECTORS = [
    'Injected',
    'WalletLink',
    'WalletLink',
    'Frame',
    'WalletConnect',
    'WalletConnect',
    'WalletConnect'
  ]

  WALLETS.map((w, i) => {
    assert.equal(connectorByWallet(w), CONNECTORS[i])
  })
})

t = suite('walletByConnector')

t('returns wallet name by connector name', () => {
  const CONNECTORS = ['Injected', 'WalletLink', 'Frame', 'WalletConnect']
  const WALLETS = ['metamask', 'walletlink', 'frame', 'walletconnect']
  CONNECTORS.map((c, i) => {
    const actual = walletByConnector(`${c}Connector`)
    assert.equal(actual, WALLETS[i])
  })
})

t = suite('chainNametoId')

t('finds chain ID by chain name', () => {
  assert.equal([chainNametoId('ethereum'), chainNametoId('fuji')], [1, 43113])
})

t('returns 1 if chain is not found', () => {
  assert.equal(chainNametoId('unknown-chain'), 1)
})

t = suite('chainIdToName')

t('finds chain name by ID', () => {
  assert.equal([chainIdToName(1), chainIdToName(43113)], ['Ethereum', 'Avalanche Fuji Testnet'])
})

t('returns "Ethereum" if not found', () => {
  assert.equal(chainIdToName(666), 'Ethereum')
})

t.run()
