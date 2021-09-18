import { Web3Provider } from '@ethersproject/providers'

/**
 *
 * @example
 * ```ts
 * const sign = useSignMessage({ provider, message: 'Hello' })
 *
 * sign()
 * ```
 */
export const useSignMessage = ({ provider, message }: { provider: Web3Provider; message: string }) => {
  return async () => {
    return await provider.getSigner().signMessage(message)
  }
}
