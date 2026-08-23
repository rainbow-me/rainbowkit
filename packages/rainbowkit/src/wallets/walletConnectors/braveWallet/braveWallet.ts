import { isMobile } from '../../../utils/isMobile';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import type { Wallet } from '../../Wallet';

function getMobileBraveProvider(provider: any, isConnecting: () => boolean) {
  return new Proxy(provider, {
    get(target, property, receiver) {
      const value = Reflect.get(target, property, receiver);

      if (property === 'request') {
        const request = value.bind(target);

        return async (args: { method: string }) => {
          if (args.method !== 'wallet_requestPermissions' || !isConnecting()) {
            return request(args);
          }

          const accounts = await request({ method: 'eth_requestAccounts' });
          return [{ caveats: [{ value: accounts }] }];
        };
      }

      return typeof value === 'function' ? value.bind(target) : value;
    },
  });
}

export const braveWallet = (): Wallet => ({
  id: 'brave',
  name: 'Brave Wallet',
  rdns: 'com.brave.wallet',
  iconUrl: async () => (await import('./braveWallet.svg')).default,
  iconBackground: '#fff',
  installed: hasInjectedProvider({ flag: 'isBraveWallet' }),
  downloadUrls: {
    // We're opting not to provide a download prompt if Brave isn't the current
    // browser since it's unlikely to be a desired behavior for users. It's
    // more of a convenience for users who are already using Brave rather than
    // an explicit wallet choice for users coming from other browsers.
  },
  createConnector: getInjectedConnector({
    flag: 'isBraveWallet',
    transformProviderDuringConnect: isMobile()
      ? getMobileBraveProvider
      : undefined,
  }),
});
