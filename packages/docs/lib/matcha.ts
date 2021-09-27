import { ChainId } from '@rainbowkit/utils'
import { Web3Provider } from '@ethersproject/providers'
import { UnsignedTransaction } from '@ethersproject/transactions'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { ABI } from './abi'

export const matcha = async (chainId: ChainId, provider: Web3Provider) => {
  const getSwapUrl = (url: string) =>
    `https://${url}/swap/v1/quote?buyAmount=${1 * 1_000_000}&buyToken=USDT&sellToken=USDC`

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

  const signer = provider.getSigner()

  const address = await signer.getAddress()

  const abi = new Contract(quote.buyTokenAddress, ABI, signer)

  try {
    const allowance = (await abi.allowance(address, address)).toString()

    if (allowance === '0') {
      console.log('Swap is not allowed')

      const tx = await abi.approve(address, 1_000_000)
      console.log(tx)
    }
  } catch (e) {
    console.error(e)
  }

  try {
    const tx = await signer.sendTransaction({
      ...quote,
      value: BigNumber.from(quote.value)
    })

    const receipt = await provider.waitForTransaction(tx.hash)
    return receipt
  } catch (e) {
    alert(`Failed to swap, ${e.data.message}`)
  }
}
