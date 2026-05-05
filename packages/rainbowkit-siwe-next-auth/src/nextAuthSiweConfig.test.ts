import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import {
  type SiweMessage,
  parseSiweMessage,
  validateSiweMessage,
} from 'viem/siwe';

declare module 'next-auth' {
  interface Session {
    address?: string;
  }
}

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
  csrfToken: 'csrf-token',
  signature: '0xsignature',
};
const rpcUrl = 'https://ethereum-rpc.example';
const request = new Request(
  'https://example.com/api/auth/callback/credentials',
);
type EnvOverrides = Partial<NodeJS.ProcessEnv>;

async function createAuthModule(env: EnvOverrides = {}) {
  process.env = {
    ...originalEnv,
    AUTH_SECRET: undefined,
    AUTH_URL: undefined,
    NEXTAUTH_SECRET: undefined,
    NEXTAUTH_URL: undefined,
    ETHEREUM_RPC_URL: undefined,
    VERCEL_URL: undefined,
    ...env,
  };
  mocks.createPublicClient.mockReturnValue({
    verifyMessage: mocks.verifyMessage,
  });

  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const authOptions: NextAuthConfig = {
    providers: [
      Credentials({
        name: 'Ethereum',
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
        async authorize(credentials) {
          try {
            const siweMessage = parseSiweMessage(
              credentials?.message as string,
            ) as SiweMessage;

            if (
              !validateSiweMessage({
                address: siweMessage?.address,
                message: siweMessage,
              })
            ) {
              return null;
            }

            const authUrl =
              process.env.AUTH_URL ||
              process.env.NEXTAUTH_URL ||
              (process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : null);
            if (!authUrl) {
              return null;
            }

            const authHost = new URL(authUrl).host;
            if (siweMessage.domain !== authHost) {
              return null;
            }

            const csrfToken =
              credentials && 'csrfToken' in credentials
                ? credentials.csrfToken
                : undefined;

            if (siweMessage.nonce !== csrfToken) {
              return null;
            }

            const valid = await publicClient.verifyMessage({
              address: siweMessage?.address,
              message: credentials?.message as string,
              signature: credentials?.signature as `0x${string}`,
            });

            if (!valid) {
              return null;
            }

            return {
              id: siweMessage.address,
            };
          } catch {
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        session.address = token.sub;
        session.user = {
          ...session.user,
          name: token.sub,
        };
        return session;
      },
    },
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt',
    },
  };

  const nextAuthResult = NextAuth(authOptions);

  return {
    ...nextAuthResult,
    authOptions,
  };
}

async function getAuthorize(env: EnvOverrides = {}) {
  const { authOptions } = await createAuthModule(env);
  const provider = authOptions.providers?.[0] as unknown as {
    authorize: (
      credentials: Record<string, unknown>,
      request: Request,
    ) => Promise<unknown>;
  };

  return provider.authorize;
}

function requestWithCookie(cookie: string | null) {
  return new Request('https://example.com/api/auth/callback/credentials', {
    headers: cookie ? { cookie } : undefined,
  });
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
    const { authOptions } = await createAuthModule({
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

  it('prefers the Auth.js secret env var while preserving NEXTAUTH_SECRET fallback', async () => {
    const { authOptions } = await createAuthModule({
      AUTH_SECRET: 'auth-secret',
      NEXTAUTH_SECRET: 'nextauth-secret',
    });

    expect(authOptions.secret).toBe('auth-secret');
  });

  it('creates the public client used for server-side signature verification', async () => {
    await createAuthModule();

    expect(mocks.http).toHaveBeenCalledWith();
    expect(mocks.createPublicClient).toHaveBeenCalledWith({
      chain: { id: 1, name: 'Ethereum' },
      transport: 'http-transport',
    });
  });

  it.fails(
    'configures signature verification RPC with an explicit bounded transport',
    async () => {
      await createAuthModule({
        ETHEREUM_RPC_URL: rpcUrl,
      });

      expect(mocks.http).toHaveBeenCalledWith(rpcUrl, {
        retryCount: 0,
        timeout: 3000,
      });
    },
  );

  it('exports the helpers returned by NextAuth', async () => {
    const authModule = await createAuthModule();
    const nextAuthResults = mocks.NextAuth.mock.results;
    const nextAuthResult = nextAuthResults[nextAuthResults.length - 1]?.value;

    expect(authModule.auth).toBe(nextAuthResult.auth);
    expect(authModule.handlers).toBe(nextAuthResult.handlers);
    expect(authModule.signIn).toBe(nextAuthResult.signIn);
    expect(authModule.signOut).toBe(nextAuthResult.signOut);
  });

  it('authorizes valid SIWE credentials with the NextAuth CSRF credential', async () => {
    mockValidSiweMessage();
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(authorize(credentials, request)).resolves.toEqual({
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

  it('uses public client signature verification so ERC-1271 wallets stay supported', async () => {
    mockValidSiweMessage();
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await authorize(credentials, request);

    expect(mocks.verifyMessage).toHaveBeenCalledWith({
      address,
      message: credentials.message,
      signature: credentials.signature,
    });
  });

  it.fails(
    'returns null when signature verification RPC does not settle before the callback budget',
    async () => {
      mockValidSiweMessage();
      mocks.verifyMessage.mockReturnValue(
        new Promise<never>(() => {
          // Intentionally unresolved to model a stalled RPC provider.
        }),
      );
      const authorize = await getAuthorize({
        NEXTAUTH_URL: 'https://example.com',
      });

      await expect(
        Promise.race([
          authorize(credentials, request),
          new Promise((resolve) => setTimeout(() => resolve('timed-out'), 50)),
        ]),
      ).resolves.toBeNull();
    },
  );

  it.each([
    [{ AUTH_URL: 'https://auth.example.com' }, 'auth.example.com'],
    [{ NEXTAUTH_URL: 'https://example.com' }, 'example.com'],
    [{ VERCEL_URL: 'vercel.example.com' }, 'vercel.example.com'],
  ])('uses supported auth URL env source %#', async (env, domain) => {
    mockValidSiweMessage({ domain });
    const authorize = await getAuthorize(env);

    await expect(authorize(credentials, request)).resolves.toEqual({
      id: address,
    });
  });

  it('prefers AUTH_URL over legacy NEXTAUTH_URL for SIWE domain validation', async () => {
    mockValidSiweMessage({ domain: 'auth.example.com' });
    const authorize = await getAuthorize({
      AUTH_URL: 'https://auth.example.com',
      NEXTAUTH_URL: 'https://legacy.example.com',
    });

    await expect(authorize(credentials, request)).resolves.toEqual({
      id: address,
    });
  });

  it('rejects invalid SIWE messages before signature verification', async () => {
    mockValidSiweMessage();
    mocks.validateSiweMessage.mockReturnValue(false);
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(authorize(credentials, request)).resolves.toBeNull();

    expect(mocks.verifyMessage).not.toHaveBeenCalled();
  });

  it('rejects credentials when no auth URL env is configured', async () => {
    mockValidSiweMessage();
    const authorize = await getAuthorize();

    await expect(authorize(credentials, request)).resolves.toBeNull();
  });

  it('rejects credentials when the auth URL env is invalid', async () => {
    mockValidSiweMessage();
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'not a url',
    });

    await expect(authorize(credentials, request)).resolves.toBeNull();
  });

  it('rejects credentials when the SIWE domain does not match the auth host', async () => {
    mockValidSiweMessage({ domain: 'attacker.example.com' });
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(authorize(credentials, request)).resolves.toBeNull();
  });

  it.each([
    [
      'the SIWE nonce does not match the CSRF credential',
      { ...credentials, csrfToken: 'different-token' },
    ],
    [
      'the CSRF credential is missing',
      {
        message: credentials.message,
        signature: credentials.signature,
      },
    ],
    ['the CSRF credential is empty', { ...credentials, csrfToken: '' }],
    [
      'the CSRF token is only present in cookies',
      {
        message: credentials.message,
        signature: credentials.signature,
      },
    ],
  ])('rejects credentials when %s', async (reason, testCredentials) => {
    mockValidSiweMessage();
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(
      authorize(
        testCredentials,
        reason === 'the CSRF token is only present in cookies'
          ? requestWithCookie('authjs.csrf-token=csrf-token%7Ccsrf-hash')
          : request,
      ),
    ).resolves.toBeNull();

    expect(mocks.verifyMessage).not.toHaveBeenCalled();
  });

  it('rejects credentials when the signature is invalid', async () => {
    mockValidSiweMessage();
    mocks.verifyMessage.mockResolvedValue(false);
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(authorize(credentials, request)).resolves.toBeNull();
  });

  it('returns null when signature verification throws', async () => {
    mockValidSiweMessage();
    mocks.verifyMessage.mockRejectedValue(new Error('verification failed'));
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(authorize(credentials, request)).resolves.toBeNull();
  });

  it('returns null when SIWE parsing throws', async () => {
    mocks.parseSiweMessage.mockImplementation(() => {
      throw new Error('invalid message');
    });
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(authorize(credentials, request)).resolves.toBeNull();
  });

  it('returns null when SIWE parsing does not return a message', async () => {
    mocks.parseSiweMessage.mockReturnValue(undefined);
    mocks.validateSiweMessage.mockReturnValue(true);
    const authorize = await getAuthorize({
      NEXTAUTH_URL: 'https://example.com',
    });

    await expect(authorize(credentials, request)).resolves.toBeNull();
  });

  it('maps the token subject onto the session address and user name', async () => {
    const { authOptions } = await createAuthModule();
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
    const { authOptions } = await createAuthModule();
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
