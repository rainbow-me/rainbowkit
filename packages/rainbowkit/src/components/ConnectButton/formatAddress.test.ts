import { describe, expect, it } from 'vitest';
import { formatAddress } from './formatAddress';

describe('formatAddress', () => {
  it('truncates addresses correctly', () => {
    expect(formatAddress('0xDE7F309DE0F69C49E7C065BB4AE6DFFE0F5E32F4')).toEqual(
      '0xDE…32F4'
    );
  });
});
