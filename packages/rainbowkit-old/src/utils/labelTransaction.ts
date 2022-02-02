import {
  Interface,
  JsonFragment,
  TransactionDescription,
} from '@ethersproject/abi';
import { BigNumber } from '@ethersproject/bignumber';
import { shortenAddress } from './address';
import { chainIDToToken } from './convert';
import { toSignificant } from './toSignificant';

const parseABI = ({ name }: TransactionDescription) => {
  const result = name.replace(/([A-Z])/g, ' $1');
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

  return finalResult;
};

export const labelTransaction = ({
  abi,
  chainId = 1,
  data,
  from,
  to,
  value,
}: Partial<{
  chainId: number;
  from: string;
  to: string;
  value: BigNumber;
  data: string;
  abi: string | JsonFragment[];
}>) => {
  if (abi && data) {
    const ifc = new Interface(abi);

    const tx = ifc.parseTransaction({ data, value });

    return parseABI(tx);
  }

  if (from && to) {
    if (from === to) return `Cancel`;

    if (data) {
      if (data === '0x' && value)
        return `Transfer ${toSignificant(value, 3)} ${chainIDToToken(
          chainId
        )} from ${shortenAddress(from, 3)} to ${shortenAddress(to, 3)}`;
      else return 'Contract call';
    } else return 'Transaction';
  }

  return 'Transaction';
};
