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
    case 1:
    case 3:
    case 4:
    case 5:
    case 42:
      return 'ETH'
    case 137:
      return 'MATIC'
    case 56:
      return 'BNB'
    case 250:
      return 'FTM'
  }
}
