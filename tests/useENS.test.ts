import { JSDOM } from 'jsdom'
import { renderHook } from '@testing-library/react-hooks'
import { useENS } from '../packages/use-ens/src/index'
import { AlchemyWebSocketProvider, BaseProvider } from '@ethersproject/providers'
import fetch from 'fetch-mock'
import * as uvu from 'uvu'

const { window } = new JSDOM('')

global.window = window
global.document = window.document
global.navigator = window.navigator
global.getComputedStyle = window.getComputedStyle
global.requestAnimationFrame = null

function describe(name: string, fn: (it: uvu.uvu.Test<uvu.Context>) => void) {
  const suite = uvu.suite(name)
  fn(suite)
  suite.run()
}

describe('use-ens', (it) => {
  // not working ENS test
  it.skip('should return resolved data for a domain', async () => {
    fetch.mock('*', {
      data: {
        domains: [
          {
            resolvedAddress: { id: '0xf75ed978170dfa5ee3d71d95979a34c91cd7042e' },
            resolver: {
              texts: ['avatar', 'color', 'description', 'email', 'url', 'com.github', 'com.instagram', 'com.twitter']
            },
            owner: { id: '0xf75ed978170dfa5ee3d71d95979a34c91cd7042e' }
          }
        ]
      }
    })
    const provider = new AlchemyWebSocketProvider('homestead', 'ep6XqV8bdsg6M4UPa7phx7poMlXTL9pk')
    const { result, waitForNextUpdate } = renderHook<[BaseProvider, string], ReturnType<typeof useENS>>(() =>
      useENS({ provider, domain: 'foda.eth' })
    )
  })
})
