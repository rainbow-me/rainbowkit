import { BigNumber } from '@ethersproject/bignumber'
import { BaseProvider } from '@ethersproject/providers'
import { chainIDToExplorer, guessTitle } from '@rainbow-me/kit-utils'
import React, { useEffect, useState, useMemo } from 'react'
import { styled } from '@linaria/react'

export interface TxProps {
  status?: 'pending' | 'success' | 'fail'
  title?: string
  hash?: string
  data?: string
  from?: string
  to?: string
  value?: BigNumber
  chainId?: number
  explorerUrl?: string
  provider?: BaseProvider
  classNames?: Partial<{
    container: string
    icon: string
  }>
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.8rem;
  width: 100%;

  img {
    margin-left: 1rem;
    height: 1rem;
    width: 1rem;
  }
  a {
    text-decoration: none;
    font-weight: bold;
  }
  a:hover {
    text-decoration: underline;
  }
  a::after {
    content: ' ↗';
  }
`

export const Tx = ({ status, title: initialTitle, classNames, chainId, data, value, from, to, ...props }: TxProps) => {
  const [title, setTitle] = useState(initialTitle || '')
  const [link, setLink] = useState('')

  useEffect(() => {
    if (props.hash) {
      if (props.explorerUrl) setLink(`${props.explorerUrl}/tx/${props.hash}`)
      else if (chainId) {
        setLink(`${chainIDToExplorer(chainId).url}/tx/${props.hash}`)
      }

      if (!initialTitle) {
        setTitle(guessTitle({ data, from, to, chainId, value }))
      }
    }
  }, [props.hash, props.explorerUrl, chainId])

  return (
    <Container className={classNames?.container}>
      {link === '' ? (
        <span>{title || 'Contract call'}</span>
      ) : (
        <a href={link} title={title}>
          {title}
        </a>
      )}

      <span>{status}</span>
    </Container>
  )
}
