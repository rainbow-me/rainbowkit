import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Box } from '../Box/Box';
import { Connect } from './Connect';
import { Network } from './Network';
import { Profile } from './Profile';

export function ConnectButton() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });

  if (!isMounted) {
    return null;
  }

  return accountData ? (
    <Box display="flex" gap="12">
      <Profile />
      <Network />
    </Box>
  ) : (
    <Connect />
  );
}
