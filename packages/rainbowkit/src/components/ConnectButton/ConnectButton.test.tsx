import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { renderWithProviders } from '../../../test';
import { Locale } from '../../locales';
import { ConnectButton } from './ConnectButton';

describe('<ConnectButton />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  const renderTextButton = async (locale?: Locale) => {
    const options = {
      props: {
        chains: [mainnet],
        ...(locale ? { locale } : {}),
      },
    };

    const { getByTestId } = renderWithProviders(<ConnectButton />, options);

    await vi.advanceTimersByTimeAsync(250);

    const button = getByTestId('rk-connect-button');

    return button.textContent;
  };

  it('Defaults to English without a `locale` prop', async () => {
    const text = await renderTextButton();
    expect(text).toBe('Connect Wallet');
  });

  it("Displays in English for 'en-US'", async () => {
    const text = await renderTextButton('en-US');
    expect(text).toBe('Connect Wallet');
  });

  it("Displays in Spanish for 'es-419'", async () => {
    const text = await renderTextButton('es-419');
    expect(text).toBe('Conectar la billetera');
  });

  it("Displays in Russian for 'ru-RU'", async () => {
    const text = await renderTextButton('ru-RU');
    expect(text).toBe('Подключить кошелек');
  });
});
