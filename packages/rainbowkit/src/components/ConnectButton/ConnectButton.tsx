import React from 'react';
import { increaseHitAreaForHoverTransform } from '../../css/increaseHitAreaForHoverTransform.css';
import {
  mapResponsiveValue,
  normalizeResponsiveValue,
  ResponsiveValue,
} from '../../css/sprinkles.css';
import { isMobile } from '../../utils/isMobile';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Avatar } from '../Avatar/Avatar';
import { Box } from '../Box/Box';
import { DropdownIcon } from '../Icons/Dropdown';
import { useRainbowKitChains } from '../RainbowKitProvider/RainbowKitChainContext';
import { ConnectButtonRenderer } from './ConnectButtonRenderer';

type AccountStatus = 'full' | 'avatar' | 'address';
type ChainStatus = 'full' | 'icon' | 'name' | 'none';

export interface ConnectButtonProps {
  accountStatus?: ResponsiveValue<AccountStatus>;
  showBalance?: ResponsiveValue<boolean>;
  chainStatus?: ResponsiveValue<ChainStatus>;
}

const defaultProps = {
  accountStatus: 'full',
  chainStatus: { largeScreen: 'full', smallScreen: 'icon' },
  showBalance: { largeScreen: true, smallScreen: false },
} as const;

export function ConnectButton({
  accountStatus = defaultProps.accountStatus,
  chainStatus = defaultProps.chainStatus,
  showBalance = defaultProps.showBalance,
}: ConnectButtonProps) {
  const chains = useRainbowKitChains();

  return (
    <ConnectButtonRenderer>
      {({
        account,
        chain,
        mounted,
        openAccountModal,
        openChainModal,
        openConnectModal,
      }) => {
        const unsupportedChain = chain?.unsupported ?? false;

        return (
          <Box
            display="flex"
            gap="12"
            {...(!mounted && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {mounted && account ? (
              <>
                {chain && (chains.length > 1 || unsupportedChain) && (
                  <Box
                    as="button"
                    borderRadius="connectButton"
                    className={increaseHitAreaForHoverTransform.grow}
                    display="flex"
                    key={unsupportedChain ? 'unsupported' : 'supported'} // Force re-mount to prevent CSS transition
                    onClick={openChainModal}
                    type="button"
                  >
                    <Box
                      alignItems="center"
                      background={
                        unsupportedChain
                          ? 'connectButtonBackgroundError'
                          : 'connectButtonBackground'
                      }
                      borderRadius="connectButton"
                      boxShadow="connectButton"
                      color={
                        unsupportedChain
                          ? 'connectButtonTextError'
                          : 'connectButtonText'
                      }
                      display={mapResponsiveValue(chainStatus, value =>
                        value === 'none' ? 'none' : 'flex'
                      )}
                      fontFamily="body"
                      fontWeight="bold"
                      gap="6"
                      paddingX="10"
                      paddingY="8"
                      transform={{ active: 'shrink', hover: 'grow' }}
                      transition="default"
                    >
                      {unsupportedChain ? (
                        <Box
                          alignItems="center"
                          display="flex"
                          height="24"
                          paddingX="4"
                        >
                          Wrong network
                        </Box>
                      ) : (
                        <Box alignItems="center" display="flex" gap="6">
                          {chain.hasIcon ? (
                            <Box
                              display={mapResponsiveValue(chainStatus, value =>
                                value === 'full' || value === 'icon'
                                  ? 'block'
                                  : 'none'
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
                            display={mapResponsiveValue(chainStatus, value => {
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
                  </Box>
                )}

                {!unsupportedChain && (
                  <Box
                    as="button"
                    borderRadius="connectButton"
                    className={increaseHitAreaForHoverTransform.grow}
                    display="flex"
                    onClick={openAccountModal}
                    type="button"
                  >
                    <Box
                      alignItems="center"
                      background="connectButtonBackground"
                      borderRadius="connectButton"
                      boxShadow="connectButton"
                      color="connectButtonText"
                      display="flex"
                      fontFamily="body"
                      fontWeight="bold"
                      transform={{ active: 'shrink', hover: 'grow' }}
                      transition="default"
                    >
                      {account.displayBalance && (
                        <Box
                          display={mapResponsiveValue(showBalance, value =>
                            value ? 'block' : 'none'
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
                            display={mapResponsiveValue(accountStatus, value =>
                              value === 'full' || value === 'avatar'
                                ? 'block'
                                : 'none'
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
                                value =>
                                  value === 'full' || value === 'address'
                                    ? 'block'
                                    : 'none'
                              )}
                            >
                              {account.displayName}
                            </Box>
                            <DropdownIcon />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
              </>
            ) : (
              <Box
                as="button"
                borderRadius="connectButton"
                className={increaseHitAreaForHoverTransform.grow}
                display="flex"
                key="connect"
                onClick={openConnectModal}
                type="button"
              >
                <Box
                  background="accentColor"
                  borderRadius="connectButton"
                  boxShadow="connectButton"
                  color="accentColorForeground"
                  fontFamily="body"
                  fontWeight="bold"
                  paddingX="14"
                  paddingY="10"
                  transform={{ active: 'shrink', hover: 'grow' }}
                  transition="default"
                >
                  Connect Wallet
                </Box>
              </Box>
            )}
          </Box>
        );
      }}
    </ConnectButtonRenderer>
  );
}

ConnectButton.__defaultProps = defaultProps;
ConnectButton.Custom = ConnectButtonRenderer;
