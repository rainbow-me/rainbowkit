// ============================ Button Components ============================
// Main connect button with wallet connection flow
export { ConnectButton } from './ConnectButton/ConnectButton';
export type { ConnectButtonProps } from './ConnectButton/ConnectButton';

// Individual wallet button for specific wallet connections
export { WalletButton } from './WalletButton/WalletButton';
export type { WalletButtonProps } from './WalletButton/WalletButton';

// ============================ Avatar Components ============================
// Main Avatar component that displays user avatars with optional loading states
export { Avatar } from './Avatar/Avatar';
export type { AvatarProps } from './Avatar/Avatar';

// Default emoji-based avatar implementation
export { EmojiAvatar } from './Avatar/EmojiAvatar';
export type { AvatarComponentProps as EmojiAvatarProps } from './RainbowKitProvider/AvatarContext';

// Utility function to generate emoji avatars based on wallet addresses
export { emojiAvatarForAddress } from './Avatar/emojiAvatarForAddress';

// ============================ Modal Components ============================
// Modal for displaying account details, balance, and disconnect functionality
export { AccountModal } from './AccountModal/AccountModal';
export type { AccountModalProps } from './AccountModal/AccountModal';

// Modal for switching between different chains
export { ChainModal } from './ChainModal/ChainModal';
export type { ChainModalProps } from './ChainModal/ChainModal';
