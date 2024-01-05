import { createConnector } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { CreateConnector, WalletDetailsParams } from './Wallet';

/*
 * Returns the explicit window provider that matches the flag and the flag is true
 */
function getExplicitInjectedProvider(flag: string) {
  if (typeof window === 'undefined' || typeof window.ethereum === 'undefined')
    return;
  const providers = window.ethereum.providers;
  return providers
    ? providers.find((provider: { [x: string]: any }) => provider[flag])
    : window.ethereum[flag]
      ? window.ethereum
      : undefined;
}

export function hasInjectedProvider(flag: string): boolean {
  return Boolean(getExplicitInjectedProvider(flag));
}

/*
 * Returns an injected provider that favors the flag match, but falls back to window.ethereum
 */
function getInjectedProvider(flag: string) {
  if (typeof window === 'undefined' || typeof window.ethereum === 'undefined')
    return;
  const providers = window.ethereum.providers;
  const provider = getExplicitInjectedProvider(flag);
  if (provider) return provider;
  if (typeof providers !== 'undefined' && providers.length > 0)
    return providers[0];
  return window.ethereum;
}

function createInjectedConnector(provider?: any): CreateConnector {
  return (walletDetails: WalletDetailsParams) => {
    // Create the injected configuration object conditionally based on the provider.
    const injectedConfig = provider
      ? {
          target: () => ({
            id: walletDetails.rkDetails.id,
            name: walletDetails.rkDetails.name,
            provider,
          }),
        }
      : {};

    return createConnector((config) => ({
      // Spread the injectedConfig object, which may be empty or contain the target function
      ...injected(injectedConfig)(config),
      ...walletDetails,
    }));
  };
}

export function getInjectedConnector({
  flag,
  target,
}: {
  flag?: string;
  target?: string;
}): CreateConnector {
  const provider = flag ? getInjectedProvider(flag) : target;
  return createInjectedConnector(provider);
}

export function getDefaultInjectedConnector(): CreateConnector {
  return createInjectedConnector();
}
