import { css } from '@linaria/core'
import { StyledModal, ModalTitle, ModalOverlay } from '@rainbow-me/kit-modal'
import { chainIdToName } from '@rainbow-me/kit-utils'
import React from 'react'

export interface UnsupportedNetworkProps {
  chainId?: number
  chainName?: string
  supportedChainIds: number[]
  isVisible: boolean
}

export const UnsupportedNetwork = ({ chainId, chainName, supportedChainIds, isVisible }: UnsupportedNetworkProps) => {
  return (
    <ModalOverlay $isConnecting={isVisible}>
      <div
        className={css`
          height: max-content;
          max-height: 525px;
          width: 390px;
          padding: 24px;
          position: relative;
          background: #ffffff;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          p {
            margin-bottom: 0;
            line-height: 1.5;
          }
        `}
      >
        <ModalTitle>Unsupported Network: {chainName || chainIdToName(chainId)}.</ModalTitle>
        <p>Please switch to one of the supported networks: {supportedChainIds.map(chainIdToName).join(', ')}</p>
      </div>
    </ModalOverlay>
  )
}
