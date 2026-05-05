import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  Credentials: vi.fn((config) => ({
    ...config,
    id: 'credentials',
    type: 'credentials',
  })),
  NextAuth: vi.fn(() => ({
    auth: vi.fn(),
    handlers: {
      GET: vi.fn(),
      POST: vi.fn(),
    },
    signIn: vi.fn(),
    signOut: vi.fn(),
  })),
  createPublicClient: vi.fn(),
  http: vi.fn(() => 'http-transport'),
  parseSiweMessage: vi.fn(),
  validateSiweMessage: vi.fn(),
  verifyMessage: vi.fn(),
}));

vi.mock('next-auth', () => ({
  default: mocks.NextAuth,
}));

vi.mock('next-auth/providers/credentials', () => ({
  default: mocks.Credentials,
}));

vi.mock('viem', () => ({
  createPublicClient: mocks.createPublicClient,
  http: mocks.http,
}));

vi.mock('viem/chains', () => ({
  mainnet: { id: 1, name: 'Ethereum' },
}));

vi.mock('viem/siwe', () => ({
  parseSiweMessage: mocks.parseSiweMessage,
  validateSiweMessage: mocks.validateSiweMessage,
}));

const originalEnv = { ...process.env };
const address = '0x1111111111111111111111111111111111111111';
const credentials = {
  message: 'siwe-message',
  signature: '0xsignature',
};
const validCsrfCookie = 'authjs.csrf-token=csrf-token%7Ccsrf-hash';
type EnvOverrides = Partial<NodeJS.ProcessEnv>;

async function importAuth(env: EnvOverrides = {}) {
  vi.resetModules();
  process.env = {
    ...originalEnv,
    NEXTAUTH_SECRET: undefined,
    NEXTAUTH_URL: undefined,
    VERCEL_URL: undefined,
    ...env,
  };
  mocks.createPublicClient.mockReturnValue({
    verifyMessage: mocks.verifyMessage,
  });

  return import('../../../examples/with-next-siwe-next-auth/src/auth');
}

async function getAuthorize(env: EnvOverrides = {}) {
  const { authOptions } = await importAuth(env);
  const provider = authOptions.providers?.[0] as unknown as {
    authorize: (
      credentials: Record<string, unknown>,
      request: { headers: Headers },
    ) => Promise<unknown>;
  };

  return provider.authorize;
}

function requestWithCookie(cookie: string | null) {
  return {
    headers: new Headers(cookie ? { cookie } : undefined),
  };
}

function requestWithHeaders(headers: unknown) {
  return {
    headers,
  } as { headers: Headers };
}

function requestWithValidCsrfCookie() {
  return requestWithCookie(validCsrfCookie);
}

function mockValidSiweMessage(overrides: Record<string, unknown> = {}) {
  const siweMessage = {
    address,
    domain: 'example.com',
    nonce: 'csrf-token',
    ...overrides,
  };

  mocks.parseSiweMessage.mockReturnValue(siweMessage);
  mocks.validateSiweMessage.mockReturnValue(true);
  mocks.verifyMessage.mockResolvedValue(true);

  return siweMessage;
}

