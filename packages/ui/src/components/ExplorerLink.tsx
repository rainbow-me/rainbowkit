import { chainIDToExplorer } from '@rainbow-me/kit-utils'
import React from 'react'
import { styled } from '@linaria/react'

export type ExplorerProps = { chainId?: number; address: string; explorerUrl?: string } & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

const Link = styled.a`
  text-decoration: none;
  &::before {
    content: '↗ ';
  }
  &:hover {
    text-decoration: underline;
  }
`

export const ExplorerLink = ({ chainId = 1, address, explorerUrl, ...props }: ExplorerProps) => (
  <Link
    href={`${explorerUrl || chainIDToExplorer(chainId).url}/address/${address}`}
    target="_blank"
    rel="noreferrer"
    {...props}
  >
    View on explorer
  </Link>
)
