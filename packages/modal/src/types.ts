import type { AbstractConnector } from '@web3-react/abstract-connector'
import { Dispatch } from 'react'

export type Wallet = { name: string; hidden?: boolean; options: Record<string, any> }

export type Chain = number | { id: number; name: string }

export type Connector = { connector: AbstractConnector; name: string; hidden?: boolean }

export interface WalletModalOptions {
  wallets: (Wallet | string)[]
  chains: Chain[]
}
export interface ModalProps {
  connectors: Connector[]
  connect: (w: AbstractConnector) => Promise<void>

  isConnecting: boolean
  setConnecting: Dispatch<boolean>
}
