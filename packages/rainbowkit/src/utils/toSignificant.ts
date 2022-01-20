import type { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import { nFormat } from './nFormat';

/**
 * Rounds a number to significant 4-digit number
 * @param b big number
 * @param precision
 * @returns formatted number
 */
export const toSignificant = (b: BigNumber, precision = 4): string => {
  const formatted = formatEther(b);
  const floatBal = parseFloat(formatted);

  if (floatBal > 9999) return nFormat(floatBal, 0);

  return floatBal.toPrecision(precision);
};
