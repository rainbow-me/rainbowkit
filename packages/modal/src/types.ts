import type { Wallet } from '@rainbow-me/kit-utils'
import { Dispatch } from 'react'
import { UserRejectedRequestError } from '@web3-react/injected-connector'
import { UnsupportedChainIdError } from '@web3-react/core'

export interface ModalProps {
  wallets: Wallet[]
  error?: UserRejectedRequestError | UnsupportedChainIdError | Error
  connect: (w: Wallet) => Promise<void>

  isConnecting: boolean
  setConnecting: Dispatch<boolean>

  terms?: JSX.Element
  classNames?: Partial<{
    modal: string
    close: string
    overlay: string
    hidden: string
    title: string
    caption: string
    wallets: string
    terms: string
  }>
}

export interface UseWalletModalOptions {
  modal?: React.ComponentType<ModalProps> | false
  wallets: Wallet[]
  chains?: (string | number)[]
  terms?: JSX.Element
}
