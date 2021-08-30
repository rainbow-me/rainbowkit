import { Web3Provider } from '@ethersproject/providers'
import React, { useState, useEffect } from 'react'
import styles from '../../styles/AccountInfo.module.css'
import { CopyAddressButton } from './CopyAddressButton'
import { ExplorerLink, ExplorerProps } from './ExplorerLink'

export interface AccountInfoProps {
  address: string
  wallet?: Partial<{ name: string; iconUrl: string }>
  explorer?: boolean | ((props: ExplorerProps) => JSX.Element)
  copyAddress: boolean | ((props: { address: string }) => JSX.Element)
  provider?: Web3Provider
  chainId?: number
  explorerUrl?: string
}

export const AccountInfo = ({
  address,
  wallet,
  chainId: initialChainId,
  provider,
  explorer: Explorer,
  copyAddress: CopyAddress,
  explorerUrl
}: AccountInfoProps) => {
  const [chainId, setChainId] = useState(initialChainId)

  useEffect(() => {
    if (!initialChainId) {
      if (provider) {
        provider.getNetwork().then(({ chainId }) => setChainId(chainId))
      } else {
        setChainId(1)
      }
    }
  }, [provider, initialChainId])

  return (
    <div className={styles.container}>
      {wallet.name && (
        <div>
          Connected with <strong>{wallet.name}</strong>
        </div>
      )}
      <div className={styles.address}>
        {wallet.iconUrl && <img className={styles.icon} src={wallet.iconUrl} title={wallet.name} alt={wallet.name} />}{' '}
        {address}
      </div>
      <div>
        <>
          {(Explorer === undefined || Explorer === true) && <ExplorerLink {...{ address, chainId, explorerUrl }} />}
          {Explorer && typeof Explorer !== 'boolean' && <Explorer {...{ address, chainId, explorerUrl }} />}
        </>
        <>{(CopyAddress === undefined || CopyAddress === true) && <CopyAddressButton {...{ address }} />}</>
        <>{Explorer && typeof CopyAddress !== 'boolean' && <CopyAddress {...{ address }} />}</>
      </div>
    </div>
  )
}
