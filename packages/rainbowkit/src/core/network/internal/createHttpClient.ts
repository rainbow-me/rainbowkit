import {
  RainbowFetchClient,
  type RainbowFetchRequestOpts,
} from './rainbowFetch';

export function createHttpClient({
  baseUrl,
  headers,
  params,
  timeout,
}: {
  baseUrl: string;
} & RainbowFetchRequestOpts) {
  return new RainbowFetchClient({ baseUrl, headers, params, timeout });
}
