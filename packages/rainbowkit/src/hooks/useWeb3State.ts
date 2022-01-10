import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'

/**
 * Renames some of the `useWeb3React` properties for convinience
 */
export const useWeb3State = () => {
  const { library: provider, active: isConnected, account: address, ...web3ReactProps } = useWeb3React<Web3Provider>()

  return { provider, isConnected, address, ...web3ReactProps }
}
