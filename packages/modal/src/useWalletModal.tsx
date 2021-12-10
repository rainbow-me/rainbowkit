import React, { useEffect } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { Modal as ModalUI } from './components/Modal'
import type { Wallet } from '@rainbow-me/kit-utils'
import type { UseWalletModalOptions } from './types'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import type { Web3ReactContextInterface } from '@web3-react/core/dist/types'
export type WalletInterface = Omit<
  Web3ReactContextInterface<Web3Provider>,
  'activate' | 'deactivate' | 'library' | 'account' | 'active'
> & {
  Modal?: () => JSX.Element
  provider: Web3Provider | undefined
  address: string | undefined | null
  state: {
    connect: () => void
    disconnect: () => void
    isConnected: boolean
    isConnecting: boolean
  }
}

export const useWalletModal = ({ modal: ModalComponent, wallets, terms }: UseWalletModalOptions): WalletInterface => {
  const {
    activate,
    deactivate,
    library: provider,
    active: isConnected,
    account: address,
    error,
    setError,
    ...web3ReactProps
  } = useWeb3React<Web3Provider>()

  const [isRejected, setRejected] = useState(false)

  const connectToWallet = async (name: string) => {
    const { connector } = wallets.find((w) => w.name === name) || {}

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined
    }

    if (!isConnected)
      try {
        await activate(connector, undefined, true)
      } catch (error) {
        setError(error)
        if (error.name === 'UserRejectedRequestError') {
          setRejected(true)
        }
      }
  }

  useEffect(() => {
    const walletName = localStorage.getItem('rk-last-wallet')

    if (!isRejected && walletName && !!wallets.find((w) => w.name === walletName)) {
      connectToWallet(walletName)
    }
  }, [])

  useEffect(() => {
    if (isRejected) {
      localStorage.removeItem('rk-last-wallet')
    }
  }, [isRejected])

  const [isConnecting, setConnecting] = useState(false)

  const connect = () => {
    setConnecting(true)
  }

  const activateConnector = async (c: Wallet) => {
    await connectToWallet(c.name)

    if (!isRejected) {
      localStorage.setItem('rk-last-wallet', c.name)

      return setConnecting(false)
    }
  }

  const disconnect = () => {
    localStorage.removeItem('rk-last-wallet')
    deactivate()
  }

  if (typeof ModalComponent === 'undefined') {
    const Modal = () => (
      <ModalUI connect={activateConnector} {...{ wallets, isConnecting, setConnecting, terms, error }} />
    )

    return {
      Modal,
      state: { isConnected, isConnecting, connect, disconnect },
      provider,
      address,
      error,
      setError,
      ...web3ReactProps
    }
  } else {
    return {
      state: { connect, disconnect, isConnected, isConnecting },
      error,
      setError,
      provider,
      address,
      ...web3ReactProps
    }
  }
}
