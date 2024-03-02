import { Chain, bsc as _bsc } from 'wagmi/chains';

export const bsc: Chain = {
  ..._bsc,
  name: 'BNB Smart Chain Mainnet',
  rpcUrls: {
    default: { http: ['https://bsc-dataseed1.bnbchain.org'] },
  },
};
