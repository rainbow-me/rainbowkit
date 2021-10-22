import React, { useEffect } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { Modal as ModalUI } from './components/Modal'
import type { Wallet } from '@rainbow-me/kit-utils'
import type { UseWalletModalOptions } from './types'

import { Web3ReactContextInterface } from '@web3-react/core/dist/types'

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
    ...web3ReactProps
  } = useWeb3React<Web3Provider>()

  const connectToWallet = async (name: string) => {
    const { connector } = wallets.find((w) => w.name === name) || {}

    if (!isConnected) await activate(connector)
  }

  useEffect(() => {
    const walletName = localStorage.getItem('rk-last-wallet')

    if (walletName && !isConnected && !!wallets.find((w) => w.name === walletName)) {
      connectToWallet(walletName)
    }
  }, [])

  const [isConnecting, setConnecting] = useState(false)

  const connect = () => {
    setConnecting(true)
  }

  const activateConnector = async (c: Wallet) => {
    localStorage.setItem('rk-last-wallet', c.name)
    await connectToWallet(c.name)
    return setConnecting(false)
  }

  const disconnect = () => {
    localStorage.removeItem('rk-last-wallet')
    deactivate()
  }

  if (typeof ModalComponent === 'undefined') {
    const Modal = () => <ModalUI connect={activateConnector} {...{ wallets, isConnecting, setConnecting, terms }} />

    return { Modal, state: { isConnected, isConnecting, connect, disconnect }, provider, address, ...web3ReactProps }
  } else {
    return { state: { connect, disconnect, isConnected, isConnecting }, provider, address, ...web3ReactProps }
  }
}
