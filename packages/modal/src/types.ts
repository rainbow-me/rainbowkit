import type { Wallet } from '@rainbowkit/utils'
import { Dispatch } from 'react'

export interface ModalProps {
  wallets: Wallet[]
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
