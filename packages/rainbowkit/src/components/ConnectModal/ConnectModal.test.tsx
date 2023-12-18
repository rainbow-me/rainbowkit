import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { renderWithProviders } from '../../../test';
import { Locale } from '../../locales';
import { ConnectModal } from './ConnectModal';

describe('<ConnectModal />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  const renderHeaderLabelModal = async (locale?: Locale) => {
    const options = {
      props: {
        chains: [mainnet],
        ...(locale ? { locale } : {}),
      },
    };

    const { getByTestId } = renderWithProviders(
      <ConnectModal onClose={() => {}} open={true} />,
      options,
    );

    await vi.advanceTimersByTimeAsync(250);

    const modal = getByTestId('rk-connect-header-label');

    return modal.textContent;
  };

  it('Defaults to English without a `locale` prop', async () => {
    const label = await renderHeaderLabelModal();
    expect(label).toBe('Connect a Wallet');
  });

  it("Displays in English for 'en-US'", async () => {
    const label = await renderHeaderLabelModal('en-US');
    expect(label).toBe('Connect a Wallet');
  });

  it("Displays in Spanish for 'es-419'", async () => {
    const label = await renderHeaderLabelModal('es-419');
    expect(label).toBe('Conectar una billetera');
  });

  it("Displays in Russian for 'ru-RU'", async () => {
    const label = await renderHeaderLabelModal('ru-RU');
    expect(label).toBe('Подключить кошелек');
  });
});
