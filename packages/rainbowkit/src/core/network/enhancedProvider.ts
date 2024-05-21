import { createHttpClient } from './internal/createHttpClient';

export const enhancedProviderHttp = createHttpClient({
  baseUrl: 'https://enhanced-provider.rainbow.me',
  headers: {
    'x-api-key': '__rainbowProviderApiKey',
  },
});
