import { describe, expect, it } from 'vitest';
import { abbreviateNumber } from './abbreviateNumber';

const K = 1000;
const M = 1000 * K;
const B = 1000 * M;

describe('abbreviateNumber', () => {
  it('passes through small numbers', () => {
    expect(abbreviateNumber(1)).toEqual('1');
    expect(abbreviateNumber(12)).toEqual('12');
    expect(abbreviateNumber(123)).toEqual('123');
    expect(abbreviateNumber(1234)).toEqual('1,234');
    expect(abbreviateNumber(9999)).toEqual('9,999');
    expect(abbreviateNumber(9999.1)).toEqual('9,999.1');
    expect(abbreviateNumber(1.002)).toEqual('1');
    expect(abbreviateNumber(1.1)).toEqual('1.1');
    expect(abbreviateNumber(1.09)).toEqual('1.1');
    expect(abbreviateNumber(1.04)).toEqual('1');
  });

  it('abbreviates past 10k', () => {
    expect(abbreviateNumber(10 * K)).toEqual('10k');
    expect(abbreviateNumber(12.3 * K)).toEqual('12.3k');
    expect(abbreviateNumber(123.4 * K)).toEqual('123.4k');
    expect(abbreviateNumber(999.99 * K)).toEqual('1m'); // rounds
  });

  it('abbreviates past 1m', () => {
    expect(abbreviateNumber(1 * M)).toEqual('1m');
    expect(abbreviateNumber(1.23 * M)).toEqual('1.2m');
    expect(abbreviateNumber(10 * M)).toEqual('10m');
    expect(abbreviateNumber(12.3 * M)).toEqual('12.3m');
    expect(abbreviateNumber(123.4 * M)).toEqual('123.4m');
    expect(abbreviateNumber(999.99 * M)).toEqual('1b'); // rounds
  });

  it('abbreviates past 1b', () => {
    expect(abbreviateNumber(1 * B)).toEqual('1b');
    expect(abbreviateNumber(1.23 * B)).toEqual('1.2b');
    expect(abbreviateNumber(10 * B)).toEqual('10b');
    expect(abbreviateNumber(12.3 * B)).toEqual('12.3b');
    expect(abbreviateNumber(123.4 * B)).toEqual('123.4b');
    expect(abbreviateNumber(999.99 * B)).toEqual('1t'); // rounds
  });

  it('can accept decimal optional param', () => {
    expect(abbreviateNumber(1.022, 2)).toEqual('1.02');
    expect(abbreviateNumber(1.02 * M, 2)).toEqual('1.02m');
    expect(abbreviateNumber(1.2 * M, 2)).toEqual('1.2m');
    expect(abbreviateNumber(1.23 * M, 2)).toEqual('1.23m');
    expect(abbreviateNumber(999.99 * M, 2)).toEqual('999.99m');
    expect(abbreviateNumber(999.999 * M, 2)).toEqual('1b'); // rounds
  });
});
