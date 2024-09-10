import type { EIP1193Provider } from 'viem';

/** Combines members of an intersection into a readable type. */
export type Evaluate<type> = { [key in keyof type]: type[key] } & unknown;

/** Removes `readonly` from all properties of an object. */
export type Mutable<type extends object> = {
  -readonly [key in keyof type]: type[key];
};

/** Strict version of built-in Omit type */
export type Omit<type, keys extends keyof type> = Pick<
  type,
  Exclude<keyof type, keys>
>;

// window.ethereum types

export type WalletProviderFlags =
  | 'isApexWallet'
  | 'isAvalanche'
  | 'isBackpack'
  | 'isBifrost'
  | 'isBitKeep'
  | 'isBitski'
  | 'isBlockWallet'
  | 'isBraveWallet'
  | 'isCoinbaseWallet'
  | 'isDawn'
  | 'isEnkrypt'
  | 'isExodus'
  | 'isFrame'
  | 'isFrontier'
  | 'isGamestop'
  | 'isHyperPay'
  | 'isImToken'
  | 'isKuCoinWallet'
  | 'isMathWallet'
  | 'isMetaMask'
  | 'isNestWallet'
  | 'isOkxWallet'
  | 'isOKExWallet'
  | 'isOneInchAndroidWallet'
  | 'isOneInchIOSWallet'
  | 'isOpera'
  | 'isPhantom'
  | 'isPortal'
  | 'isRabby'
  | 'isRainbow'
  | 'isStatus'
  | 'isTally'
  | 'isTokenPocket'
  | 'isTokenary'
  | 'isTrust'
  | 'isTrustWallet'
  | 'isXDEFI'
  | 'isZerion'
  | 'isTalisman'
  | 'isZeal'
  | 'isCoin98'
  | 'isMEWwallet'
  | 'isSafeheron'
  | 'isSafePal'
  | '__seif';

export type WalletProvider = Evaluate<
  EIP1193Provider & {
    [key in WalletProviderFlags]?: true | undefined;
  } & {
    providers?: any[] | undefined;
    /** Only exists in MetaMask as of 2022/04/03 */
    _events?: { connect?: (() => void) | undefined } | undefined;
    /** Only exists in MetaMask as of 2022/04/03 */
    _state?:
      | {
          accounts?: string[];
          initialized?: boolean;
          isConnected?: boolean;
          isPermanentlyDisconnected?: boolean;
          isUnlocked?: boolean;
        }
      | undefined;
  }
>;

export type WindowProvider = {
  coinbaseWalletExtension?: WalletProvider | undefined;
  ethereum?: WalletProvider | undefined;
  phantom?: { ethereum: WalletProvider } | undefined;
  providers?: any[] | undefined; // Adjust the type as needed
};
