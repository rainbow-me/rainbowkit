import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import { Box } from '../Box/Box';
import { DropdownIcon } from '../Icons/Dropdown';
import { ConnectButtonRenderer } from './ConnectButtonRenderer';

export interface ConnectButtonProps {
  accountStatus?: 'full' | 'avatar' | 'address';
  showBalance?: boolean;
  chainStatus?: 'full' | 'icon' | 'name' | 'none';
}

export function ConnectButton({
  accountStatus = 'full',
  chainStatus = 'full',
  showBalance = true,
}: ConnectButtonProps) {
  return (
    <ConnectButtonRenderer>
      {({
        account,
        accountModalOpen,
        chain,
        connectModalOpen,
        openAccountModal,
        openChainModal,
        openConnectModal,
      }) => {
        const showChains = chainStatus !== 'none';
        const showChainIcon = chainStatus === 'icon' || chainStatus === 'full';
        const showChainName =
          chainStatus === 'name' ||
          chainStatus === 'full' ||
          (chainStatus === 'icon' && !chain?.iconUrl); // If there is no iconUrl, show the name

        const showAvatar =
          accountStatus === 'avatar' || accountStatus === 'full';
        const showAddress =
          accountStatus === 'address' || accountStatus === 'full';

        return account ? (
          <Box display="flex" gap="12">
            {showChains && chain && (
              <Box
                alignItems="center"
                as="button"
                background={
                  chain.unsupported
                    ? 'connectButtonBackgroundError'
                    : 'connectButtonBackground'
                }
                borderRadius="connectButton"
                boxShadow="connectButton"
                color={
                  chain.unsupported
                    ? 'connectButtonTextError'
                    : 'connectButtonText'
                }
                display="flex"
                fontFamily="body"
                fontWeight="bold"
                gap="6"
                onClick={openChainModal}
                paddingX="10"
                paddingY="8"
                transform={{ active: 'shrink', hover: 'grow' }}
                transition="default"
                type="button"
              >
                {chain.unsupported ? (
                  <Box>Invalid network</Box>
                ) : (
                  <Box alignItems="center" display="flex" gap="4">
                    {showChainIcon && chain.iconUrl ? (
                      <img
                        alt={chain.name ?? 'Chain icon'}
                        height="24"
                        src={chain.iconUrl}
                        width="24"
                      />
                    ) : null}
                    {showChainName && <div>{chain.name ?? chain.id}</div>}
                  </Box>
                )}
                <DropdownIcon />
              </Box>
            )}

            <Box
              alignItems="center"
              as="button"
              background="connectButtonBackground"
              borderRadius="connectButton"
              boxShadow="connectButton"
              color="connectButtonText"
              display="flex"
              fontFamily="body"
              fontWeight="bold"
              onClick={openAccountModal}
              transform={{ active: 'shrink', hover: 'grow' }}
              transition="default"
              type="button"
            >
              {showBalance && account.displayBalance && (
                <Box padding="8" paddingLeft="12">
                  {account.displayBalance}
                </Box>
              )}
              <Box
                background="connectButtonInnerBackground"
                borderColor={
                  accountModalOpen ? 'accentColor' : 'connectButtonBackground'
                }
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
                <Box alignItems="center" display="flex" gap="6" height="24">
                  {showAvatar && (
                    <Avatar
                      address={account.address}
                      imageUrl={account.ensAvatar}
                      size={24}
                    />
                  )}

                  <Box alignItems="center" display="flex" gap="6">
                    {showAddress && <div>{account.displayName}</div>}
                    <DropdownIcon />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            background="connectButtonBackground"
            borderRadius="connectButton"
            transform={{ active: 'shrink', hover: 'grow' }}
            transition="default"
          >
            <Box
              as="button"
              background="connectButtonInnerBackground"
              borderColor={
                connectModalOpen ? 'accentColor' : 'connectButtonBackground'
              }
              borderRadius="connectButton"
              borderStyle="solid"
              borderWidth="2"
              boxShadow="connectButton"
              color="connectButtonText"
              fontFamily="body"
              fontWeight="bold"
              onClick={openConnectModal}
              padding="8"
              type="button"
            >
              Connect Wallet
            </Box>
          </Box>
        );
      }}
    </ConnectButtonRenderer>
  );
}

ConnectButton.Custom = ConnectButtonRenderer;
