import { Web3Provider } from '@ethersproject/providers'
import React, { useEffect, useState } from 'react'
import { CopyAddressButton } from './CopyAddressButton'
import { ExplorerLink, ExplorerProps } from './ExplorerLink'
import { useWalletInfo } from '@rainbow-me/kit-hooks'
import { styled } from '@linaria/react'

export interface AccountInfoProps {
  address: string
  wallet?: { name: string; logoURI: string }
  explorer?: boolean | ((props: ExplorerProps) => JSX.Element)
  copyAddress?: boolean | ((props: { address: string }) => JSX.Element)

  chainId?: number
  explorerUrl?: string
  classNames?: Partial<{
    container: string
  }>
}

const Container = styled.div`
  border-radius: 10px;
  padding: 1.25rem;
  border: 4px solid gray;
  width: max-content;
`

const Address = styled.div`
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.4rem;
`

const Avatar = styled.img`
  margin-right: 0.5rem;
  height: 1.25rem;
  width: 1.25rem;
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 1rem;
  & > * {
    margin-right: 1.5rem;
  }
`

export const AccountInfo = ({
  address,
  wallet,
  chainId,
  explorer: Explorer,
  copyAddress: CopyAddress,
  explorerUrl
}: AccountInfoProps) => {
  const { name, logoURI } = useWalletInfo(wallet)

  return (
    <Container>
      {name && (
        <div>
          Connected with <strong>{name}</strong>
        </div>
      )}
      {address && (
        <Address>
          {logoURI && <Avatar src={logoURI} title={name} alt={name} />} {address}
        </Address>
      )}
      <Footer>
        <>{(CopyAddress === undefined || CopyAddress === true) && <CopyAddressButton {...{ address }} />}</>
        <>{CopyAddress && typeof CopyAddress !== 'boolean' && <CopyAddress {...{ address }} />}</>
        {(explorerUrl || chainId) && (
          <>
            {(Explorer === undefined || Explorer === true) && <ExplorerLink {...{ address, chainId, explorerUrl }} />}
            {Explorer && typeof Explorer !== 'boolean' && <Explorer {...{ address, chainId, explorerUrl }} />}
          </>
        )}
      </Footer>
    </Container>
  )
}
