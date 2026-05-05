import { render, screen } from '@testing-library/react';
import { createElement } from 'react';
import type { ComponentProps } from 'react';
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

function renderProvider(
  props: Partial<ComponentProps<typeof RainbowKitSiweNextAuthProvider>> = {},
) {
  return render(
    createElement(
      RainbowKitSiweNextAuthProvider,
      props,
      createElement('span', null, 'children'),
    ),
  );
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

    renderProvider({ enabled: false });

    expect(screen.getByText('children')).toBeInTheDocument();
    expect(mocks.providerProps.at(-1)).toMatchObject({
      enabled: false,
      status: 'authenticated',
    });
    expect(mocks.createAuthenticationAdapter).toHaveBeenCalledTimes(1);
  });

  it('falls back to loading status when NextAuth has no session context yet', () => {
    mocks.useSession.mockReturnValue(undefined);

    renderProvider();

    expect(mocks.providerProps.at(-1)).toMatchObject({
      status: 'loading',
    });
  });

  it('creates SIWE messages with default options', () => {
    renderProvider();

    const message = getAdapter().createMessage({
      address: '0x1111111111111111111111111111111111111111',
      chainId: 1,
      nonce: 'csrf-nonce',
    });

    const expectedMessageOptions = {
      address: '0x1111111111111111111111111111111111111111',
      chainId: 1,
      domain: window.location.host,
      nonce: 'csrf-nonce',
      statement: 'Sign in with Ethereum to the app.',
      uri: window.location.origin,
      version: '1',
    };

    expect(JSON.parse(message)).toEqual(expectedMessageOptions);
    expect(mocks.createSiweMessage).toHaveBeenCalledWith(
      expectedMessageOptions,
    );
  });

  it('creates SIWE messages with defaults and keeps address, chainId, and nonce unconfigurable', () => {
    renderProvider({
      getSiweMessageOptions: () =>
        ({
          address: '0x0000000000000000000000000000000000000000',
          chainId: 999,
          domain: 'custom.example',
          nonce: 'bad-nonce',
          statement: 'Custom statement',
          uri: 'https://custom.example',
          version: '1',
        }) as never,
    });

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
      uri: 'https://custom.example',
      version: '1',
    };

    expect(JSON.parse(message)).toEqual(expectedMessageOptions);
    expect(mocks.createSiweMessage).toHaveBeenCalledWith(
      expectedMessageOptions,
    );
  });

  it('reuses the adapter while SIWE message options are stable', () => {
    const getSiweMessageOptions = vi.fn(() => ({ statement: 'Stable' }));
    const { rerender } = renderProvider({ getSiweMessageOptions });
    const firstAdapter = getAdapter();

    rerender(
      createElement(
        RainbowKitSiweNextAuthProvider,
        { getSiweMessageOptions },
        createElement('span', null, 'updated children'),
      ),
    );

    expect(getAdapter()).toBe(firstAdapter);
    expect(mocks.createAuthenticationAdapter).toHaveBeenCalledTimes(1);
  });

  it('recreates the adapter when SIWE message options change', () => {
    const firstOptions = () => ({ statement: 'First' });
    const secondOptions = () => ({ statement: 'Second' });
    const { rerender } = renderProvider({
      getSiweMessageOptions: firstOptions,
    });
    const firstAdapter = getAdapter();

    rerender(
      createElement(
        RainbowKitSiweNextAuthProvider,
        { getSiweMessageOptions: secondOptions },
        createElement('span', null, 'children'),
      ),
    );

    expect(getAdapter()).not.toBe(firstAdapter);
    expect(mocks.createAuthenticationAdapter).toHaveBeenCalledTimes(2);
  });

  it('uses the NextAuth CSRF token as the RainbowKit nonce', async () => {
    mocks.getCsrfToken.mockResolvedValue('csrf-nonce');

    renderProvider();

    await expect(getAdapter().getNonce()).resolves.toBe('csrf-nonce');
  });

  it.each([undefined, null, ''])(
    'rejects nonce creation when NextAuth returns %s',
    async (nonce) => {
      mocks.getCsrfToken.mockResolvedValue(nonce);

      renderProvider();

      await expect(getAdapter().getNonce()).rejects.toThrow();
    },
  );

  it('propagates CSRF token lookup failures', async () => {
    const error = new Error('csrf failed');
    mocks.getCsrfToken.mockRejectedValue(error);

    renderProvider();

    await expect(getAdapter().getNonce()).rejects.toThrow(error);
  });

  it('verifies SIWE credentials through the NextAuth credentials provider', async () => {
    mocks.signIn.mockResolvedValue({ ok: true });

    renderProvider();

    await expect(
      getAdapter().verify({ message: 'message', signature: '0xsig' }),
    ).resolves.toBe(true);
    expect(mocks.signIn).toHaveBeenCalledWith('credentials', {
      message: 'message',
      redirect: false,
      signature: '0xsig',
    });
  });

  it.each([undefined, null, { ok: false }, {}])(
    'treats sign-in response %s as failed verification',
    async (response) => {
      mocks.signIn.mockResolvedValue(response);

      renderProvider();

      await expect(
        getAdapter().verify({ message: 'message', signature: '0xsig' }),
      ).resolves.toBe(false);
    },
  );

  it('propagates NextAuth sign-in failures', async () => {
    const error = new Error('sign-in failed');
    mocks.signIn.mockRejectedValue(error);

    renderProvider();

    await expect(
      getAdapter().verify({ message: 'message', signature: '0xsig' }),
    ).rejects.toThrow(error);
  });

  it('signs out through NextAuth without redirecting', async () => {
    renderProvider();

    await getAdapter().signOut();

    expect(mocks.signOut).toHaveBeenCalledWith({ redirect: false });
  });

  it('propagates NextAuth sign-out failures', async () => {
    const error = new Error('sign-out failed');
    mocks.signOut.mockRejectedValue(error);

    renderProvider();

    await expect(getAdapter().signOut()).rejects.toThrow(error);
  });
});
