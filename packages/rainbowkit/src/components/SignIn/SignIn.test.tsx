import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import type { Address } from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { I18n } from '../../locales/I18n';
import {
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
} from '../RainbowKitProvider/AuthenticationContext';
import { I18nContext } from '../RainbowKitProvider/I18nContext';
import { SignIn } from './SignIn';

const wagmiMocks = vi.hoisted(() => ({
  signMessageAsync: vi.fn(),
  useAccount: vi.fn(),
  useAccountEffect: vi.fn(),
}));

vi.mock('wagmi', () => ({
  useAccount: wagmiMocks.useAccount,
  useAccountEffect: wagmiMocks.useAccountEffect,
  useSignMessage: () => ({
    signMessageAsync: wagmiMocks.signMessageAsync,
  }),
}));

const deviceMocks = vi.hoisted(() => ({ isMobile: vi.fn() }));

vi.mock('../../utils/isMobile', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../utils/isMobile')>()),
  isMobile: deviceMocks.isMobile,
}));

const address = '0x0000000000000000000000000000000000000001' as Address;

function renderSignIn({
  createMessage,
}: {
  createMessage: (args: {
    nonce: string;
    address: Address;
    chainId: number;
  }) => string | Promise<string>;
}) {
  const adapter = createAuthenticationAdapter<string>({
    createMessage,
    getNonce: async () => 'nonce',
    signOut: async () => {},
    verify: async () => true,
  });

  return render(
    <RainbowKitAuthenticationProvider
      adapter={adapter}
      status="unauthenticated"
    >
      <SignIn onClose={() => {}} onCloseModal={() => {}} />
    </RainbowKitAuthenticationProvider>,
  );
}

describe('SignIn', () => {
  beforeEach(() => {
    deviceMocks.isMobile.mockReturnValue(false);
    wagmiMocks.signMessageAsync.mockReset();
    wagmiMocks.useAccount.mockReturnValue({
      address,
      chain: { id: 1 },
    });
    wagmiMocks.useAccountEffect.mockReset();
  });

  it.each([
    false,
    true,
  ])('translates cancel and closes the flow (mobile: %s)', async (mobile) => {
    deviceMocks.isMobile.mockReturnValue(mobile);
    const onClose = vi.fn();
    const i18n = new I18n({
      fr: { sign_in: { message: { cancel: 'Annuler' } } },
    });
    i18n.locale = 'fr';
    const adapter = createAuthenticationAdapter<string>({
      createMessage: () => 'message',
      getNonce: async () => 'nonce',
      signOut: async () => {},
      verify: async () => true,
    });

    render(
      <I18nContext.Provider value={{ i18n }}>
        <RainbowKitAuthenticationProvider
          adapter={adapter}
          status="unauthenticated"
        >
          <SignIn onClose={onClose} onCloseModal={() => {}} />
        </RainbowKitAuthenticationProvider>
      </I18nContext.Provider>,
    );

    fireEvent.click(await screen.findByRole('button', { name: 'Annuler' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('skips message preparation state when message creation is synchronous', async () => {
    const createMessage = vi.fn(() => 'message');
    wagmiMocks.signMessageAsync.mockReturnValue(new Promise(() => {}));

    renderSignIn({ createMessage });

    const button = await screen.findByTestId('rk-auth-message-button');
    await waitFor(() => expect(button).toHaveTextContent('Sign message'));

    fireEvent.click(button);

    expect(createMessage).toHaveBeenCalledOnce();
    await waitFor(() =>
      expect(wagmiMocks.signMessageAsync).toHaveBeenCalledWith({
        message: 'message',
      }),
    );
    expect(button).toHaveTextContent('Waiting for signature...');
  });

  it('shows message preparation state while async message creation is pending', async () => {
    let resolveMessage: (message: string) => void = () => {};
    const messagePromise = new Promise<string>((resolve) => {
      resolveMessage = resolve;
    });
    const createMessage = vi.fn(() => messagePromise);
    wagmiMocks.signMessageAsync.mockReturnValue(new Promise(() => {}));

    renderSignIn({ createMessage });

    const button = await screen.findByTestId('rk-auth-message-button');
    await waitFor(() => expect(button).toHaveTextContent('Sign message'));

    fireEvent.click(button);

    expect(createMessage).toHaveBeenCalledOnce();
    expect(wagmiMocks.signMessageAsync).not.toHaveBeenCalled();
    expect(button).toHaveTextContent('Preparing message...');

    await act(async () => {
      resolveMessage('message');
      await messagePromise;
    });

    await waitFor(() =>
      expect(wagmiMocks.signMessageAsync).toHaveBeenCalledWith({
        message: 'message',
      }),
    );
    expect(button).toHaveTextContent('Waiting for signature...');
  });

  it('preserves the nonce so users can retry after message creation fails', async () => {
    const createMessage = vi
      .fn()
      .mockRejectedValueOnce(new Error('network error'))
      .mockReturnValue(new Promise(() => {}));

    renderSignIn({ createMessage });

    const button = await screen.findByTestId('rk-auth-message-button');
    await waitFor(() => expect(button).toHaveTextContent('Sign message'));

    fireEvent.click(button);

    await waitFor(() =>
      expect(
        screen.getByText('Error preparing message, please retry!'),
      ).toBeInTheDocument(),
    );
    expect(button).toHaveTextContent('Sign message');

    fireEvent.click(button);

    expect(createMessage).toHaveBeenCalledTimes(2);
  });
});
