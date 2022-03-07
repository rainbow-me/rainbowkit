import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { ComponentProps, useState } from 'react';

type ConnectButtonProps = ComponentProps<typeof ConnectButton>;
type ExtractString<Value> = Value extends string ? Value : never;
type AccountStatus = ExtractString<ConnectButtonProps['accountStatus']>;
type ChainStatus = ExtractString<ConnectButtonProps['chainStatus']>;

const Example = () => {
  const defaultProps = ConnectButton.__defaultProps;

  const [accountStatusSmallScreen, setAccountStatusSmallScreen] =
    useState<AccountStatus>(defaultProps.accountStatus);
  const [accountStatusLargeScreen, setAccountStatusLargeScreen] =
    useState<AccountStatus>(defaultProps.accountStatus);

  const [chainStatusSmallScreen, setChainStatusSmallScreen] =
    useState<ChainStatus>(defaultProps.chainStatus.smallScreen);
  const [chainStatusLargeScreen, setChainStatusLargeScreen] =
    useState<ChainStatus>(defaultProps.chainStatus.largeScreen);

  const [showBalanceSmallScreen, setShowBalanceSmallScreen] = useState<boolean>(
    defaultProps.showBalance.smallScreen
  );
  const [showBalanceLargeScreen, setShowBalanceLargeScreen] = useState<boolean>(
    defaultProps.showBalance.largeScreen
  );

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
          accountStatus={{
            largeScreen: accountStatusLargeScreen,
            smallScreen: accountStatusSmallScreen,
          }}
          chainStatus={{
            largeScreen: chainStatusLargeScreen,
            smallScreen: chainStatusSmallScreen,
          }}
          showBalance={{
            largeScreen: showBalanceLargeScreen,
            smallScreen: showBalanceSmallScreen,
          }}
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
          <thead>
            <tr>
              <th>Prop</th>
              <th>smallScreen</th>
              <th>largeScreen</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label htmlFor="accountStatus">accountStatus</label>
              </td>
              <td>
                <select
                  id="accountStatus"
                  onChange={event =>
                    setAccountStatusSmallScreen(
                      event.currentTarget.value as AccountStatus
                    )
                  }
                  value={accountStatusSmallScreen}
                >
                  <option>full</option>
                  <option>avatar</option>
                  <option>address</option>
                </select>
              </td>
              <td>
                <select
                  id="accountStatus"
                  onChange={event =>
                    setAccountStatusLargeScreen(
                      event.currentTarget.value as AccountStatus
                    )
                  }
                  value={accountStatusLargeScreen}
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
                  checked={showBalanceSmallScreen}
                  id="showBalance"
                  onChange={event => {
                    setShowBalanceSmallScreen(event.currentTarget.checked);
                  }}
                  type="checkbox"
                />
              </td>
              <td>
                <input
                  checked={showBalanceLargeScreen}
                  id="showBalance"
                  onChange={event => {
                    setShowBalanceLargeScreen(event.currentTarget.checked);
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
                    setChainStatusSmallScreen(
                      event.currentTarget.value as ChainStatus
                    )
                  }
                  value={chainStatusSmallScreen}
                >
                  <option>full</option>
                  <option>icon</option>
                  <option>name</option>
                  <option>none</option>
                </select>
              </td>
              <td>
                <select
                  id="chainStatus"
                  onChange={event =>
                    setChainStatusLargeScreen(
                      event.currentTarget.value as ChainStatus
                    )
                  }
                  value={chainStatusLargeScreen}
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
