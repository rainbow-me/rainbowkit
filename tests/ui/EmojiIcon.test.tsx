/* import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils.js'
import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { JSDOM } from 'jsdom'
import { EmojiIcon } from '../../packages/ui/dist/index'

const { window } = new JSDOM('', { url: 'https://localhost' })

// @ts-ignore
global.window = window
global.document = window.document
global.navigator = window.navigator
global.getComputedStyle = window.getComputedStyle
global.requestAnimationFrame = null
global.localStorage = window.localStorage

let rootContainer: HTMLDivElement

const t = suite('EmojiIcon')

t.before.each(() => {
  rootContainer = document.createElement('div')

  document.body.appendChild(rootContainer)
})

t.after.each(() => {
  document.body.removeChild(rootContainer)

  rootContainer = null
})

t('it sets an emoji based on an address', () => {
  act(() => {
    render(<EmojiIcon address="0xD3B282e9880cDcB1142830731cD83f7ac0e1043f" />, rootContainer)
    return undefined
  })

  const emojiSpan = document.querySelector('span[role="img"]')

  assert.equal(emojiSpan.textContent, '🌎')
})

t.run()
 */
