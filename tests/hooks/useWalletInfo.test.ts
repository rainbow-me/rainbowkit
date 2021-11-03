import { JSDOM } from 'jsdom'
import { useWalletInfo } from '../../packages/hooks/src/useWalletInfo'
import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { renderHook } from '@testing-library/react-hooks'

const { window } = new JSDOM('', { url: 'https://localhost' })

// @ts-ignore
global.window = window
global.document = window.document
global.navigator = window.navigator
global.getComputedStyle = window.getComputedStyle
global.requestAnimationFrame = null
global.localStorage = window.localStorage

const t = suite('useWalletInfo')

t('picks up last used wallet from storage', async () => {
  localStorage.setItem('rk-last-wallet', 'rainbow')

  const { result } = renderHook(() => useWalletInfo())

  assert.equal(result.current, {
    name: 'Rainbow',
    logoURI: 'https://bafkreico3pudvsd4j6emdtq4pmyfaat34reoebxyei7tvlpzp5hnec24qa.ipfs.dweb.link'
  })
  localStorage.removeItem('rk-last-wallet')
})

t('accepts initial value', () => {
  const { result } = renderHook(() =>
    useWalletInfo({
      name: 'Rainbow',
      logoURI: 'https://bafkreico3pudvsd4j6emdtq4pmyfaat34reoebxyei7tvlpzp5hnec24qa.ipfs.dweb.link'
    })
  )

  assert.equal(result.current, {
    name: 'Rainbow',
    logoURI: 'https://bafkreico3pudvsd4j6emdtq4pmyfaat34reoebxyei7tvlpzp5hnec24qa.ipfs.dweb.link'
  })
})

t.run()
