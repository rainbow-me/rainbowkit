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
import {
  RainbowKitAuthenticationProvider,
  createAuthenticationAdapter,
} from '../RainbowKitProvider/AuthenticationContext';
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
    wagmiMocks.signMessageAsync.mockReset();
    wagmiMocks.useAccount.mockReturnValue({
      address,
      chain: { id: 1 },
    });
    wagmiMocks.useAccountEffect.mockReset();
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
