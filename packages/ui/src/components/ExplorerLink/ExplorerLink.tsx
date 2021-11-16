import { chainIDToExplorer } from '@rainbow-me/kit-utils'
import React from 'react'
import { ExplorerLinkClassName } from './style.css'

export type ExplorerProps = { chainId?: number; address: string; explorerUrl?: string } & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

export const ExplorerLink = ({ chainId = 1, address, explorerUrl, className, ...props }: ExplorerProps) => (
  <a
    href={`${explorerUrl || chainIDToExplorer(chainId).url}/address/${address}`}
    target="_blank"
    rel="noreferrer"
    className={`${ExplorerLinkClassName} ${className || ''}`}
    {...props}
  >
    View on explorer
  </a>
)
