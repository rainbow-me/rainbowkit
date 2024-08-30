import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { renderWithProviders } from '../../../test';
import type { Locale } from '../../locales';
import { ConnectModal } from './ConnectModal';

describe('<ConnectModal />', () => {
  const renderHeaderLabelModal = async (locale?: Locale) => {
    const options = {
      props: {
        chains: [mainnet],
        ...(locale ? { locale } : {}),
      },
    };

    renderWithProviders(
      <ConnectModal onClose={() => {}} open={true} />,
      options,
    );

    return screen.getByTestId('rk-connect-header-label');
  };

  it('Defaults to English without a `locale` prop', async () => {
    const modal = await renderHeaderLabelModal();
    await waitFor(() => expect(modal.textContent).toBe('Connect a Wallet'));
  });

  it("Displays in English for 'en-US'", async () => {
    const modal = await renderHeaderLabelModal('en-US');
    await waitFor(() => expect(modal.textContent).toBe('Connect a Wallet'));
  });

  it("Displays in Spanish for 'es-419'", async () => {
    const modal = await renderHeaderLabelModal('es-419');
    await waitFor(() =>
      expect(modal.textContent).toBe('Conectar una billetera'),
    );
  });

  it("Displays in Russian for 'ru-RU'", async () => {
    const modal = await renderHeaderLabelModal('ru-RU');
    await waitFor(() => expect(modal.textContent).toBe('Подключить кошелек'));
  });
});
