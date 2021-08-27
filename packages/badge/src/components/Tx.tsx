import { BaseProvider } from '@ethersproject/providers'
import { chainIDToExplorer } from '@rainbowkit/utils'
import React, { useEffect, useState, useMemo } from 'react'

export interface TxProps {
  status?: 'pending' | 'success' | 'fail'
  title?: string
  hash?: string
  chainId?: number
  explorerUrl?: string
  provider?: BaseProvider
}

export const Tx = ({ status, ...props }: TxProps) => {
  const iconUrl = useMemo(() => {
    switch (status) {
      case 'pending':
        return '/icons/pending.svg'
      case 'success':
        return '/icons/success.svg'
    }
  }, [status])

  const [link, setLink] = useState('')

  const [title, setTitle] = useState(props.title || '')

  useEffect(() => {
    if (props.hash) {
      if (props.explorerUrl) setLink(`${props.explorerUrl}/${props.hash}`)
      else if (props.chainId) setLink(`${chainIDToExplorer(props.chainId)}/${props.hash}`)
    }
  }, [props.hash, props.explorerUrl, props.chainId])

  return (
    <span>
      <a href={link} title={title}>
        {title}
      </a>{' '}
      <img src={iconUrl} aria-label={status} alt={status} title={status} />
    </span>
  )
}
