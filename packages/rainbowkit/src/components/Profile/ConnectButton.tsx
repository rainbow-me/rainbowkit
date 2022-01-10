import React, { Dispatch } from 'react'
import { Box } from '../Box/Box'
import { PillStyles } from './Profile.css'

export const ConnectButton = ({ setConnecting }: { setConnecting: Dispatch<boolean> }) => (
  <Box
    as="button"
    padding="8"
    color="connectButtonText"
    fontFamily="body"
    borderRadius="connectButton"
    className={PillStyles}
    onClick={() => setConnecting(true)}
  >
    Connect
  </Box>
)
