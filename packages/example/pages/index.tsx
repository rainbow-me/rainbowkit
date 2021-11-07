import { NetworkSelect, Profile, withWeb3React, useWeb3State } from '@rainbow-me/kit-core'
import { css } from 'linaria'
import React from 'react'
import { wallets } from '../lib/wallets'

const Example = () => {
  const { provider, chainId } = useWeb3State()

  return (
    <>
      <h1>Simple demo</h1>
      <div
        className={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <Profile
          modalOptions={{
            wallets,
            terms: (
              <>
                By connecting, you acknowledge that you’ve read and agree to the{' '}
                <a>RainbowKit&apos;s Terms of Service.</a>
              </>
            )
          }}
        />
        <NetworkSelect {...{ chainId, provider }} chains={['ethereum', 'arbitrum', 'optimism', 'polygon']} />
      </div>
    </>
  )
}

export default withWeb3React(Example)
