import type { RainbowKitWalletConnectParameters } from './Wallet';

interface ComputeMetaDataParameters {
  appName: string;
  appDescription?: string;
  appUrl?: string;
  appIcon?: string;
}

export const computeWalletConnectMetaData = ({
  appName,
  appDescription,
  appUrl,
  appIcon,
}: ComputeMetaDataParameters): RainbowKitWalletConnectParameters['metadata'] => {
  return {
    name: appName,
    description: appDescription ?? appName,
    url: appUrl ?? (typeof window !== 'undefined' ? window.location.href : ''),
    icons: [...(appIcon ? [appIcon] : [])],
  };
};
