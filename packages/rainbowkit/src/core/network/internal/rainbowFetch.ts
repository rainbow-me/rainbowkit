export const RAINBOW_FETCH_ERROR = 'rainbowFetchError';

export interface RainbowFetchRequestOpts extends RequestInit {
  params?: ConstructorParameters<typeof URLSearchParams>[0]; // type of first argument of URLSearchParams constructor.
  timeout?: number;
}

/**
 * rainbowFetch fetches data and handles response edge cases and error handling.
 */
export async function rainbowFetch<TData>(
  url: RequestInfo,
  opts: RainbowFetchRequestOpts,
) {
  // biome-ignore lint/style/noParameterAssign: ignore
  opts = {
    headers: {},
    method: 'get',
    ...opts, // Any other fetch options
    timeout: opts.timeout ?? 10_000, // 10 secs
  };

  if (!url) throw new Error('rainbowFetch: Missing url argument');

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), opts.timeout);

  const { body, params, headers, ...otherOpts } = opts;

  const requestBody =
    body && typeof body === 'object' ? JSON.stringify(opts.body) : opts.body;

  const response = await fetch(`${url}${createParams(params)}`, {
    ...otherOpts,
    body: requestBody,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    signal: controller.signal,
  });

  clearTimeout(id);

  const responseBody = (await getBody(response)) as TData;

  if (response.ok) {
    const { headers, status } = response;
    return { data: responseBody, headers, status };
  }
  const errorResponseBody =
    typeof responseBody === 'string' ? { error: responseBody } : responseBody;

  const error = generateError({
    requestBody: body,
    response,
    responseBody: errorResponseBody,
  });

  throw error;
}

function getBody(response: Response) {
  const contentType = response.headers.get('Content-Type');
  if (contentType?.startsWith('application/json')) {
    return response.json();
  }
  return response.text();
}

function createParams(params: RainbowFetchRequestOpts['params']) {
  return params && Object.keys(params).length
    ? `?${new URLSearchParams(params)}`
    : '';
}

interface RainbowFetchError extends Error {
  response?: Response;
  responseBody?: any;
  requestBody?: RequestInit['body'];
}

function generateError({
  requestBody,
  response,
  responseBody,
}: {
  requestBody: RequestInit['body'];
  response: Response;
  responseBody: any;
}) {
  const message =
    responseBody?.error ||
    response?.statusText ||
    'There was an error with the request.';

  const error: RainbowFetchError = new Error(message);

  error.response = response;
  error.responseBody = responseBody;
  error.requestBody = requestBody;

  return error;
}

interface RainbowFetchClientOpts extends RainbowFetchRequestOpts {
  baseUrl?: string;
}

export class RainbowFetchClient {
  baseUrl: string;
  opts: RainbowFetchRequestOpts;

  constructor(opts: RainbowFetchClientOpts = {}) {
    const { baseUrl = '', ...otherOpts } = opts;
    this.baseUrl = baseUrl;
    this.opts = otherOpts;
  }

  /**
   * Perform a GET request with the RainbowFetchClient.
   */
  get<TData>(url?: RequestInfo, opts?: RainbowFetchRequestOpts) {
    return rainbowFetch<TData>(`${this.baseUrl}${url}`, {
      ...this.opts,
      ...(opts || {}),
      method: 'get',
    });
  }

  /**
   * Perform a DELETE request with the RainbowFetchClient.
   */
  delete(url?: RequestInfo, opts?: RainbowFetchRequestOpts) {
    return rainbowFetch(`${this.baseUrl}${url}`, {
      ...this.opts,
      ...(opts || {}),
      method: 'delete',
    });
  }

  /**
   * Perform a HEAD request with the RainbowFetchClient.
   */
  head(url?: RequestInfo, opts?: RainbowFetchRequestOpts) {
    return rainbowFetch(`${this.baseUrl}${url}`, {
      ...this.opts,
      ...(opts || {}),
      method: 'head',
    });
  }

  /**
   * Perform a OPTIONS request with the RainbowFetchClient.
   */
  options(url?: RequestInfo, opts?: RainbowFetchRequestOpts) {
    return rainbowFetch(`${this.baseUrl}${url}`, {
      ...this.opts,
      ...(opts || {}),
      method: 'options',
    });
  }

  /**
   * Perform a POST request with the RainbowFetchClient.
   */
  post<TData>(url?: RequestInfo, body?: any, opts?: RainbowFetchRequestOpts) {
    return rainbowFetch<TData>(`${this.baseUrl}${url}`, {
      ...this.opts,
      ...(opts || {}),
      body,
      method: 'post',
    });
  }

  /**
   * Perform a PUT request with the RainbowFetchClient.
   */
  put<TData>(url?: RequestInfo, body?: any, opts?: RainbowFetchRequestOpts) {
    return rainbowFetch<TData>(`${this.baseUrl}${url}`, {
      ...this.opts,
      ...(opts || {}),
      body,
      method: 'put',
    });
  }

  /**
   * Perform a PATCH request with the RainbowFetchClient.
   */
  patch<TData>(url?: RequestInfo, body?: any, opts?: RainbowFetchRequestOpts) {
    return rainbowFetch<TData>(`${this.baseUrl}${url}`, {
      ...this.opts,
      ...(opts || {}),
      body,
      method: 'patch',
    });
  }
}
