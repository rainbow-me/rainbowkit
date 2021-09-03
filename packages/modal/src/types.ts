import type { Wallet } from '@rainbowkit/utils'
import { Dispatch } from 'react'

export interface ModalProps {
  wallets: Wallet[]
  connect: (w: Wallet) => Promise<void>

  isConnecting: boolean
  setConnecting: Dispatch<boolean>

  terms?: JSX.Element
}
