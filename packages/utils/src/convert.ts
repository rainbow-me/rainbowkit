export const connectorByWallet = (name: string) => {
  switch (name) {
    case 'metamask':
    case 'trust':
      return 'Injected'
    case 'coinbase':
    case 'walletlink':
      return 'WalletLink'
  }
}

export const chainNametoID = (name: string) => {
  switch (name) {
    case 'mainnet':
    case 'ethereum':
      return 1
    case 'matic':
    case 'polygon':
      return 137
    case 'bsc':
    case 'binance':
      return 56
  }
}
