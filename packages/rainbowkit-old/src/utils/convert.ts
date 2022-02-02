import { chains } from './chains';

/**
 * Finds a connector name by wallet name
 * @param wallet wallet name
 * @returns connector name
 */
export const connectorByWallet = (wallet: string) => {
  switch (wallet) {
    case 'metamask':
      return 'Injected';
    case 'coinbase':
    case 'walletlink':
      return 'WalletLink';
    case 'frame':
      return 'Frame';
    case 'walletconnect':
    case 'rainbow':
    case 'argent':
      return 'WalletConnect';
  }
};

/**
 * Finds a wallet name by connector name
 * @param connector connect name
 * @returns wallet name
 */
export const walletByConnector = (connector: string) => {
  switch (connector) {
    case 'InjectedConnector':
      return 'metamask';
    case 'WalletLinkConnector':
      return 'walletlink';
    case 'WalletConnectConnector':
      return 'walletconnect';
    case 'FrameConnector':
      return 'frame';
  }
};

export const chainNametoId = (name: string): number =>
  chains.find(chain => chain.aliases.includes(name))?.chainId || 1;

export const chainIdToName = (id: number): string =>
  chains.find(chain => chain.chainId === id)?.name || 'Ethereum';

export const chainIdToAlias = (id: number): string =>
  chains.find(chain => chain.chainId === id)?.aliases[0] || 'ethereum';

export const chainIDToToken = (id: number): string =>
  chains.find(chain => chain.chainId === id)?.nativeCurrency.symbol || 'ETH';

export const chainIDToExplorer = (id: number) =>
  chains.find(chain => chain.chainId === (!id || id === 0 ? 1 : id))
    ?.explorers?.[0] || {
    name: 'etherscan',
    standard: 'EIP3091',
    url: 'https://etherscan.io',
  };
