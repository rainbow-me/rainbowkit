import type { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type { DefaultWalletOptions } from './../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export type UniversalProfilesWalletOptions = DefaultWalletOptions;

export const universalProfilesWallet = ({
  projectId,
  walletConnectParameters,
}: UniversalProfilesWalletOptions): Wallet => {
  const isInjected = hasInjectedProvider({ namespace: 'lukso' });
  // const isInjected = typeof window !== "undefined" && !!(window as any).lukso;
  const shouldUseWalletConnect = !isInjected;

  return {
    id: 'universal-profiles',
    name: 'Universal Profiles',
    rdns: 'io.universaleverything.universalprofiles',
    iconUrl: async () =>
      (await import('./universalProfilesWallet.svg')).default,
    iconAccent: '#6e77a9',
    iconBackground: '#6e77a9',
    installed: !shouldUseWalletConnect ? isInjected : undefined,
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=io.universaleverything.universalprofiles',
      ios: 'https://apps.apple.com/us/app/universalprofiles/id6702018631',
      mobile: 'https://my.universalprofile.cloud',
      qrCode: 'https://my.universalprofile.cloud/apps',
      chrome:
        'https://chrome.google.com/webstore/detail/abpickdkkbnbcoepogfhkhennhfhehfn',
      browserExtension: 'https://my.universalprofile.cloud',
    },
    mobile: {
      getUri: shouldUseWalletConnect ? (uri: string) => uri : undefined,
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl: 'https://docs.lukso.tech/',
            steps: [
              {
                description:
                  'We recommend putting Universal Profiles on your home screen for faster access to your wallet.',
                step: 'install',
                title: 'Open the Universal Profiles app',
              },
              {
                description:
                  'Be sure to back up your Universal Profiles using a secure method. Never share your private key with anyone.',
                step: 'create',
                title: 'Create a Universal Profile',
              },
              {
                description:
                  'Once you set up your Universal Profile, click below to get the QR code to scan with your mobile phone.',
                step: 'scan',
                title: 'Scan the QR code',
              },
            ],
          },
        }
      : undefined,
    extension: {
      instructions: {
        learnMoreUrl: 'https://docs.lukso.tech/install-up-browser-extension',
        steps: [
          {
            description:
              'We recommend pinning Universal Profiles to your taskbar for quicker access to your wallet.',
            step: 'install',
            title: 'Install the Universal Profiles browser extension',
          },
          {
            description:
              'Be sure to back up your Universal Profiles using a secure method. Never share your private key with anyone.',
            step: 'create',
            title: 'Create or Import a Universal Profile',
          },
          {
            description:
              'Once you set up your Universal Profile, click below to refresh the browser and load up the extension.',
            step: 'refresh',
            title: 'Refresh your browser',
          },
        ],
      },
    },
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({ projectId, walletConnectParameters })
      : getInjectedConnector({
          namespace: 'lukso',
        }),
  };
};
