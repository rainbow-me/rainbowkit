import { ChainId } from '@rainbowkit/utils'
import { Web3Provider } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { ABI } from './abi'

export const matcha = async (chainId: ChainId, provider: Web3Provider) => {
  const signer = provider.getSigner()

  const address = await signer.getAddress()

  const getSwapUrl = (url: string) =>
    `https://${url}/swap/v1/quote?sellAmount=${1 * 1_000_000}&buyToken=USDT&sellToken=USDC`

  let url: string

  switch (chainId) {
    case ChainId.POLYGON:
      url = getSwapUrl('polygon.api.0x.org')
      break
    case ChainId.MAINNET:
      url = getSwapUrl('api.0x.org')
      break
  }

  const res = await fetch(url)
  const quote = await res.json()

  const abi = new Contract(quote.sellTokenAddress, ABI, signer)

  try {
    const allowance = (await abi.allowance(address, quote.allowanceTarget)).toString()

    if (allowance >= quote.sellAmount) {
      console.log('Swap is not allowed')

      const tx = await abi.approve(quote.allowanceTarget, BigNumber.from(quote.sellAmount))

      console.log(tx)
    }
  } catch (e) {
    console.error(e)
  }

  try {
    const tx = await signer.sendTransaction({
      to: quote.allowanceTarget,
      data: quote.data
    })

    const receipt = await provider.waitForTransaction(tx.hash)
    return receipt
  } catch (e) {
    alert(e.data?.message ? `Failed to swap, ${e.data.message}` : `Failed to swap, ${e.message}`)
  }
}
