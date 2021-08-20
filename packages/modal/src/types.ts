import type { AbstractConnector } from '@web3-react/abstract-connector'
import { Dispatch } from 'react'

export type Wallet = { name: string; hidden?: boolean; options?: Record<string, any> }

export interface ModalProps {
  wallets: Wallet[]
  connect: (w: Wallet) => Promise<void>

  isConnecting: boolean
  setConnecting: Dispatch<boolean>
}
