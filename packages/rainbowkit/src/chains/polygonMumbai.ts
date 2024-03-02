import { Chain, polygonMumbai as _polygonMumbai } from 'wagmi/chains';

export const polygonMumbai: Chain = {
  ..._polygonMumbai,
  name: 'Mumbai',
  rpcUrls: {
    default: {
      http: ['https://rpc-mumbai.maticvigil.com'],
    },
  },
};
