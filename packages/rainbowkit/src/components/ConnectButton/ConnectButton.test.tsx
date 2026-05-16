import { screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import React, { Fragment } from 'react';
import { describe, expect, it } from 'vitest';
import { useConnect } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { renderWithProviders } from '../../../test';
import type { Locale } from '../../locales';
import { ConnectButton, type ConnectButtonProps } from './ConnectButton';

describe('<ConnectButton />', () => {
  const renderTextButton = (locale?: Locale) => {
    const options = {
      props: {
        chains: [mainnet],
        ...(locale ? { locale } : {}),
      },
    };

    renderWithProviders(<ConnectButton />, options);

    return screen.getByTestId('rk-connect-button');
  };

  it('Defaults to English without a `locale` prop', async () => {
    const button = renderTextButton();
    await waitFor(() => expect(button.textContent).toBe('Connect Wallet'));
  });

  it("Displays in English for 'en-US'", async () => {
    const button = renderTextButton('en-US');
    await waitFor(() => expect(button.textContent).toBe('Connect Wallet'));
  });

  it("Displays in Spanish for 'es-419'", async () => {
    const button = renderTextButton('es-419');
    await waitFor(() =>
      expect(button.textContent).toBe('Conectar la billetera'),
    );
  });

  it("Displays in Russian for 'ru-RU'", async () => {
    const button = renderTextButton('ru-RU');
    await waitFor(() => expect(button.textContent).toBe('Подключить кошелек'));
  });

  describe('chain selector visibility with a single chain', () => {
    const ConnectAndButton = (props: ConnectButtonProps) => {
      const { connect, connectors } = useConnect();

      return (
        <Fragment>
          <ConnectButton {...props} />
          <button
            data-testid="rk-test-connect"
            onClick={() => connect({ connector: connectors[0] })}
            type="button"
          >
            connect
          </button>
        </Fragment>
      );
    };

    const renderConnected = async (props: ConnectButtonProps = {}) => {
      const result = renderWithProviders(<ConnectAndButton {...props} />, {
        chains: [mainnet],
      });

      const trigger = await result.findByTestId('rk-test-connect');
      await user.click(trigger);

      return result;
    };

    it('Hides the chain selector by default when only one chain is configured', async () => {
      const result = await renderConnected();

      await result.findByTestId('rk-account-button');
      expect(result.queryByTestId('rk-chain-button')).toBeNull();
    });

    it('Renders the chain selector when `chainStatus` is set explicitly', async () => {
      const result = await renderConnected({ chainStatus: 'full' });

      const chainButton = await result.findByTestId('rk-chain-button');
      expect(chainButton).toBeInTheDocument();
    });

    it('Hides the chain selector via display sprinkle when `chainStatus="none"` is set explicitly', async () => {
      const result = await renderConnected({ chainStatus: 'none' });

      await result.findByTestId('rk-account-button');
      // The chain button is mounted but suppressed via vanilla-extract
      // `display: none` sprinkles. jsdom does not compute styles from those
      // CSS modules, so we assert the suppressing class is applied instead
      // of `toBeVisible()`.
      const chainButton = result.queryByTestId('rk-chain-button');
      expect(chainButton).not.toBeNull();
      expect(chainButton?.className).toMatch(/display_none/);
    });
  });
});
