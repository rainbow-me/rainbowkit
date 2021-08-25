import type { Wallet } from '@rainbowkit/utils'
import { Dispatch } from 'react'
import type { ExternalProvider } from '@ethersproject/providers'

export interface ModalProps {
  wallets: Wallet[]
  connect: (w: Wallet) => Promise<void>

  isConnecting: boolean
  setConnecting: Dispatch<boolean>
}
