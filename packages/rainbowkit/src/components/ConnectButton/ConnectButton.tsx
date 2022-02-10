import React from 'react';
import { useAccount } from 'wagmi';
import { useIsMounted } from '../../hooks/useIsMounted';
import { Box } from '../Box/Box';
import { Network } from '../Network/Network';
import { Profile } from '../Profile/Profile';
import { Connect } from './Connect';

export function ConnectButton() {
  const isMounted = useIsMounted();

  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });

  if (!isMounted) {
    return null;
  }

  return accountData ? (
    <Box display="flex" gap="12">
      <Network />
      <Profile />
    </Box>
  ) : (
    <Connect />
  );
}
