import React, { useEffect, useState } from 'react'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useConnector } from '../connectors/common'

export interface UseWalletOptions {
  wallets: { name: string; connector: AbstractConnector }[]
}

export const useWallet = ({ wallets }: UseWalletOptions) => {
  const [isModalOpened, setModalState] = useState(false)
}
