import { CreateConnectorFn } from 'wagmi';
import { injected } from 'wagmi/connectors';

interface CreateInjectedConnectorParameters {
  id: string;
  name: string;
  provider?: any;
}

interface GetInjectedConnectorParameters {
  id: string;
  name: string;
  flag?: string;
  namespace?: string;
  target?: any;
}

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
