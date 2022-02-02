import React, { Dispatch } from 'react';
import { Box } from '../Box/Box';
import { PillStyles } from './Profile.css';

export const ConnectButton = ({
  setConnecting,
}: {
  setConnecting: Dispatch<boolean>;
}) => (
  <Box
    as="button"
    borderRadius="connectButton"
    className={PillStyles}
    color="connectButtonText"
    fontFamily="body"
    onClick={() => setConnecting(true)}
    padding="8"
  >
    Connect
  </Box>
);
