import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useState } from 'react';

const Example = () => {
  const [showAvatar, setShowAvatar] = useState<boolean | undefined>();
  const [showBalance, setShowBalance] = useState<boolean | undefined>();
  const [showChains, setShowChains] = useState<boolean | undefined>();

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
          showAvatar={showAvatar}
          showBalance={showBalance}
          showChains={showChains}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ userSelect: 'none' }}>
            <input
              checked={showAvatar ?? true}
              onChange={event => {
                setShowAvatar(event.currentTarget.checked);
              }}
              type="checkbox"
            />{' '}
            showAvatar
          </label>
          <label style={{ userSelect: 'none' }}>
            <input
              checked={showBalance ?? true}
              onChange={event => {
                setShowBalance(event.currentTarget.checked);
              }}
              type="checkbox"
            />{' '}
            showBalance
          </label>
          <label style={{ userSelect: 'none' }}>
            <input
              checked={showChains ?? true}
              onChange={event => {
                setShowChains(event.currentTarget.checked);
              }}
              type="checkbox"
            />{' '}
            showChains
          </label>
        </div>
      </div>
    </div>
  );
};

export default Example;
