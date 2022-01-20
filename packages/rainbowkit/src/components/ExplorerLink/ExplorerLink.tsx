import clsx from 'clsx';
import React from 'react';
import { chainIDToExplorer } from '../../utils/convert';
import { ExplorerLinkClassName } from './ExplorerLink.css';

export type ExplorerLinkProps = {
  chainId?: number;
  address: string;
  explorerUrl?: string;
} & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const ExplorerLink = ({
  address,
  chainId = 1,
  className,
  explorerUrl,
  ...props
}: ExplorerLinkProps) => (
  <a
    className={clsx(ExplorerLinkClassName, className)}
    href={`${explorerUrl || chainIDToExplorer(chainId).url}/address/${address}`}
    rel="noreferrer"
    target="_blank"
    {...props}
  >
    View on explorer
  </a>
);
