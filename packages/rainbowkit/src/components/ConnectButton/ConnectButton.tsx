import React, { useContext, useEffect, useState } from 'react';
import {
  type ResponsiveValue,
  mapResponsiveValue,
  normalizeResponsiveValue,
} from '../../css/sprinkles.css';
import { touchableStyles } from '../../css/touchableStyles';
import { useConnectionStatus } from '../../hooks/useConnectionStatus';
import { isMobile } from '../../utils/isMobile';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Avatar } from '../Avatar/Avatar';
import { Box } from '../Box/Box';
import { DropdownIcon } from '../Icons/Dropdown';
import { I18nContext } from '../RainbowKitProvider/I18nContext';
import { useRainbowKitChains } from '../RainbowKitProvider/RainbowKitChainContext';
import { useShowBalance } from '../RainbowKitProvider/ShowBalanceContext';
import { ConnectButtonRenderer } from './ConnectButtonRenderer';

type AccountStatus = 'full' | 'avatar' | 'address';
type ChainStatus = 'full' | 'icon' | 'name' | 'none';

export interface ConnectButtonProps {
  accountStatus?: ResponsiveValue<AccountStatus>;
  showBalance?: ResponsiveValue<boolean>;
  chainStatus?: ResponsiveValue<ChainStatus>;
  label?: string;
}

const defaultProps = {
  accountStatus: 'full',
  chainStatus: { largeScreen: 'full', smallScreen: 'icon' },
  label: 'Connect Wallet',
  showBalance: { largeScreen: true, smallScreen: false },
} as const;