describe('NextAuth SIWE config', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  it('configures the NextAuth credentials provider for SIWE', async () => {
    const { authOptions } = await importAuth({
      NEXTAUTH_SECRET: 'nextauth-secret',
    });

    expect(mocks.Credentials).toHaveBeenCalledWith(
      expect.objectContaining({
        credentials: {
          message: {
            label: 'Message',
            placeholder: '0x0',
            type: 'text',
          },
          signature: {
            label: 'Signature',
            placeholder: '0x0',
            type: 'text',
          },
        },
        name: 'Ethereum',
      }),
    );
    expect(mocks.NextAuth).toHaveBeenCalledWith(authOptions);
    expect(authOptions).toMatchObject({
      secret: 'nextauth-secret',
      session: {
        strategy: 'jwt',
      },
    });
  });

  it('creates the public client used for server-side signature verification', async () => {
    await importAuth();

    expect(mocks.http).toHaveBeenCalledWith();
    expect(mocks.createPublicClient).toHaveBeenCalledWith({
      chain: { id: 1, name: 'Ethereum' },
      transport: 'http-transport',
    });
  });

  it('exports the helpers returned by NextAuth', async () => {
    const authModule = await importAuth();
    const nextAuthResult = mocks.NextAuth.mock.results.at(-1)?.value;

    expect(authModule.auth).toBe(nextAuthResult.auth);
    expect(authModule.handlers).toBe(nextAuthResult.handlers);
    expect(authModule.signIn).toBe(nextAuthResult.signIn);
    expect(authModule.signOut).toBe(nextAuthResult.signOut);
  });

  it.each([
    ['authjs.csrf-token=csrf-token%7Ccsrf-hash'],
    ['__Host-authjs.csrf-token=csrf-token%7Ccsrf-hash'],
    ['__Secure-authjs.csrf-token=csrf-token%7Ccsrf-hash'],
    ['other=value; __Host-authjs.csrf-token=csrf-token%7Ccsrf-hash'],
  ])('authorizes valid SIWE credentials with cookie %s', async (cookie) => {
    mockValidSiweMessage();
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(
      authorize(credentials, requestWithCookie(cookie)),
    ).resolves.toEqual({
      id: address,
    });

    expect(mocks.verifyMessage).toHaveBeenCalledWith({
      address,
      message: credentials.message,
      signature: credentials.signature,
    });
    expect(mocks.parseSiweMessage).toHaveBeenCalledWith(credentials.message);
    expect(mocks.validateSiweMessage).toHaveBeenCalledWith({
      address,
      message: expect.objectContaining({
        address,
        domain: 'example.com',
        nonce: 'csrf-token',
      }),
    });
  });

  it('decodes CSRF cookie values before comparing against the SIWE nonce', async () => {
    mockValidSiweMessage({ nonce: 'csrf token' });
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(
      authorize(
        credentials,
        requestWithCookie('authjs.csrf-token=csrf%20token%7Ccsrf-hash'),
      ),
    ).resolves.toEqual({
      id: address,
    });
  });

  it.each([
    [{ NEXTAUTH_URL: 'https://example.com' }, 'example.com'],
    [{ VERCEL_URL: 'vercel.example.com' }, 'vercel.example.com'],
  ])('uses supported auth URL env source %#', async (env, domain) => {
    mockValidSiweMessage({ domain });
    const authorize = await getAuthorize(env);

    await expect(
      authorize(credentials, requestWithValidCsrfCookie()),
    ).resolves.toEqual({
      id: address,
    });
  });

  it('rejects invalid SIWE messages before signature verification', async () => {
    mockValidSiweMessage();
    mocks.validateSiweMessage.mockReturnValue(false);
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(
      authorize(credentials, requestWithValidCsrfCookie()),
    ).resolves.toBeNull();

    expect(mocks.verifyMessage).not.toHaveBeenCalled();
  });

  it('rejects credentials when no auth URL env is configured', async () => {
    mockValidSiweMessage();
    const authorize = await getAuthorize();

    await expect(
      authorize(credentials, requestWithValidCsrfCookie()),
    ).resolves.toBeNull();
  });

  it('rejects credentials when the auth URL env is invalid', async () => {
    mockValidSiweMessage();
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'not a url',
    });

    await expect(
      authorize(credentials, requestWithValidCsrfCookie()),
    ).resolves.toBeNull();
  });

  it('rejects credentials when the SIWE domain does not match the auth host', async () => {
    mockValidSiweMessage({ domain: 'attacker.example.com' });
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(
      authorize(credentials, requestWithValidCsrfCookie()),
    ).resolves.toBeNull();
  });

  it.each([
    [
      'the SIWE nonce does not match the CSRF cookie',
      requestWithValidCsrfCookie(),
    ],
    ['the CSRF cookie is missing', requestWithCookie(null)],
    [
      'the CSRF cookie has the old NextAuth v4 name',
      requestWithCookie('next-auth.csrf-token=csrf-token%7Ccsrf-hash'),
    ],
    ['the CSRF cookie has no value', requestWithCookie('authjs.csrf-token=')],
    [
      'the CSRF cookie is malformed',
      requestWithCookie('authjs.csrf-token=%E0%A4%A'),
    ],
    [
      'request headers are not a Headers object',
      requestWithHeaders({ cookie: validCsrfCookie }),
    ],
  ])('rejects credentials when %s', async (reason, request) => {
    mockValidSiweMessage(
      reason === 'the SIWE nonce does not match the CSRF cookie'
        ? { nonce: 'different-nonce' }
        : {},
    );
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(authorize(credentials, request)).resolves.toBeNull();

    expect(mocks.verifyMessage).not.toHaveBeenCalled();
  });

  it('rejects credentials when the signature is invalid', async () => {
    mockValidSiweMessage();
    mocks.verifyMessage.mockResolvedValue(false);
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(
      authorize(credentials, requestWithValidCsrfCookie()),
    ).resolves.toBeNull();
  });

  it('returns null when signature verification throws', async () => {
    mockValidSiweMessage();
    mocks.verifyMessage.mockRejectedValue(new Error('verification failed'));
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(
      authorize(credentials, requestWithValidCsrfCookie()),
    ).resolves.toBeNull();
  });

  it('returns null when SIWE parsing throws', async () => {
    mocks.parseSiweMessage.mockImplementation(() => {
      throw new Error('invalid message');
    });
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(
      authorize(credentials, requestWithValidCsrfCookie()),
    ).resolves.toBeNull();
  });

  it('returns null when SIWE parsing does not return a message', async () => {
    mocks.parseSiweMessage.mockReturnValue(undefined);
    mocks.validateSiweMessage.mockReturnValue(true);
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(
      authorize(credentials, requestWithValidCsrfCookie()),
    ).resolves.toBeNull();
  });

  it('maps the token subject onto the session address and user name', async () => {
    const { authOptions } = await importAuth();
    const session = await authOptions.callbacks?.session?.({
      session: {
        expires: 'never',
        user: {
          email: 'user@example.com',
          image: 'https://example.com/avatar.png',
        },
      },
      token: {
        sub: address,
      },
    } as never);

    expect(session).toEqual({
      address,
      expires: 'never',
      user: {
        email: 'user@example.com',
        image: 'https://example.com/avatar.png',
        name: address,
      },
    });
  });

  it('handles sessions without an existing user object', async () => {
    const { authOptions } = await importAuth();
    const session = await authOptions.callbacks?.session?.({
      session: {
        expires: 'never',
      },
      token: {
        sub: address,
      },
    } as never);

    expect(session).toEqual({
      address,
      expires: 'never',
      user: {
        name: address,
      },
    });
  });
});
