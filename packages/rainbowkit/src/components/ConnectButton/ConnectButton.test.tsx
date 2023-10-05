import React from 'react';
import { describe, expect, it } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { renderWithProviders } from '../../../test';
import { Locale } from '../../locales';
import { ConnectButton } from './ConnectButton';

describe('<ConnectButton />', () => {
  const renderTextButton = (locale?: Locale) => {
    const options = {
      mock: true,
      props: {
        chains: [mainnet],
        ...(locale ? { locale } : {}),
      },
    };

    const { getByTestId } = renderWithProviders(<ConnectButton />, options);

    const button = getByTestId('rk-connect-button');

    return button.textContent;
  };

  it('Defaults to English without a `locale` prop', () => {
    const text = renderTextButton();
    expect(text).toBe('Connect Wallet');
  });

  it("Displays in English for 'en-US'", () => {
    const text = renderTextButton('en-US');
    expect(text).toBe('Connect Wallet');
  });

  it("Displays in Spanish for 'es-419'", () => {
    const text = renderTextButton('es-419');
    expect(text).toBe('Conectar la billetera');
  });

  it("Displays in Russian for 'ru-RU'", () => {
    const text = renderTextButton('ru-RU');
    expect(text).toBe('Подключить кошелек');
  });
});
