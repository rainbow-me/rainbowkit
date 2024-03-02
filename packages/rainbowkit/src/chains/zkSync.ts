import { Chain, zkSync as _zkSync } from 'wagmi/chains';

export const zkSync: Chain = { ..._zkSync, name: 'zkSync Mainnet' };
