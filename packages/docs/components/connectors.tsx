import { useInjectedConnector, withWeb3React } from '@rainbowkit/core'
import { Box, Button } from '@chakra-ui/react'
import React from 'react'

export const MetaMask = withWeb3React(() => {
  const { isConnected, connect, disconnect, address } = useInjectedConnector({ connectOnMount: true })

  return (
    <Box p="2rem">
      {isConnected ? (
        <div>
          <p>Address: {address}</p>
          <Button onClick={disconnect}>Disconnect</Button>
        </div>
      ) : (
        <div>
          <Button onClick={connect}>Connect</Button>
        </div>
      )}
    </Box>
  )
})
