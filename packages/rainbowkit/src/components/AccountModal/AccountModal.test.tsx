import user from '@testing-library/user-event';
import React, { Fragment } from 'react';
import { describe, expect, it } from 'vitest';
import { useConnect } from 'wagmi';
import { renderWithProviders } from '../../../test/';
import { mockedAccounts } from '../../../test/mockWallet';
import { formatAddress } from '../ConnectButton/formatAddress';
import { AccountModal } from './AccountModal';

const AccountModalWithConnectButton = () => {
  const { connect, connectors } = useConnect();

  return (
    <Fragment>
      <AccountModal onClose={() => {}} open />
      <button
        type="button"
        onClick={() => connect({ connector: connectors[0] })}
        data-testid="rk-connect-btn"
      >
        connect
      </button>
    </Fragment>
  );
};

describe('<AccountModal />', () => {
  it('names the dialog after the connected account', async () => {
    const modal = renderWithProviders(<AccountModalWithConnectButton />);

    await user.click(await modal.findByTestId('rk-connect-btn'));

    const dialog = await modal.findByRole('dialog');
    const titleId = dialog.getAttribute('aria-labelledby');
    expect(titleId).toBeTruthy();

    // The id the dialog points at must exist exactly once, on the account name
    const titles = document.querySelectorAll(`[id="${titleId}"]`);
    expect(titles).toHaveLength(1);
    expect(titles[0]).toHaveTextContent(formatAddress(mockedAccounts[0]));
    expect(dialog).toHaveAccessibleName(formatAddress(mockedAccounts[0]));
  });
});
