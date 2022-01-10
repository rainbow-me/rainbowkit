import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { getWalletInfo } from '../../packages/rainbowkit/src/utils/wallets'

const t = suite('getWalletInfo')

t('getWalletInfo', () => {
  assert.equal(
    ['metamask', 'coinbase', 'walletlink', 'frame', 'torus', 'rainbow', 'trust', 'gnosis', 'argent'].map((x) =>
      getWalletInfo(x)
    ),
    [
      {
        name: 'MetaMask',
        logoURI: 'https://bafkreig23o6p5exkyrbhxveqap3krzeinisknloocwc5uijq6wrtrlpl3e.ipfs.dweb.link'
      },
      {
        name: 'Coinbase',
        logoURI: 'https://bafkreihl4wmkbzm44mxu33mbuy3hcrc5g6wmi32ns3y3gfwme6w2hcbdy4.ipfs.dweb.link'
      },
      {
        name: 'Coinbase',
        logoURI: 'https://bafkreihl4wmkbzm44mxu33mbuy3hcrc5g6wmi32ns3y3gfwme6w2hcbdy4.ipfs.dweb.link'
      },
      {
        name: 'Frame',
        logoURI: 'https://bafkreihgrm4ebmo7ybe6vzzhwgdpiv6t4jrljl5t7y7n3keyq6n6susvra.ipfs.dweb.link'
      },
      {
        name: 'Torus',
        logoURI: 'https://bafkreiao4cnnidbqblkmd2xfb2akutm2bjdr5r4xnbuwumzhda3ikxyb7a.ipfs.dweb.link'
      },
      {
        name: 'Rainbow',
        logoURI: 'https://bafkreico3pudvsd4j6emdtq4pmyfaat34reoebxyei7tvlpzp5hnec24qa.ipfs.dweb.link'
      },
      {
        name: 'Trust',
        logoURI: 'https://bafkreiaa457sqcvunki6x7uydyjmniox22vclagwqda5qbskwd27to32aq.ipfs.dweb.link'
      },
      {
        name: 'Gnosis',
        logoURI: 'https://bafkreifsbu7uy4m25t5hty27x7nfrz3ot3wcvlnqwfujom7ax6qmixgciu.ipfs.dweb.link'
      },
      {
        name: 'Argent',
        logoURI: 'https://bafkreic5w3umuv7hz7drgyp6ymmpiqre4cnd36ftsutrrazgrecpvo5rgq.ipfs.dweb.link'
      }
    ]
  )
})

t.run()