export function ConnectButton({
  accountStatus = defaultProps.accountStatus,
  chainStatus = defaultProps.chainStatus,
  label = defaultProps.label,
  showBalance = defaultProps.showBalance,
}: ConnectButtonProps) {
  const chains = useRainbowKitChains();
  const connectionStatus = useConnectionStatus();
  const { setShowBalance } = useShowBalance();
  const [ready, setReady] = useState(false);

  const { i18n } = useContext(I18nContext);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setShowBalance(showBalance);
    if (!ready) setReady(true);
  }, [showBalance, setShowBalance]);

  return ready ? (
    <ConnectButtonRenderer>
      {({
        account,
        chain,
        mounted,
        openAccountModal,
        openChainModal,
        openConnectModal,
      }) => {
        const ready = mounted && connectionStatus !== 'loading';
        const unsupportedChain = chain?.unsupported ?? false;

        return (
          <Box
            display="flex"
            gap="12"
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {ready && account && connectionStatus === 'connected' ? (
              <>
                {chain && (chains.length > 1 || unsupportedChain) && (
                  <Box
                    alignItems="center"
                    aria-label="Chain Selector"
                    as="button"
                    background={
                      unsupportedChain
                        ? 'connectButtonBackgroundError'
                        : 'connectButtonBackground'
                    }
                    borderRadius="connectButton"
                    boxShadow="connectButton"
                    className={touchableStyles({
                      active: 'shrink',
                      hover: 'grow',
                    })}
                    color={
                      unsupportedChain
                        ? 'connectButtonTextError'
                        : 'connectButtonText'
                    }
                    display={mapResponsiveValue(chainStatus, (value) =>
                      value === 'none' ? 'none' : 'flex',
                    )}
                    fontFamily="body"
                    fontWeight="bold"
                    gap="6"
                    key={
                      // Force re-mount to prevent CSS transition
                      unsupportedChain ? 'unsupported' : 'supported'
                    }
                    onClick={openChainModal}
                    paddingX="10"
                    paddingY="8"
                    testId={
                      unsupportedChain ? 'wrong-network-button' : 'chain-button'
                    }
                    transition="default"
                    type="button"
                  >
                    {unsupportedChain ? (
                      <Box
                        alignItems="center"
                        display="flex"
                        height="24"
                        paddingX="4"
                      >
                        {i18n.t('connect_wallet.wrong_network.label')}
                      </Box>
                    ) : (
                      <Box alignItems="center" display="flex" gap="6">
                        {chain.hasIcon ? (
                          <Box
                            display={mapResponsiveValue(chainStatus, (value) =>
                              value === 'full' || value === 'icon'
                                ? 'block'
                                : 'none',
                            )}
                            height="24"
                            width="24"
                          >
                            <AsyncImage
                              alt={chain.name ?? 'Chain icon'}
                              background={chain.iconBackground}
                              borderRadius="full"
                              height="24"
                              src={chain.iconUrl}
                              width="24"
                            />
                          </Box>
                        ) : null}
                        <Box
                          display={mapResponsiveValue(chainStatus, (value) => {
                            if (value === 'icon' && !chain.iconUrl) {
                              return 'block'; // Show the chain name if there is no iconUrl
                            }

                            return value === 'full' || value === 'name'
                              ? 'block'
                              : 'none';
                          })}
                        >
                          {chain.name ?? chain.id}
                        </Box>
                      </Box>
                    )}
                    <DropdownIcon />
                  </Box>
                )}

                {!unsupportedChain && (
                  <Box
                    alignItems="center"
                    as="button"
                    background="connectButtonBackground"
                    borderRadius="connectButton"
                    boxShadow="connectButton"
                    className={touchableStyles({
                      active: 'shrink',
                      hover: 'grow',
                    })}
                    color="connectButtonText"
                    display="flex"
                    fontFamily="body"
                    fontWeight="bold"
                    onClick={openAccountModal}
                    testId="account-button"
                    transition="default"
                    type="button"
                  >
                    {account.displayBalance && (
                      <Box
                        display={mapResponsiveValue(showBalance, (value) =>
                          value ? 'block' : 'none',
                        )}
                        padding="8"
                        paddingLeft="12"
                      >
                        {account.displayBalance}
                      </Box>
                    )}
                    <Box
                      background={
                        normalizeResponsiveValue(showBalance)[
                          isMobile() ? 'smallScreen' : 'largeScreen'
                        ]
                          ? 'connectButtonInnerBackground'
                          : 'connectButtonBackground'
                      }
                      borderColor="connectButtonBackground"
                      borderRadius="connectButton"
                      borderStyle="solid"
                      borderWidth="2"
                      color="connectButtonText"
                      fontFamily="body"
                      fontWeight="bold"
                      paddingX="8"
                      paddingY="6"
                      transition="default"
                    >
                      <Box
                        alignItems="center"
                        display="flex"
                        gap="6"
                        height="24"
                      >
                        <Box
                          display={mapResponsiveValue(accountStatus, (value) =>
                            value === 'full' || value === 'avatar'
                              ? 'block'
                              : 'none',
                          )}
                        >
                          <Avatar
                            address={account.address}
                            imageUrl={account.ensAvatar}
                            loading={account.hasPendingTransactions}
                            size={24}
                          />
                        </Box>

                        <Box alignItems="center" display="flex" gap="6">
                          <Box
                            display={mapResponsiveValue(
                              accountStatus,
                              (value) =>
                                value === 'full' || value === 'address'
                                  ? 'block'
                                  : 'none',
                            )}
                          >
                            {account.displayName}
                          </Box>
                          <DropdownIcon />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
              </>
            ) : (
              <Box
                as="button"
                background="accentColor"
                borderRadius="connectButton"
                boxShadow="connectButton"
                className={touchableStyles({
                  active: 'shrink',
                  hover: 'grow',
                })}
                color="accentColorForeground"
                fontFamily="body"
                fontWeight="bold"
                height="40"
                key="connect"
                onClick={openConnectModal}
                paddingX="14"
                testId="connect-button"
                transition="default"
                type="button"
              >
                {mounted && label === 'Connect Wallet'
                  ? i18n.t('connect_wallet.label')
                  : label}
              </Box>
            )}
          </Box>
        );
      }}
    </ConnectButtonRenderer>
  ) : (
    <></>
  );
}

ConnectButton.__defaultProps = defaultProps;
ConnectButton.Custom = ConnectButtonRenderer;
