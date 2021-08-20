export const connectorByWallet = (name: string) => {
  switch (name) {
    case 'metamask':
    case 'trust':
      return 'injected'
    case 'coinbase':
    case 'walletlink':
      return 'walletlink'
  }
}
