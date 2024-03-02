import { Chain, optimismSepolia as _optimismSepolia } from 'wagmi/chains';

export const optimismSepolia: Chain = {
  ..._optimismSepolia,
  name: 'OP Sepolia Testnet',
};
