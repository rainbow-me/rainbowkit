import React from 'react';
import { describe, expect, it } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { renderWithProviders } from '../../../test';
import { Locale } from '../../locales';
import { ConnectModal } from './ConnectModal';

describe('<ConnectModal />', () => {
  const renderHeaderLabelModal = (locale?: Locale) => {
    const options = {
      mock: true,
      props: {
        chains: [mainnet],
        ...(locale ? { locale } : {}),
      },
    };

    const { getByTestId } = renderWithProviders(
      <ConnectModal onClose={() => {}} open={true} />,
      options,
    );

    const modal = getByTestId('rk-connect-header-label');

    return modal.textContent;
  };

  it('Defaults to English without a `locale` prop', () => {
    const label = renderHeaderLabelModal();
    expect(label).toBe('Connect a Wallet');
  });

  it("Displays in English for 'en-US'", () => {
    const label = renderHeaderLabelModal('en-US');
    expect(label).toBe('Connect a Wallet');
  });

  it("Displays in Spanish for 'es-419'", () => {
    const label = renderHeaderLabelModal('es-419');
    expect(label).toBe('Conectar una billetera');
  });

  it("Displays in Russian for 'ru-RU'", () => {
    const label = renderHeaderLabelModal('ru-RU');
    expect(label).toBe('Подключить кошелек');
  });
});
