import { withWeb3React } from '@rainbowkit/core'

export const HOC = ({ children }) => {
  return withWeb3React(children)
}
