import { describe, expect, it } from 'vitest';
import { formatENS } from './formatENS';

describe('formatENS', () => {
  it('trucates ENS name over 24 characters', () => {
    expect(formatENS('reallylongensnameheretotestlongnames.eth')).toEqual(
      'reallylongensnameheretot...',
    );
  });

  it(`doesn't do anything to ENS names 24 characters or less`, () => {
    expect(formatENS('rainbow.eth')).toEqual('rainbow.eth');
  });

  it('if 24 characters, do not truncate .eth', () => {
    expect(formatENS('qwertyuiopasdfghjklzxcvb.eth')).toEqual(
      'qwertyuiopasdfghjklzxcvb.eth',
    );
  });

  it('Subdomains are taken into account', () => {
    expect(formatENS('rainbowrainbowrainbow.rainbowrainbow.eth')).toEqual(
      'rainbowrainbowrainbow.ra...',
    );
  });

  it('Non .eth names work', () => {
    expect(formatENS('qwertyuiopasdfghjklzxcvb.xyz')).toEqual(
      'qwertyuiopasdfghjklzxcvb.xyz',
    );
  });
});
