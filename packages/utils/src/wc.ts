import { chains } from './chains'

const walletConnectRPCs: Record<number, string> = {}

for (const chain of chains) {
  walletConnectRPCs[chain.chainId] = chain.rpc[0]
}

export { walletConnectRPCs }
