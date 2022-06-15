import { describe, expect, it } from 'vitest';
import { abbreviateETHBalance } from './abbreviateETHBalance';

const K = 1000;
const M = 1000 * K;
const B = 1000 * M;

describe('abbreviateETHBalance', () => {
  it('truncates to 3 decimal places for numbers under 1', () => {
    expect(abbreviateETHBalance(0.002)).toEqual('0.002');
    expect(abbreviateETHBalance(0.9009)).toEqual('0.9');
    expect(abbreviateETHBalance(0.0009)).toEqual('0');
    expect(abbreviateETHBalance(0.5194)).toEqual('0.519');
    expect(abbreviateETHBalance(0.5199)).toEqual('0.519');
    expect(abbreviateETHBalance(0.5499)).toEqual('0.549');
    expect(abbreviateETHBalance(0.5999)).toEqual('0.599');
  });

  it('truncates to 2 decimal places for numbers under 100', () => {
    expect(abbreviateETHBalance(1)).toEqual('1');
    expect(abbreviateETHBalance(1.002)).toEqual('1');
    expect(abbreviateETHBalance(1.04)).toEqual('1.04');
    expect(abbreviateETHBalance(1.09)).toEqual('1.09');
    expect(abbreviateETHBalance(1.1)).toEqual('1.1');
    expect(abbreviateETHBalance(10)).toEqual('10');
    expect(abbreviateETHBalance(10.0)).toEqual('10');
    expect(abbreviateETHBalance(12)).toEqual('12');
  });

  it('truncates to 1 decimal place and adds commas for numbers under 10k', () => {
    expect(abbreviateETHBalance(123)).toEqual('123');
    expect(abbreviateETHBalance(1234)).toEqual('1,234');
    expect(abbreviateETHBalance(1234.22)).toEqual('1,234.2');
    expect(abbreviateETHBalance(1234.02)).toEqual('1,234');
    expect(abbreviateETHBalance(9999)).toEqual('9,999');
    expect(abbreviateETHBalance(9999.1)).toEqual('9,999.1');
    expect(abbreviateETHBalance(9999.99)).toEqual('9,999.9'); // no round
  });

  it('abbreviates past 10k', () => {
    expect(abbreviateETHBalance(10 * K)).toEqual('10k');
    expect(abbreviateETHBalance(12.3 * K)).toEqual('12.3k');
    expect(abbreviateETHBalance(123.4 * K)).toEqual('123.4k');
    expect(abbreviateETHBalance(999.99 * K)).toEqual('999.9k'); // no rounds
  });

  it('abbreviates past 1m', () => {
    expect(abbreviateETHBalance(1 * M)).toEqual('1m');
    expect(abbreviateETHBalance(1.23 * M)).toEqual('1.2m');
    expect(abbreviateETHBalance(10 * M)).toEqual('10m');
    expect(abbreviateETHBalance(12.3 * M)).toEqual('12.3m');
    expect(abbreviateETHBalance(123.4 * M)).toEqual('123.4m');
    expect(abbreviateETHBalance(999.99 * M)).toEqual('999.9m'); // no rounds
  });

  it('abbreviates past 1b', () => {
    expect(abbreviateETHBalance(1 * B)).toEqual('1b');
    expect(abbreviateETHBalance(1.23 * B)).toEqual('1.2b');
    expect(abbreviateETHBalance(10 * B)).toEqual('10b');
    expect(abbreviateETHBalance(12.3 * B)).toEqual('12.3b');
    expect(abbreviateETHBalance(123.4 * B)).toEqual('123.4b');
    expect(abbreviateETHBalance(999.99 * B)).toEqual('999.9b'); // no rounds
  });
});
