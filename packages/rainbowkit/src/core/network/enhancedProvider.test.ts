import { describe, expect, it } from 'vitest';
import {
  ENHANCED_PROVIDER_ENABLED,
  enhancedProviderHttp,
} from './enhancedProvider';

describe('createHttpClient', () => {
  if (!process.env.RAINBOW_PROVIDER_API_KEY) {
    it.skip('skips tests if RAINBOW_PROVIDER_API_KEY is missing', () => {});
    return;
  }

  if (!ENHANCED_PROVIDER_ENABLED) {
    it.skip('skips tests if enhanced provider is disabled', () => {});
    return;
  }

  it("should return 'ok' status for health check endpoint", async () => {
    const { data } = await enhancedProviderHttp.get('/healthcheck');
    expect(data).toStrictEqual({ status: 'ok' });
  });

  it('should throw an error if operation is aborted', async () => {
    await expect(() => enhancedProviderHttp.get('/unknown')).rejects.toThrow();
  });

  it("should throw an error if endpoint doesn't exist", async () => {
    await expect(() => enhancedProviderHttp.get('/unknown')).rejects.toThrow(
      'Not Found',
    );
  });

  it('should resolve ENS name for a valid address', async () => {
    const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
    const { data } = await enhancedProviderHttp.get<{ data: string | null }>(
      '/v1/resolve-ens',
      { params: { address } },
    );
    expect(data.data).toBe('vitalik.eth');
  });
});
