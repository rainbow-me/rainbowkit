import { BigNumber } from '@ethersproject/bignumber'
import { BaseProvider } from '@ethersproject/providers'
import { chainIDToExplorer, guessTitle } from '@rainbowkit/utils'
import React, { useEffect, useState, useMemo } from 'react'
import { FAIL_ICON, SUCCESS_ICON } from '../constants/images'
import PENDING_ICON from '../../assets/loading.svg'
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
  width: max-content;
  img {
    margin-left: 1rem;
    height: 1rem;
    width: 1rem;
  }
  a {
    color: var(--fg-2);
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

export const Tx = ({
  status,
  title: initialTitle,
  classNames,
  chainId = 1,
  data,
  value,
  from,
  to,
  ...props
}: TxProps) => {
  const iconUrl = useMemo(() => {
    switch (status) {
      case 'pending':
        return PENDING_ICON
      case 'success':
        return SUCCESS_ICON
      case 'fail':
        return FAIL_ICON
    }
  }, [status])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.hash, props.explorerUrl, chainId])

  return (
    <Container className={classNames?.container}>
      {link === '' ? (
        title
      ) : (
        <a href={link} title={title}>
          {title}
        </a>
      )}
      {status && <img className={classNames?.icon} src={iconUrl} aria-label={status} alt={status} title={status} />}
    </Container>
  )
}
