import clsx from 'clsx'
import React from 'react'
import { chainIDToExplorer } from '../../utils/convert'
import { ExplorerLinkClassName } from './ExplorerLink.css'

export type ExplorerLinkProps = { chainId?: number; address: string; explorerUrl?: string } & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

export const ExplorerLink = ({ chainId = 1, address, explorerUrl, className, ...props }: ExplorerLinkProps) => (
  <a
    href={`${explorerUrl || chainIDToExplorer(chainId).url}/address/${address}`}
    target="_blank"
    rel="noreferrer"
    className={clsx(ExplorerLinkClassName, className)}
    {...props}
  >
    View on explorer
  </a>
)
