import { BigNumber } from '@ethersproject/bignumber'
import { hexStripZeros } from '@ethersproject/bytes'
import { Web3Provider } from '@ethersproject/providers'
import type { Chain } from './chains'

/**
 * Switch web3 provider network
 * @param provider web3 provider
 * @param chain chain object
 */
export const switchNetwork = async (provider: Web3Provider, chain: Chain) => {
  const obj = {
    chainId: `0x${chain.chainId.toString(16)}`,
    chainName: chain.name,
    nativeCurrency: chain.nativeCurrency,
    rpcUrls: chain.rpc
  }

  const formattedChainId = hexStripZeros(BigNumber.from(chain.chainId).toHexString())

  try {
    await provider.send('wallet_switchEthereumChain', [
      {
        chainId: formattedChainId
      }
    ])
  } catch (error: any) {
    // walletconnect-connector throws an "JSON RPC response format is invalid", but
    // this error is not correct. The RPC response is valid, and the network has changed.
    // Other L2-centric apps recognize this error and switch the network.
    console.error(error)

    // checks if metamask error
    if (error.code === 4902) {
      try {
        // metamask (only known implementer) automatically switches after a network is added
        // the second call is done here because that behavior is not a part of the spec and cannot be relied upon in the future
        // metamask's behavior when switching to the current network is just to return null (a no-op)
        await provider.send('wallet_addEthereumChain', [obj])
        await switchNetwork(provider, chain)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
