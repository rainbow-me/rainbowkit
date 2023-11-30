import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import type { InjectedProviderFlags, WindowProvider } from 'wagmi/window';
import type { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';

/*
 * Returns the explicit window provider that matches the flag and the flag is true
 */
function getExplicitInjectedProvider(
  flag: keyof InjectedProviderFlags,
): WindowProvider | undefined {
  if (typeof window === 'undefined' || typeof window.ethereum === 'undefined')
    return;
  const providers = window.ethereum.providers;
  return providers
    ? providers.find((provider) => provider[flag])
    : window.ethereum[flag]
    ? window.ethereum
    : undefined;
}

export function hasInjectedProvider(
  flag: keyof InjectedProviderFlags,
): boolean {
  return Boolean(getExplicitInjectedProvider(flag));
}

/*
 * Returns an injected provider that favors the flag match, but falls back to window.ethereum
 */
function getInjectedProvider(
  flag: keyof InjectedProviderFlags,
): WindowProvider | undefined {
  if (typeof window === 'undefined' || typeof window.ethereum === 'undefined')
    return;
  const providers = window.ethereum.providers;
  const provider = getExplicitInjectedProvider(flag);
  if (provider) return provider;
  else if (typeof providers !== 'undefined' && providers.length > 0)
    return providers[0];
  else return window.ethereum;
}

export function getInjectedConnector({
  chains,
  flag,
  options,
}: {
  flag: keyof InjectedProviderFlags;
  chains: Chain[];
  options?: InjectedConnectorOptions;
}): InjectedConnector {
  return new InjectedConnector({
    chains,
    options: {
      getProvider: () => getInjectedProvider(flag),
      ...options,
    },
  });
}
