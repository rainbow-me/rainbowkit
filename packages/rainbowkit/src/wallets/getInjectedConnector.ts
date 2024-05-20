import { CreateConnectorFn } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { WalletProviderFlags, WindowProvider } from '../types/utils';

interface CreateInjectedConnectorParameters {
  id: string;
  name: string;
  provider?: any;
}

interface GetInjectedConnectorParameters {
  id: string;
  name: string;
  flag?: WalletProviderFlags;
  namespace?: string;
  target?: WindowProvider;
}

/*
 * Returns the explicit window provider that matches the flag and the flag is true
 */
function getExplicitInjectedProvider(flag: WalletProviderFlags) {
  const _window =
    typeof window !== 'undefined' ? (window as WindowProvider) : undefined;
  if (typeof _window === 'undefined' || typeof _window.ethereum === 'undefined')
    return;
  const providers = _window.ethereum.providers;
  return providers
    ? providers.find((provider) => provider[flag])
    : _window.ethereum[flag]
      ? _window.ethereum
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
  flag?: WalletProviderFlags;
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
  flag?: WalletProviderFlags;
  namespace?: string;
}) {
  const _window =
    typeof window !== 'undefined' ? (window as WindowProvider) : undefined;
  if (typeof _window === 'undefined') return;
  if (namespace) {
    // prefer custom eip1193 namespaces
    const windowProvider = getWindowProviderNamespace(namespace);
    if (windowProvider) return windowProvider;
  }
  const providers = _window.ethereum?.providers;
  if (flag) {
    const provider = getExplicitInjectedProvider(flag);
    if (provider) return provider;
  }
  if (typeof providers !== 'undefined' && providers.length > 0)
    return providers[0];
  return _window.ethereum;
}

function createInjectedConnector({
  id,
  name,
  provider,
}: CreateInjectedConnectorParameters) {
  // Create the injected configuration object conditionally based on the provider.
  const injectedConfig = provider
    ? {
        target: () => ({
          id,
          name,
          provider,
        }),
      }
    : {};

  return injected(injectedConfig);
}

export function getInjectedConnector({
  id,
  name,
  flag,
  namespace,
  target,
}: GetInjectedConnectorParameters): CreateConnectorFn {
  const provider = target ? target : getInjectedProvider({ flag, namespace });
  return createInjectedConnector({ id, name, provider });
}
