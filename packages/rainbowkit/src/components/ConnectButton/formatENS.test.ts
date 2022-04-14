import { describe, expect, it } from 'vitest';
import { formatENS } from './formatENS';

describe('formatENS', () => {
  it('trucates ENS name over 16 characters', () => {
    expect(formatENS('reallylongensnameheretotest.eth')).toEqual(
      'reallylongensnam...'
    );
  });

  it(`doesn't do anything to ENS names 16 characters or less`, () => {
    expect(formatENS('rainbow.eth')).toEqual('rainbow.eth');
  });
});
