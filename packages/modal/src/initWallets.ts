import { WalletModalOptions, Connector, Wallet } from './types'

const importConnector = async (mod: string): Promise<any> =>
  import(`@web3-react/${mod}-connector/dist/${mod}-connector.esm.js`).then(
    (x) => x[`${mod.charAt(0).toUpperCase() + mod.slice(1)}Connector`]
  )

export const initWallets = async ({ wallets, chains }: WalletModalOptions): Promise<Connector[]> => {
  const connectors = []

  const pushConnector = async (connector: string, name: string, hidden = false, settings: any = {}) => {
    const Connector = await importConnector(connector)
    const inst = new Connector({ ...settings, supportedChainIds: chains })

    connectors.push({ connector: inst, name, hidden })
  }

  for (const wallet of wallets) {
    const walletName = typeof wallet === 'string' ? wallet : wallet.name

    const options = (wallet as Wallet)?.options

    const hidden = typeof wallet !== 'string' && wallet.hidden

    switch (walletName) {
      case 'metamask':
        await pushConnector('injected', 'metamask', hidden, options)
        break
      case 'walletlink':
      case 'coinbase':
        await pushConnector('walletlink', 'walletlink', hidden, options)
        break
    }
  }

  return Promise.all(connectors)
}
