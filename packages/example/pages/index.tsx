import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';

const Example = () => {
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
        <ConnectButton />
      </div>

      <div>
        <h3 style={{ fontFamily: 'sans-serif' }}>Custom buttons</h3>
        <ConnectButton>
          {({
            account,
            chain,
            showAccountModal,
            showChainModal,
            showConnectModal,
          }) =>
            !account ? (
              <button onClick={showConnectModal} type="button">
                Connect Wallet
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={showChainModal}
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
                <button onClick={showAccountModal} type="button">
                  {account.displayName}
                  {account.balanceFormatted
                    ? ` (${account.balanceFormatted})`
                    : ''}
                </button>
              </div>
            )
          }
        </ConnectButton>
      </div>
    </div>
  );
};

export default Example;
