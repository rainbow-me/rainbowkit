import React, { ReactNode, useMemo } from 'react';
import {
  ThemeProvider,
  ThemeProviderProps,
} from '../ThemeProvider/ThemeProvider';
import { ChainIconsContext, ChainWithIconUrl } from './ChainIconsContext';
import { Wallet, WalletsContext } from './WalletsContext';
import { provideChainIconUrls } from './provideChainIconUrls';

export interface RainbowKitProviderProps extends ThemeProviderProps {
  wallets: Wallet[];
  chains: ChainWithIconUrl[];
  children: ReactNode;
}

export function RainbowKitProvider({
  chains,
  children,
  wallets,
  ...themeProps
}: RainbowKitProviderProps) {
  const chainsWithIconUrls = useMemo(
    () => provideChainIconUrls(chains),
    [chains]
  );

  return (
    <WalletsContext.Provider value={wallets}>
      <ChainIconsContext.Provider value={chainsWithIconUrls}>
        <ThemeProvider {...themeProps}>{children}</ThemeProvider>
      </ChainIconsContext.Provider>
    </WalletsContext.Provider>
  );
}
