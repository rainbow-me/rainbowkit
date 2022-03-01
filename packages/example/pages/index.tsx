import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { ComponentProps, useState } from 'react';

type ConnectButtonProps = ComponentProps<typeof ConnectButton>;
type AccountStatus = ConnectButtonProps['accountStatus'];
type ChainStatus = ConnectButtonProps['chainStatus'];

const Example = () => {
  const [accountStatus, setAccountStatus] = useState<AccountStatus>();
  const [showBalance, setShowBalance] = useState<boolean | undefined>();
  const [chainStatus, setChainStatus] = useState<ChainStatus>();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        paddingBottom: 24,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <ConnectButton
          accountStatus={accountStatus}
          chainStatus={chainStatus}
          showBalance={showBalance}
        />
      </div>

      <div>
        <h3 style={{ fontFamily: 'sans-serif' }}>Custom buttons</h3>
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
          }) =>
            !account ? (
              <button onClick={openConnectModal} type="button">
                Connect Wallet
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={openChainModal}
                  style={{ alignItems: 'center', display: 'flex' }}
                  type="button"
                >
                  {chain.iconUrl && (
                    <img
                      alt={chain.name ?? 'Chain icon'}
                      src={chain.iconUrl}
                      style={{ height: 12, marginRight: 4, width: 12 }}
                    />
                  )}
                  {chain.name ?? chain.id}
                </button>
                <button onClick={openAccountModal} type="button">
                  {account.displayName}
                  {account.balanceFormatted
                    ? ` (${account.balanceFormatted})`
                    : ''}
                </button>
              </div>
            )
          }
        </ConnectButton.Custom>
      </div>

      <div style={{ fontFamily: 'sans-serif' }}>
        <h3>ConnectButton props</h3>
        <table cellSpacing={12}>
          <tbody>
            <tr>
              <td>
                <label htmlFor="accountStatus">accountStatus</label>
              </td>
              <td>
                <select
                  id="accountStatus"
                  onChange={event =>
                    setAccountStatus(event.currentTarget.value as AccountStatus)
                  }
                  value={accountStatus}
                >
                  <option>full</option>
                  <option>avatar</option>
                  <option>address</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="showBalance">showBalance</label>
              </td>
              <td>
                <input
                  checked={showBalance ?? true}
                  id="showBalance"
                  onChange={event => {
                    setShowBalance(event.currentTarget.checked);
                  }}
                  type="checkbox"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="chainStatus">chainStatus</label>
              </td>
              <td>
                <select
                  id="chainStatus"
                  onChange={event =>
                    setChainStatus(event.currentTarget.value as ChainStatus)
                  }
                  value={chainStatus}
                >
                  <option>full</option>
                  <option>icon</option>
                  <option>name</option>
                  <option>none</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Example;
