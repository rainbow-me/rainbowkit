import { RainbowButton } from '@rainbow-me/rainbow-button';
import {
  ConnectButton,
  WalletButton,
  useAccountModal,
  useAddRecentTransaction,
  useChainModal,
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { type ComponentProps, useEffect, useState } from 'react';
import { type Address, parseEther } from 'viem';
import {
  useAccount,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
} from 'wagmi';
import type { AppContextProps } from '../lib/AppContextProps';
import { getAuthOptions } from './api/auth/[...nextauth]';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      session: await getServerSession(req, res, getAuthOptions(req)),
    },
  };
};

type ConnectButtonProps = ComponentProps<typeof ConnectButton>;
type ExtractString<Value> = Value extends string ? Value : never;
type AccountStatus = ExtractString<ConnectButtonProps['accountStatus']>;
type ChainStatus = ExtractString<ConnectButtonProps['chainStatus']>;

const Example = ({ authEnabled }: AppContextProps) => {
  const { openAccountModal, accountModalOpen } = useAccountModal();
  const { openChainModal, chainModalOpen } = useChainModal();
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const { address, isConnected: isWagmiConnected } = useAccount();
  const { status } = useSession();

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
    defaultProps.showBalance.smallScreen,
  );
  const [showBalanceLargeScreen, setShowBalanceLargeScreen] = useState<boolean>(
    defaultProps.showBalance.largeScreen,
  );

  const { chain: activeChain } = useAccount();

  const {
    data: transactionData,
    error: transactionError,
    sendTransaction,
  } = useSendTransaction();

  const {
    data: signingData,
    error: signingError,
    signMessage,
  } = useSignMessage();

  const {
    data: typedData,
    error: typedError,
    signTypedData,
  } = useSignTypedData();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const ready = mounted && (!authEnabled || status !== 'loading');
  const connected =
    isWagmiConnected && (!authEnabled || status === 'authenticated');

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
          position: 'sticky',
          top: 8,
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ConnectButton.Custom>
            {({
              account,
              authenticationStatus,
              chain,
              mounted,
              openAccountModal,
              openChainModal,
              openConnectModal,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button onClick={openConnectModal} type="button">
                          Connect Wallet
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} type="button">
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button
                          onClick={openChainModal}
                          style={{ alignItems: 'center', display: 'flex' }}
                          type="button"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                borderRadius: 999,
                                height: 12,
                                marginRight: 4,
                                overflow: 'hidden',
                                width: 12,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  style={{ height: 12, width: 12 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name ?? chain.id}
                        </button>

                        <button onClick={openAccountModal} type="button">
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ''}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>

          <RainbowButton.Custom>
            {({ ready, connect }) => {
              return (
                <button
                  type="button"
                  disabled={!ready}
                  onClick={connect}
                  style={{ marginLeft: '16px' }}
                >
                  Connect Rainbow
                </button>
              );
            }}
          </RainbowButton.Custom>
        </div>
      </div>

      <div>
        <h3 style={{ fontFamily: 'sans-serif' }}>Wallet buttons</h3>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          {['rainbow', 'metamask', 'coinbase'].map((connector) => {
            return <WalletButton key={connector} wallet={connector} />;
          })}
        </div>
      </div>

      {ready && (
        <>
          <div>
            <h3 style={{ fontFamily: 'sans-serif' }}>Modal hooks</h3>
            <div style={{ display: 'flex', gap: 12, paddingBottom: 12 }}>
              <button
                disabled={!openConnectModal}
                onClick={openConnectModal}
                type="button"
              >
                {connectModalOpen
                  ? 'Connect modal opened'
                  : 'Open connect modal'}
              </button>
              <button
                disabled={!openChainModal}
                onClick={openChainModal}
                type="button"
              >
                {chainModalOpen ? 'Chain modal opened' : 'Open chain modal'}
              </button>
              <button
                disabled={!openAccountModal}
                onClick={openAccountModal}
                type="button"
              >
                {accountModalOpen
                  ? 'Account modal opened'
                  : 'Open account modal'}
              </button>
            </div>
          </div>

          <div style={{ fontFamily: 'sans-serif' }}>
            <h3>
              Example Actions {!connected && <span>(not connected)</span>}
            </h3>
            <div style={{ display: 'flex', gap: 12, paddingBottom: 12 }}>
              <button
                disabled={!connected || !sendTransaction}
                onClick={() =>
                  sendTransaction?.({
                    to: address as Address,
                    value: parseEther('0.00001'),
                  })
                }
                type="button"
              >
                Send Transaction
              </button>
              <button
                disabled={!connected}
                onClick={() => signMessage({ message: 'wen token' })}
                type="button"
              >
                Sign Message
              </button>
              <button
                disabled={!connected || activeChain?.id !== 1}
                onClick={() =>
                  signTypedData({
                    domain: {
                      chainId: 1,
                      name: 'Ether Mail',
                      verifyingContract:
                        '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
                      version: '1',
                    },
                    message: {
                      contents: 'Hello, Bob!',
                      from: {
                        name: 'Cow',
                        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                      },
                      to: {
                        name: 'Bob',
                        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                      },
                    },
                    primaryType: 'Mail',
                    types: {
                      Mail: [
                        { name: 'from', type: 'Person' },
                        { name: 'to', type: 'Person' },
                        { name: 'contents', type: 'string' },
                      ],
                      Person: [
                        { name: 'name', type: 'string' },
                        { name: 'wallet', type: 'address' },
                      ],
                    },
                  })
                }
                type="button"
              >
                Sign Typed Data
              </button>
            </div>
            <div>
              {transactionData && (
                <div>Transaction: {JSON.stringify(transactionData)}</div>
              )}
              {transactionError && <div>Error sending transaction</div>}
              {signingData && (
                <div style={{ wordBreak: 'break-all' }}>
                  Data Signature: {signingData}
                </div>
              )}
              {signingError && <div>Error signing message</div>}
              {typedData && (
                <div style={{ wordBreak: 'break-all' }}>
                  Typed Data Signature: {typedData}
                </div>
              )}
              {typedError && <div>Error signing typed message</div>}
            </div>
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
                      onChange={(event) =>
                        setAccountStatusSmallScreen(
                          event.currentTarget.value as AccountStatus,
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
                      onChange={(event) =>
                        setAccountStatusLargeScreen(
                          event.currentTarget.value as AccountStatus,
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
                      onChange={(event) => {
                        setShowBalanceSmallScreen(event.currentTarget.checked);
                      }}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <input
                      checked={showBalanceLargeScreen}
                      id="showBalance"
                      onChange={(event) => {
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
                      onChange={(event) =>
                        setChainStatusSmallScreen(
                          event.currentTarget.value as ChainStatus,
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
                      onChange={(event) =>
                        setChainStatusLargeScreen(
                          event.currentTarget.value as ChainStatus,
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
          {connected ? <ManageTransactions /> : null}
        </>
      )}
    </div>
  );
};

function ManageTransactions() {
  const addRecentTransaction = useAddRecentTransaction();

  const [hash, setHash] = useState('');
  const [description, setDescription] = useState('');
  const [confirmations, setConfirmations] = useState(1);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        addRecentTransaction({
          confirmations: confirmations === 1 ? undefined : confirmations,
          description: description.trim() || 'Transaction',
          hash: hash.trim(),
        });

        setHash('');
        setDescription('');
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        gap: 12,
      }}
    >
      <h3>Add recent transaction</h3>
      <div style={{ display: 'flex', gap: 12 }}>
        <label htmlFor="txHash">Hash</label>
        <input
          id="txHash"
          onChange={(e) => setHash(e.currentTarget.value)}
          type="text"
          value={hash}
        />
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <label htmlFor="txDescription">Description</label>
        <input
          id="txDescription"
          onChange={(e) => setDescription(e.currentTarget.value)}
          type="text"
          value={description}
        />
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <label htmlFor="txConfirmations">Confirmations</label>
        <input
          id="txConfirmations"
          onChange={(e) => setConfirmations(e.currentTarget.valueAsNumber)}
          type="number"
          value={confirmations}
        />
      </div>
      <div>
        <button disabled={hash.trim().length === 0} type="submit">
          Add recent transaction
        </button>
      </div>
    </form>
  );
}

export default Example;
