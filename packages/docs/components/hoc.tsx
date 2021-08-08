import { useInjectedConnector, withWeb3React } from '@rainbowkit/core'
import { Box, Button } from '@chakra-ui/react'
import React from 'react'

export const HOC = ({ children }) => {
  return withWeb3React(children)
}
