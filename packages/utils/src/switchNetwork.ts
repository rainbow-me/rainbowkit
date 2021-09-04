import { Web3Provider } from '@ethersproject/providers'
import { hexlify } from '@ethersproject/bytes'
import type { Chain } from './chains'

export const switchNetwork = (provider: Web3Provider, chain: Chain) => {
  const obj = {
    chainId: hexlify(chain.chainId),
    chainName: chain.name,
    nativeCurrency: chain.nativeCurrency,
    rpcUrls: chain.rpc
  }

  if (chain.explorers) {
    return provider.send('wallet_addEthereumChain', [
      {
        ...obj,
        blockExplorerUrls: [chain.explorers[0].url]
      }
    ])
  }

  return provider.send('wallet_addEthereumChain', [obj])
}
