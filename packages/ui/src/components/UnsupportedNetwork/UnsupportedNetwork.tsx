import { ModalTitle, ModalOverlay } from '@rainbow-me/kit-modal'
import { chainIdToName } from '@rainbow-me/kit-utils'
import React from 'react'
import { UnsupportedNetworkModalBodyClassName, UnsupportedNetworkModalTextClassName } from './UnsupportedNetwork.css'

export interface UnsupportedNetworkProps {
  chainId?: number
  chainName?: string
  supportedChainIds: number[]
  isVisible: boolean
}

export const UnsupportedNetwork = ({ chainId, chainName, supportedChainIds, isVisible }: UnsupportedNetworkProps) => {
  return (
    <ModalOverlay isConnecting={isVisible}>
      <div className={UnsupportedNetworkModalBodyClassName}>
        <ModalTitle>Unsupported Network: {chainName || chainId ? chainIdToName(chainId) : 'Unknown'}.</ModalTitle>
        <p className={UnsupportedNetworkModalTextClassName}>
          Please switch to one of the supported networks: {supportedChainIds.map(chainIdToName).join(', ')}
        </p>
      </div>
    </ModalOverlay>
  )
}
