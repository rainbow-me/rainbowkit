import { Web3Provider } from '@ethersproject/providers'
import React, { useState, useEffect } from 'react'
import styles from '../../styles/AccountInfo.module.css'
import { CopyAddressButton } from './CopyAddressButton'
import { ExplorerLink, ExplorerProps } from './ExplorerLink'
import { useChainId } from '@rainbowkit/hooks'

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
  const chainId = useChainId({ provider, initialChainId })

  return (
    <div className={styles.container}>
      {wallet?.name && (
        <div>
          Connected with <strong>{wallet.name}</strong>
        </div>
      )}
      <div className={styles.address}>
        {wallet?.iconUrl && <img className={styles.icon} src={wallet.iconUrl} title={wallet.name} alt={wallet.name} />}{' '}
        {address}
      </div>
      <div>
        {(explorerUrl || chainId) && (
          <>
            {(Explorer === undefined || Explorer === true) && <ExplorerLink {...{ address, chainId, explorerUrl }} />}
            {Explorer && typeof Explorer !== 'boolean' && <Explorer {...{ address, chainId, explorerUrl }} />}
          </>
        )}
        <>{(CopyAddress === undefined || CopyAddress === true) && <CopyAddressButton {...{ address }} />}</>
        <>{CopyAddress && typeof CopyAddress !== 'boolean' && <CopyAddress {...{ address }} />}</>
      </div>
    </div>
  )
}
