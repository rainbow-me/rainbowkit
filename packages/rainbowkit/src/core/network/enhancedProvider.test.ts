import { describe, expect, it } from 'vitest';
import { enhancedProviderHttp } from './enhancedProvider';

describe.skip('createHttpClient', () => {
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
});
