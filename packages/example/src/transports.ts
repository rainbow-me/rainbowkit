import type { Chain, Transport } from 'viem';
import { http } from 'wagmi';
import {
  arbitrum,
  avalanche,
  base,
  blast,
  bsc,
  gnosis,
  linea,
  mainnet,
  optimism,
  polygon,
  scroll,
  zksync,
  zora,
} from 'wagmi/chains';

const alchemy = (): Transport => {
  const alchemyNetworks = {
    [mainnet.id]: 'eth-mainnet',
    [base.id]: 'base-mainnet',
    [optimism.id]: 'opt-mainnet',
    [arbitrum.id]: 'arb-mainnet',
    [polygon.id]: 'polygon-mainnet',
    [avalanche.id]: 'avax-mainnet',
    [blast.id]: 'blast-mainnet',
    [bsc.id]: 'bnb-mainnet',
    [zora.id]: 'zora-mainnet',
    [linea.id]: 'linea-mainnet',
    [gnosis.id]: 'gnosis-mainnet',
    [scroll.id]: 'scroll-mainnet',
    [zksync.id]: 'zksync-mainnet',
  } as const;

  return (parameters) => {
    const network = parameters.chain
      ? alchemyNetworks[parameters.chain.id as keyof typeof alchemyNetworks]
      : undefined;

    return http(
      network && process.env.NEXT_PUBLIC_ALCHEMY_ID
        ? `https://${network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
        : undefined,
    )(parameters);
  };
};

export const createTransports = <chains extends readonly [Chain, ...Chain[]]>(
  chains: chains,
) => {
  const transport = alchemy();

  return Object.fromEntries(chains.map(({ id }) => [id, transport])) as Record<
    chains[number]['id'],
    Transport
  >;
};
