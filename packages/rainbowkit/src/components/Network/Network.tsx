import React, { useState } from 'react';
import { useNetwork } from 'wagmi';
import { Box } from '../Box/Box';
import { DropdownIcon } from '../Icons/Dropdown';
import { NetworkModal } from '../NetworkModal/NetworkModal';
import { useChainIconUrlsById } from '../RainbowKitProvider/ChainIconsContext';
import { NetworkClassName } from './Network.css';

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
          className={NetworkClassName}
          color="connectButtonText"
          display="flex"
          fontFamily="body"
          fontWeight="bold"
          onClick={() => setOpen(true)}
          paddingX="10"
          paddingY="8"
          type="button"
        >
          <Box alignItems="center" display="flex" gap="8" height="24">
            {currentChainIconUrl ? (
              <img
                alt={networkData.chain.name ?? 'Chain icon'}
                height="24"
                src={currentChainIconUrl}
                width="24"
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
