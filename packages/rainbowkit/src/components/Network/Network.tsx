import React, { useState } from 'react';
import { useNetwork } from 'wagmi';
import { Box } from '../Box/Box';
import { DropdownIcon } from '../Icons/Dropdown';
import { NetworkModal } from '../NetworkModal/NetworkModal';
import { useChainIconUrlsById } from '../RainbowKitProvider/ChainIconsContext';

export function Network() {
  const [open, setOpen] = useState(false);
  const [{ data: networkData }] = useNetwork();

  const chainIconUrlsById = useChainIconUrlsById();

  if (!networkData || !networkData.chain) {
    return null;
  }

  const currentChainIconUrl = chainIconUrlsById[networkData.chain.id];

  return (
    <>
      <div>
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
          onClick={() => setOpen(true)}
          padding="10"
          type="button"
        >
          <Box alignItems="center" display="flex" gap="4">
            {currentChainIconUrl ? (
              <img
                alt={networkData.chain.name ?? 'Chain icon'}
                height="16"
                src={currentChainIconUrl}
                width="16"
              />
            ) : null}
            <div>
              {networkData.chain.name ?? networkData.chain.id}{' '}
              {networkData.chain?.unsupported && '(unsupported)'}
            </div>
          </Box>
          {networkData.chain?.unsupported && '(unsupported)'}
          <DropdownIcon />
        </Box>
      </div>

      <NetworkModal onClose={() => setOpen(false)} open={open} />
    </>
  );
}
