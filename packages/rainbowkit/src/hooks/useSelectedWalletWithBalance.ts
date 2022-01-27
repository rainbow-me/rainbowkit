import { BaseProvider } from '@ethersproject/providers';
import { useMemo } from 'react';
import { ChainId } from '../utils/chains';
import { chainIDToToken } from '../utils/convert';
import { useSignificantBalance } from './useSignificantBalance';
import { useWalletInfo } from './useWalletInfo';

export const useSelectedWalletWithBalance = ({
  address,
  chainId,
  provider,
}: {
  address: string;
  chainId: ChainId;
  provider: BaseProvider;
}) => {
  const bal = useSignificantBalance({ address, provider });

  const symbol = useMemo(() => chainIDToToken(chainId), [chainId]);

  const { logoURI, name } = useWalletInfo();

  return { bal, logoURI, name, symbol };
};
