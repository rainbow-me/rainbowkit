import React, { Dispatch } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { Modal as ModalUI } from './components/Modal'
import { ModalProps, Connector } from './types'

export const useWalletModal = ({
  modal: ModalComponent,
  connectors
}: {
  modal?: React.ComponentType<ModalProps> | false
  connectors: Connector[]
}) => {
  const {
    activate,
    deactivate: disconnect,
    library: provider,
    active: isConnected,
    account: address
  } = useWeb3React<Web3Provider>()

  const [isConnecting, setConnecting] = useState(false)

  const connect = () => {
    setConnecting(true)
  }

  if (typeof ModalComponent === 'undefined') {
    const Modal = () => (
      <ModalUI connectors={connectors} connect={activate} isConnecting={isConnecting} setConnecting={setConnecting} />
    )

    return { Modal, connect, disconnect, provider, isConnected, isConnecting, address }
  } else {
    return { connect, disconnect, provider, isConnected, isConnecting, address }
  }
}
