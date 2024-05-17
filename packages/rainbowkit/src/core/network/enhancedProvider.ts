import { createHttpClient } from './internal/createHttpClient';

export const enhancedProviderHttp = createHttpClient({
  baseUrl: 'https://enhanced-provider.rainbow.me',
  headers: {
    'x-api-key':
      process.env.RAINBOW_PROVIDER_API_KEY ?? '__rainbowProviderApiKey',
  },
});
