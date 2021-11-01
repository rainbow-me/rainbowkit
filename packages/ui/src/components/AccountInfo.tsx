import React from 'react'
import { CopyAddressButton } from './CopyAddressButton'
import { ExplorerLink, ExplorerProps } from './ExplorerLink'
import { useWalletInfo } from '@rainbow-me/kit-hooks'
import { styled } from '@linaria/react'

export interface AccountInfoProps {
  /**
   * Blockchain account address
   */
  address: string
  /**
   * Wallet name and logo image
   */
  wallet?: { name: string; logoURI: string }
  /**
   * Blockchain explorer component, auto-detected if not set or set to true
   */
  explorer?: boolean | ((props: ExplorerProps) => JSX.Element)
  /**
   * Copy address button component, enabled if set to true or not set
   */
  copyAddress?: boolean | ((props: { address: string }) => JSX.Element)
  /**
   * Current chain ID
   */

  chainId?: number
  /**
   * URL to a address on a blockchain explorer
   */
  explorerUrl?: string
  /**
   * Custom CSS classNames
   */
  classNames?: Partial<{
    container: string
  }>
}

const Container = styled.div`
  border-radius: 10px;
  padding: 1.25rem;
  border: 4px solid gray;
  min-width: max-content;
  width: 100%;
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
/**
 * Blockchain account information block.
 */

export const AccountInfo = ({
  address,
  wallet,
  chainId,
  explorer: Explorer,
  copyAddress: CopyAddress,
  explorerUrl,
  classNames
}: AccountInfoProps) => {
  const { name, logoURI } = useWalletInfo(wallet)

  return (
    <Container className={classNames.container || ''}>
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
