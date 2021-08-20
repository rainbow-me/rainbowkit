import { withWeb3React } from '@rainbowkit/util'

export const HOC = ({ children }) => {
  return withWeb3React(children)
}
