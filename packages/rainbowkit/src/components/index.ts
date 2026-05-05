// ============================ Provider Components ============================
// Main provider for RainbowKit context, theming, and modals

export type { AccountModalProps } from './AccountModal/AccountModal';
// ============================ Modal Components ============================
// Modal for displaying account details, balance, and disconnect functionality
export { AccountModal } from './AccountModal/AccountModal';
export type { AvatarProps } from './Avatar/Avatar';
// ============================ Avatar Components ============================
// Main Avatar component that displays user avatars with optional loading states
export { Avatar } from './Avatar/Avatar';
// Default emoji-based avatar implementation
export { EmojiAvatar } from './Avatar/EmojiAvatar';
// Utility function to generate emoji avatars based on wallet addresses
export { emojiAvatarForAddress } from './Avatar/emojiAvatarForAddress';
export type { ChainModalProps } from './ChainModal/ChainModal';
// Modal for switching between different chains
export { ChainModal } from './ChainModal/ChainModal';
export type { ConnectButtonProps } from './ConnectButton/ConnectButton';
// ============================ Button Components ============================
// Main connect button with wallet connection flow
export { ConnectButton } from './ConnectButton/ConnectButton';
export type { AvatarComponentProps as EmojiAvatarProps } from './RainbowKitProvider/AvatarContext';
export type { RainbowKitProviderProps } from './RainbowKitProvider/RainbowKitProvider';
export { RainbowKitProvider } from './RainbowKitProvider/RainbowKitProvider';
export type { WalletButtonProps } from './WalletButton/WalletButton';
// Individual wallet button for specific wallet connections
export { WalletButton } from './WalletButton/WalletButton';
