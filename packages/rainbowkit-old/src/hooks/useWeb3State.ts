import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

/**
 * Renames some of the `useWeb3React` properties for convinience
 */
export const useWeb3State = () => {
  const {
    account: address,
    active: isConnected,
    library: provider,
    ...web3ReactProps
  } = useWeb3React<Web3Provider>();

  return { address, isConnected, provider, ...web3ReactProps };
};
