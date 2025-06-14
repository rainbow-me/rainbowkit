import { describe, expect, it } from 'vitest';
import { uniqueBy } from './uniqueBy';

describe('uniqueBy', () => {
  it('deduplicates objects by key', () => {
    const items = [
      { id: '1', rdns: 'a' },
      { id: '2', rdns: 'a' },
      { id: '3', rdns: 'b' },
    ];
    const result = uniqueBy(items, 'rdns');
    expect(result).toEqual([
      { id: '1', rdns: 'a' },
      { id: '3', rdns: 'b' },
    ]);
  });
});
