import React, { useEffect, useRef } from 'react'
import type { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { Modal as ModalUI, ModalProps } from './Modal'
import type { Wallet } from '@rainbow-me/kit-utils'
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

export interface UseWalletModalOptions {
  modal?: React.ComponentType<ModalProps> | false
  wallets: Wallet[]
  chains?: (string | number)[]
  terms?: JSX.Element
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
    connector,
    ...web3ReactProps
  } = useWeb3React<Web3Provider>()

  const isRejected = useRef(false)

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
        setError(error as Error)

        if (error instanceof Error && error.name === 'UserRejectedRequestError') {
          isRejected.current = true
          localStorage.removeItem('rk-last-wallet')
        }
      }
  }

  useEffect(() => {
    const walletName = localStorage.getItem('rk-last-wallet')

    if (!isRejected.current && walletName && !!wallets.find((w) => w.name === walletName)) {
      connectToWallet(walletName)
    }
  }, [])

  const [isConnecting, setConnecting] = useState(false)

  const connect = () => {
    setConnecting(true)
  }

  const activateConnector = async (c: Wallet) => {
    await connectToWallet(c.name)

    if (!isRejected.current) {
      localStorage.setItem('rk-last-wallet', c.name)

      return setConnecting(false)
    }
  }

  const disconnect = () => {
    localStorage.removeItem('rk-last-wallet')
    deactivate()
    if (connector instanceof WalletConnectConnector) {
      // walletconnect connector needs to be closed manually
      // see web3-react issues: https://github.com/NoahZinsmeister/web3-react/issues?q=deactivate
      connector.close()
    }
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
