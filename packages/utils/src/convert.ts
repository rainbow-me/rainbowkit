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
    case 'fantom':
      return 250
  }
}

export const chainIDToToken = (id: number) => {
  switch (id) {
    default:
      return 'ETH'
    case 137:
      return 'MATIC'
    case 56:
      return 'BNB'
    case 250:
      return 'FTM'
  }
}

export const chainIDToExplorer = (id: number) => {
  switch (id) {
    case 1:
      return 'https://etherscan.com'
    case 56:
      return 'https://bscscan.com'
    case 137:
      return 'https://polygonscan.com'
  }
}
