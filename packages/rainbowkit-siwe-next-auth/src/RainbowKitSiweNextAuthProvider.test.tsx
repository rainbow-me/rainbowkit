import { render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RainbowKitSiweNextAuthProvider } from './RainbowKitSiweNextAuthProvider';

const mocks = vi.hoisted(() => {
  const providerProps: any[] = [];

  return {
    createAuthenticationAdapter: vi.fn((adapter) => adapter),
    createSiweMessage: vi.fn((options) => JSON.stringify(options)),
    getCsrfToken: vi.fn(),
    providerProps,
    signIn: vi.fn(),
    signOut: vi.fn(),
    useSession: vi.fn(),
  };
});

vi.mock('@rainbow-me/rainbowkit', async () => {
  const React = await import('react');

  return {
    RainbowKitAuthenticationProvider: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => {
      mocks.providerProps.push(props);
      return React.createElement(
        'div',
        { 'data-testid': 'authentication-provider' },
        children,
      );
    },
    createAuthenticationAdapter: mocks.createAuthenticationAdapter,
  };
});

vi.mock('next-auth/react', () => ({
  getCsrfToken: mocks.getCsrfToken,
  signIn: mocks.signIn,
  signOut: mocks.signOut,
  useSession: mocks.useSession,
}));

vi.mock('viem/siwe', () => ({
  createSiweMessage: mocks.createSiweMessage,
}));

function getAdapter() {
  const latestProviderProps = mocks.providerProps.at(-1);
  if (!latestProviderProps) throw new Error('Provider was not rendered');
  return latestProviderProps.adapter;
}

describe('<RainbowKitSiweNextAuthProvider />', () => {
  beforeEach(() => {
    mocks.providerProps.length = 0;
    mocks.createAuthenticationAdapter.mockClear();
    mocks.createSiweMessage.mockClear();
    mocks.getCsrfToken.mockReset();
    mocks.signIn.mockReset();
    mocks.signOut.mockReset();
    mocks.useSession.mockReset();
    mocks.useSession.mockReturnValue({ status: 'unauthenticated' });
  });

  it('passes the NextAuth session status and enabled flag through to RainbowKit', () => {
    mocks.useSession.mockReturnValue({ status: 'authenticated' });

    render(
      <RainbowKitSiweNextAuthProvider enabled={false}>
        <span>children</span>
      </RainbowKitSiweNextAuthProvider>,
    );

    expect(screen.getByText('children')).toBeInTheDocument();
    expect(mocks.providerProps.at(-1)).toMatchObject({
      enabled: false,
      status: 'authenticated',
    });
    expect(mocks.createAuthenticationAdapter).toHaveBeenCalledTimes(1);
  });

  it('falls back to loading status when NextAuth has no session context yet', () => {
    mocks.useSession.mockReturnValue(undefined);

    render(
      <RainbowKitSiweNextAuthProvider>
        <span>children</span>
      </RainbowKitSiweNextAuthProvider>,
    );

    expect(mocks.providerProps.at(-1)).toMatchObject({
      status: 'loading',
    });
  });

  it('creates SIWE messages with defaults and keeps address, chainId, and nonce unconfigurable', () => {
    render(
      <RainbowKitSiweNextAuthProvider
        getSiweMessageOptions={() =>
          ({
            address: '0x0000000000000000000000000000000000000000',
            chainId: 999,
            domain: 'custom.example',
            nonce: 'bad-nonce',
            statement: 'Custom statement',
          }) as never
        }
      >
        <span>children</span>
      </RainbowKitSiweNextAuthProvider>,
    );

    const message = getAdapter().createMessage({
      address: '0x1111111111111111111111111111111111111111',
      chainId: 1,
      nonce: 'csrf-nonce',
    });

    const expectedMessageOptions = {
      address: '0x1111111111111111111111111111111111111111',
      chainId: 1,
      domain: 'custom.example',
      nonce: 'csrf-nonce',
      statement: 'Custom statement',
      uri: window.location.origin,
      version: '1',
    };

    expect(JSON.parse(message)).toEqual(expectedMessageOptions);
    expect(mocks.createSiweMessage).toHaveBeenCalledWith(
      expectedMessageOptions,
    );
  });

  it('uses the NextAuth CSRF token as the RainbowKit nonce', async () => {
    mocks.getCsrfToken.mockResolvedValue('csrf-nonce');

    render(
      <RainbowKitSiweNextAuthProvider>
        <span>children</span>
      </RainbowKitSiweNextAuthProvider>,
    );

    await expect(getAdapter().getNonce()).resolves.toBe('csrf-nonce');
  });

  it('rejects nonce creation when NextAuth does not return a CSRF token', async () => {
    mocks.getCsrfToken.mockResolvedValue(undefined);

    render(
      <RainbowKitSiweNextAuthProvider>
        <span>children</span>
      </RainbowKitSiweNextAuthProvider>,
    );

    await expect(getAdapter().getNonce()).rejects.toThrow();
  });

  it('verifies SIWE credentials through the NextAuth credentials provider', async () => {
    mocks.signIn.mockResolvedValue({ ok: true });

    render(
      <RainbowKitSiweNextAuthProvider>
        <span>children</span>
      </RainbowKitSiweNextAuthProvider>,
    );

    await expect(
      getAdapter().verify({ message: 'message', signature: '0xsig' }),
    ).resolves.toBe(true);
    expect(mocks.signIn).toHaveBeenCalledWith('credentials', {
      message: 'message',
      redirect: false,
      signature: '0xsig',
    });
  });

  it('treats failed or missing NextAuth sign-in responses as failed verification', async () => {
    mocks.signIn.mockResolvedValue(undefined);

    render(
      <RainbowKitSiweNextAuthProvider>
        <span>children</span>
      </RainbowKitSiweNextAuthProvider>,
    );

    await expect(
      getAdapter().verify({ message: 'message', signature: '0xsig' }),
    ).resolves.toBe(false);
  });

  it('signs out through NextAuth without redirecting', async () => {
    render(
      <RainbowKitSiweNextAuthProvider>
        <span>children</span>
      </RainbowKitSiweNextAuthProvider>,
    );

    await getAdapter().signOut();

    expect(mocks.signOut).toHaveBeenCalledWith({ redirect: false });
  });
});
