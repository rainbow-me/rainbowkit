import { RainbowKitWalletConnectParameters } from './Wallet';

interface GetWalletConnectMetaDataParameters {
  appName: string;
  appDescription?: string;
  appUrl?: string;
  appIcon?: string;
}

export const getWalletConnectMetaData = ({
  appName,
  appDescription,
  appUrl,
  appIcon,
}: GetWalletConnectMetaDataParameters): RainbowKitWalletConnectParameters['metadata'] => {
  return {
    name: appName,
    description: appDescription ?? appName,
    url: appUrl ?? (typeof window !== 'undefined' ? window.location.href : ''),
    icons: [...(appIcon ? [appIcon] : [])],
  };
};
