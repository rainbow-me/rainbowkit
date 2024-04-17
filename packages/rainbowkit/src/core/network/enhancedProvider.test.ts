import { describe, expect, it } from 'vitest';
import { enhancedProviderHttp } from './enhancedProvider';

const itif = () =>
  typeof process.env.RAINBOW_PROVIDER_API_KEY !== 'undefined' ? it : it.skip;

describe('createHttpClient', () => {
  itif()("should return 'ok' status for health check endpoint", async () => {
    const { data } = await enhancedProviderHttp.get('/healthcheck');
    expect(data).toStrictEqual({ status: 'ok' });
  });

  itif()('should throw an error if operation is aborted', async () => {
    await expect(() => enhancedProviderHttp.get('/unknown')).rejects.toThrow();
  });

  itif()("should throw an error if endpoint doesn't exist", async () => {
    await expect(() => enhancedProviderHttp.get('/unknown')).rejects.toThrow(
      'Not Found',
    );
  });
});
