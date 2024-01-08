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
    ? // @ts-expect-error - some provider flags are not typed in `InjectedProviderFlags`
      providers.find((provider) => provider[flag])
    : window.ethereum[flag]
      ? window.ethereum
      : undefined;
}

/*
 * Gets the `window.namespace` window provider if it exists
 */
function getWindowProviderNamespace(namespace: string) {
  const providerSearch = (provider: any, namespace: string): any => {
    const [property, ...path] = namespace.split('.');
    const _provider = provider[property];
    if (_provider) {
      if (path.length === 0) return _provider;
      return providerSearch(_provider, path.join('.'));
    }
  };
  if (typeof window !== 'undefined') return providerSearch(window, namespace);
}

/*
 * Checks if the explict provider or window ethereum exists
 */
export function hasInjectedProvider({
  flag,
  namespace,
}: {
  flag?: string;
  namespace?: string;
}): boolean {
  if (namespace && typeof getWindowProviderNamespace(namespace) !== 'undefined')
    return true;
  if (flag && typeof getExplicitInjectedProvider(flag) !== 'undefined')
    return true;
  return false;
}

/*
 * Returns an injected provider that favors the flag match, but falls back to window.ethereum
 */
function getInjectedProvider({
  flag,
  namespace,
}: {
  flag?: string;
  namespace?: string;
}) {
  if (typeof window === 'undefined') return;
  if (namespace) {
    // prefer custom eip1193 namespaces
    const windowProvider = getWindowProviderNamespace(namespace);
    if (windowProvider) return windowProvider;
  }
  const providers = window.ethereum?.providers;
  if (flag) {
    const provider = getExplicitInjectedProvider(flag);
    if (provider) return provider;
  }
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
  namespace,
  target,
}: {
  flag?: string;
  namespace?: string;
  target?: any;
}): CreateConnector {
  const provider = target ? target : getInjectedProvider({ flag, namespace });
  return createInjectedConnector(provider);
}
