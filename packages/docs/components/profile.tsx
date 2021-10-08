import { InfuraWebSocketProvider } from '@ethersproject/providers'
import { css } from '@linaria/core'
import { Profile } from '@rainbowkit/ui'
import { walletConnectRPCs, withWeb3React } from '@rainbowkit/utils'
import { WalletConnectConnectorArguments } from '@web3-react/walletconnect-connector'
import React from 'react'

const mainnetProvider = new InfuraWebSocketProvider('homestead', '372913dfd3114b34983d2256c46195a7')

const ProfileDemo = () => {
  return (
    <Profile
      rpcProvider={mainnetProvider}
      copyAddress
      ipfsGatewayUrl="ipfs.io"
      modalOptions={{
        chains: ['mainnet', 'polygon', 'optimism', 'arbitrum', 'kovan', 'ropsten'],
        wallets: [
          'metamask',
          'coinbase',
          {
            name: 'rainbow',
            connectorName: 'walletconnect',
            options: {
              rpc: walletConnectRPCs
            } as WalletConnectConnectorArguments
          }
        ],
        terms: (
          <>
            By connecting, you acknowledge that you’ve read and agree to the <a>RainbowKit&apos;s Terms of Service.</a>
          </>
        )
      }}
      classNames={{
        menu: css`
          width: 100%;
          background-color: white;
        `
      }}
    />
  )
}

export const ProfileExample = withWeb3React(ProfileDemo)
