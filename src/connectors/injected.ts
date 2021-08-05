import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { AbstractConnectorArguments } from '@web3-react/types'
import { Web3Provider } from '@ethersproject/providers'
import { useEagerConnect } from './common'

export const useWallet = (opts?: AbstractConnectorArguments) => {
  const {
    library: provider,
    activate,
    active: isConnected,
    deactivate: disconnect,
    chainId,
    connector,
    account: address,
    error
  } = useWeb3React<Web3Provider>()

  const injected = new InjectedConnector({ supportedChainIds: [1, 137], ...opts }) // Support mainnet and MATIC by default

  const tried = useEagerConnect(injected)

  const connect = async () => await activate(injected)

  return { provider, connect, isConnected, disconnect, chainId, connector, address, error }
}
