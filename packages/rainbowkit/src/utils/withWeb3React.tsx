import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';

export type Web3ProviderInit = (provider: Web3Provider) => void;

export const setupProvider = (web3ProviderInit?: Web3ProviderInit) => {
  return function getLibrary(provider: ExternalProvider): Web3Provider {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    web3ProviderInit?.(library);
    return library;
  };
};

export const withWeb3React = (
  Component: React.ComponentType<any>,
  web3ProviderInit?: Web3ProviderInit
): React.ComponentType => {
  const getLibrary = setupProvider(web3ProviderInit);

  const component = (props: unknown) => {
    return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...props} />
      </Web3ReactProvider>
    );
  };
  component.displayName =
    Component.displayName || Component.name || 'Web3ReactHOC';

  return component;
};
