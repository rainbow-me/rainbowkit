import { InjectedConnector } from 'wagmi/connectors/injected';
import type { InjectedProviderFlags, WindowProvider } from 'wagmi/window';
import type { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';

/*
 * Returns the explicit window provider that matches the flag and the flag is true
 */
function getExplicitInjectedProvider(
  flag: keyof InjectedProviderFlags | string,
): WindowProvider | undefined {
  if (typeof window === 'undefined' || typeof window.ethereum === 'undefined')
    return;
  const providers = window.ethereum.providers;
  return providers
    ? // @ts-expect-error - some provider flags are not typed in `InjectedProviderFlags`
      providers.find((provider) => provider[flag])
    : // @ts-expect-error - some provider flags are not typed in `InjectedProviderFlags`
      window.ethereum[flag]
      ? window.ethereum
      : undefined;
}

/*
 * Gets the `window.namespace` window provider if it exists
 */
function getWindowProviderNamespace(
  namespace: string,
): WindowProvider | undefined {
  // @ts-expect-error - only `window.ethereum` is available in wagmi's global namespace
  return window[namespace];
}

/*
 * Checks if the explict provider or window ethereum exists
 */
export function hasInjectedProvider({
  flag,
  namespace,
}: {
  flag?: keyof InjectedProviderFlags | string;
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
function getInjectedProvider(
  flag: keyof InjectedProviderFlags | string,
  namespace?: string,
): WindowProvider | undefined {
  if (typeof window === 'undefined' || typeof window.ethereum === 'undefined')
    return;
  if (namespace) {
    // prefer custom eip1193 namespaces
    const windowProvider = getWindowProviderNamespace(namespace);
    if (windowProvider) return windowProvider;
  }
  const providers = window.ethereum.providers;
  const provider = getExplicitInjectedProvider(flag);
  if (provider) return provider;
  if (typeof providers !== 'undefined' && providers.length > 0)
    return providers[0];
  return window.ethereum;
}

export function getInjectedConnector({
  chains,
  flag,
  namespace,
}: {
  flag?: keyof InjectedProviderFlags | string;
  namespace?: string;
  chains: Chain[];
}): InjectedConnector {
  return new InjectedConnector({
    chains,
    options: flag
      ? { getProvider: () => getInjectedProvider(flag, namespace) }
      : undefined,
  });
}
