import { Web3Provider } from '@ethersproject/providers';

/**
 * A React hook to sign Ethereum messages with a Web3 provider
 * @example
 * ```ts
 * const sign = useSignMessage({ provider, message: 'Hello' })
 *
 * sign()
 * ```
 * @returns a function to sign a message
 */
export const useSignMessage = ({
  message,
  provider,
}: {
  provider: Web3Provider;
  message: string;
}) => {
  return async function sign() {
    return await provider.getSigner().signMessage(message);
  };
};
