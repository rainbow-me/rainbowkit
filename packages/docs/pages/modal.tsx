import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import React from 'react'

const wallets = [
  { name: 'Metamask', connector: new InjectedConnector({}) },
  {
    name: 'WalletLink',
    connector: new WalletLinkConnector({
      url: 'https://mainnet.infura.io/v3/0c8c992691dc4bfe97b4365a27fb2ce4',
      appName: 'example'
    })
  }
]
