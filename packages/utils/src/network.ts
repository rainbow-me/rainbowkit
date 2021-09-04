import { Web3Provider } from '@ethersproject/providers'
import type { Chain } from './chains'

export const switchNetwork = async (provider: Web3Provider, chain: Chain) => {
  const obj = {
    chainId: `0x${chain.chainId.toString(16)}`,
    chainName: chain.name,
    nativeCurrency: chain.nativeCurrency,
    rpcUrls: chain.rpc
  }

  try {
    if (chain.explorers) {
      await provider.send('wallet_addEthereumChain', [
        {
          ...obj,
          blockExplorerUrls: [chain.explorers[0].url]
        }
      ])
    }

    await provider.send('wallet_addEthereumChain', [obj])
  } catch (e) {
    console.error(e)

    try {
      await provider.send('wallet_switchEthereumChain', [
        {
          chainId: `0x${chain.chainId.toString(16)}`
        }
      ])
    } catch (e) {
      console.error(e)
    }
  }
}
