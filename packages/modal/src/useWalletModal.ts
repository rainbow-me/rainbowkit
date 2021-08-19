import React from 'react'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useConnector } from '@rainbowkit/util'

export type Wallet = string | { name: string; hidden?: boolean }

export type Chain = number | { id: number; name: string }

export interface WalletModalOptions {
  wallets: Wallet[]
  modal?: React.ComponentType<{ wallets: Wallet[]; connect: (w: Wallet) => void; close: () => void }> | false
  chains: Chain[]
}

const importConnector = async (mod: string): Promise<any> =>
  await import(`@web3-react/${mod}-connector`).then((x) => x[`${mod.charAt(0).toUpperCase() + mod.slice(1)}Connector`])

export const initWallets = async ({ wallets, chains }: WalletModalOptions) => {
  const connectors = []

  const pushConnector = async (connector: string) => {
    const Connector = await importConnector(connector)
    const inst = new Connector({ supportedChainIds: chains })

    connectors.push(inst)
  }

  for (const wallet of wallets) {
    if (typeof wallet === 'string') {
      switch (wallet) {
        case 'metamask':
          await pushConnector('injected')
          break
        case 'walletlink':
        case 'coinbase':
          await pushConnector('walletlink')
          break
      }
    }
  }

  return Promise.all(connectors)
}

console.log(await initWallets({ chains: [1], wallets: ['metamask'] }))
