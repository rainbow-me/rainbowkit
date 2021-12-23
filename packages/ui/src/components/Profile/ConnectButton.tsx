import React from 'react'
import { Box } from '../Box'
import { PillStyles } from './Profile.css'

export const ConnectButton = ({ connect }: { connect: () => void }) => (
  <Box
    as="button"
    padding="8"
    color="connectButtonText"
    fontFamily="body"
    borderRadius="connectButton"
    className={PillStyles}
    onClick={() => connect()}
  >
    Connect
  </Box>
)
