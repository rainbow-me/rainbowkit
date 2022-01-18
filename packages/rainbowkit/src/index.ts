export * from './components';

export { useENSWithAvatar } from './hooks/useENSWithAvatar';
export { useExplorerTxHistory } from './hooks/useExplorerTxHistory';
export { useSignificantBalance } from './hooks/useSignificantBalance';
export { useSignMessage } from './hooks/useSignMessage';
export { useTxHistory } from './hooks/useTxHistory';
export type {
  Transaction,
  TransactionStatus,
  TransactionWithStatus,
} from './hooks/useTxHistory';
export { useWalletInfo } from './hooks/useWalletInfo';
export { useWalletModal } from './hooks/useWalletModal';
export type {
  UseWalletModalOptions,
  WalletInterface,
} from './hooks/useWalletModal';
export { useWeb3State } from './hooks/useWeb3State';

export { setupProvider, withWeb3React } from './utils/withWeb3React';
export type { Web3ProviderInit } from './utils/withWeb3React';
export { isAuthorized } from './utils/isAuthorized';
export {
  chainIdToAlias,
  chainIDToExplorer,
  chainIdToName,
  chainIDToToken,
  chainNametoId,
  connectorByWallet,
  walletByConnector,
} from './utils/convert';
export { isAddress, shortenAddress } from './utils/address';
export { toSignificant } from './utils/toSignificant';
export { guessTitle } from './utils/guessTitle';
export { chains, ChainId } from './utils/chains';
export type { Chain } from './utils/chains';
export { switchNetwork } from './utils/network';
export { getWalletInfo } from './utils/wallets';
export type { Wallet } from './utils/wallets';
export { etherscanFetcher, logsFetcher } from './utils/fetchers';
export type { TxHistoryFetcher } from './utils/fetchers';
export {
  addressHashedColorIndex,
  addressHashedEmoji,
  addressHashedIndex,
  avatarColor,
  avatars,
  colorHexToIndex,
  colors,
  emojiColorIndexes,
  hashCode,
  popularEmojis,
} from './utils/colors';
export { resolveAddress } from './utils/resolveAddress';
export { walletConnectRPCs } from './utils/wc';

export type { Theme } from './css/sprinkles.css';
export { lightTheme } from './themes/lightTheme';
export { darkTheme } from './themes/darkTheme';
export { dimTheme } from './themes/dimTheme';
export { cssStringFromTheme } from './css/cssStringFromTheme';
export { cssObjectFromTheme } from './css/cssObjectFromTheme';
