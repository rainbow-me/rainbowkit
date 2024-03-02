import { Chain, holesky as _holesky } from 'wagmi/chains';

export const holesky: Chain = {
  ..._holesky,
  rpcUrls: {
    default: {
      http: ['https://rpc.holesky.ethpandaops.io'],
    },
  },
};
