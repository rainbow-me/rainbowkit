import { createConfig } from 'wagmi';
import {
  type GetDefaultConfigParameters,
  type _chains,
  type _transports,
  getDefaultConfigParameters,
} from './getDefaultConfigParameters';

export const getDefaultConfig = <
  chains extends _chains,
  transports extends _transports,
>(
  params: GetDefaultConfigParameters<chains, transports>,
) => {
  return createConfig(getDefaultConfigParameters(params));
};
