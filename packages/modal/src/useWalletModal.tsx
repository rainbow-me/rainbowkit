import React, { useEffect } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { Modal as ModalUI } from './components/Modal'
import { isAuthorized } from '@rainbowkit/utils'
import type { Wallet } from '@rainbowkit/utils'
import type { ModalProps } from './types'
import { createConnector } from './utils'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'

export type WalletInterface = Omit<
  Web3ReactContextInterface<Web3Provider>,
  'activate' | 'deactivate' | 'library' | 'account' | 'active'
> & {
  Modal?: () => JSX.Element
  connect: () => void
  disconnect: () => void
  provider: Web3Provider
  isConnected: boolean
  isConnecting: boolean
  address: string
}

export const useWalletModal = ({
  modal: ModalComponent,
  chains,
  wallets: selectedWallets,
  terms
}: {
  modal?: React.ComponentType<ModalProps> | false
  wallets: (Wallet | string)[]
  chains?: (string | number)[]
  terms?: JSX.Element
}): WalletInterface => {
  const {
    activate,
    deactivate,
    library: provider,
    active: isConnected,
    account: address,
    ...web3ReactProps
  } = useWeb3React<Web3Provider>()

  const wallets = selectedWallets.map((w) => {
    if (typeof w === 'string') {
      switch (w) {
        case 'metamask':
          return {
            name: w,
            hidden: false,
            options: {},
            iconUrl: '/icons/rainbow.png'
          }
        default:
          return {
            name: w,
            hidden: false,
            options: {}
          }
      }
    }

    return w
  }) as Wallet[]

  const connectToWallet = async (name: string) => {
    const options = wallets.find((w) => w.name === name)?.options || {}

    const { instance } = await createConnector({ name: name, chains, options })

    await activate(instance)
  }

  useEffect(() => {
    const walletName = localStorage.getItem('rk-last-wallet')

    if (walletName && !isConnected && window.ethereum && selectedWallets.includes(walletName)) {
      isAuthorized().then((yes) => {
        if (yes) connectToWallet(walletName)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    return { Modal, connect, disconnect, provider, isConnected, isConnecting, address, ...web3ReactProps }
  } else {
    return { connect, disconnect, provider, isConnected, isConnecting, address, ...web3ReactProps }
  }
}
