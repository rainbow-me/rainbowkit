import { useCallback, useEffect } from 'react';
import { isMobile } from '../../utils/isMobile';
import { isNotNullish } from '../../utils/isNotNullish';
import { useWalletConnectors } from '../../wallets/useWalletConnectors';
import { loadImages } from '../AsyncImage/useAsyncImage';
import { preloadAssetsIcon } from '../Icons/Assets';
import { preloadLoginIcon } from '../Icons/Login';
import { AuthenticationStatus } from '../RainbowKitProvider/AuthenticationContext';
import { signInIcon } from './../SignIn/SignIn';
import { useRainbowKitChains } from './RainbowKitChainContext';

interface UsePreloadImagesOptions {
  authenticationStatus: AuthenticationStatus | null;
}

export function usePreloadImages({
  authenticationStatus,
}: UsePreloadImagesOptions) {
  const rainbowKitChains = useRainbowKitChains();
  const walletConnectors = useWalletConnectors();

  const preloadImages = useCallback(() => {
    loadImages(
      ...walletConnectors.map(wallet => wallet.iconUrl),
      ...rainbowKitChains.map(chain => chain.iconUrl).filter(isNotNullish)
    );

    // Preload illustrations used on desktop
    if (!isMobile()) {
      preloadAssetsIcon();
      preloadLoginIcon();
    }

    if (authenticationStatus === 'unauthenticated') {
      loadImages(signInIcon);
    }
  }, [walletConnectors, rainbowKitChains, authenticationStatus]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);
}
