import { ChainId } from '@rainbowkit/utils'
import { BaseProvider, Web3Provider } from '@ethersproject/providers'
import { serialize as serializeTransaction, UnsignedTransaction } from '@ethersproject/transactions'

const USDC = {
  [ChainId.MAINNET]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  [ChainId.POLYGON]: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
}

const USDC_ABI = [
  {
    constant: false,
    inputs: [{ name: 'newImplementation', type: 'address' }],
    name: 'upgradeTo',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: 'newImplementation', type: 'address' },
      { name: 'data', type: 'bytes' }
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'newAdmin', type: 'address' }],
    name: 'changeAdmin',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'admin',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: '_implementation', type: 'address' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  { payable: true, stateMutability: 'payable', type: 'fallback' },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'previousAdmin', type: 'address' },
      { indexed: false, name: 'newAdmin', type: 'address' }
    ],
    name: 'AdminChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: 'implementation', type: 'address' }],
    name: 'Upgraded',
    type: 'event'
  }
]

export const matcha = async (chainId: ChainId, provider: Web3Provider, address: string) => {
  const getSwapUrl = (url: string) =>
    `https://${url}/swap/v1/quote?buyAmount=${1 * 1_000_000}&buyToken=USDT&sellToken=USDC`

  let url: string

  switch (chainId) {
    case ChainId.POLYGON:
      url = getSwapUrl('polygon-cached-api.matcha.0x.org')
      break
    case ChainId.MAINNET:
      url = getSwapUrl('api.0x.org')
      break
  }
  const res = await fetch(url)
  const quote: UnsignedTransaction = await res.json()

  const signer = provider.getSigner()
}
