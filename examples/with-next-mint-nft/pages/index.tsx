import { useEffect, useState } from 'react';
import Image from 'next/legacy/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import {
  useAccount,
  useNetwork,
  useContractRead,
} from 'wagmi';
import { abi } from '../contract-abi';
import { parseUnits } from 'viem';
import FlipCard, { BackCard, FrontCard } from '../components/FlipCard';

import { 
  ClientRendered, 
  UseBoxActionArgs, 
  ActionType, 
  ChainId, 
  TokenInfo, 
  ethGasToken,
  TokenSelector
} from '@decent.xyz/box-ui';
import { BoxHooksContextProvider } from '@decent.xyz/box-hooks';
import { DecentMint } from '../components/DecentMint';
import { TokenSelectorUsage } from '../components/TokenSelectorUsage';

const NFT_ADDRESS = '0x3146975BFCCAE722F802BC0Cd540dB1e6c178D1F'

const Home: NextPage = () => {
  const [isMinted, setIsMinted] = useState(false);
  const [srcToken, setSrcToken] = useState<TokenInfo>(ethGasToken);
  const [totalMinted, setTotalMinted] = useState(0n);
  const { isConnected, address: sender } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    setSrcToken(ethGasToken);
  }, [chain]);

  const actionArgs: UseBoxActionArgs = {
    actionType: ActionType.NftPreferMint,
    actionConfig: {
      contractAddress: NFT_ADDRESS,
      chainId: ChainId.OPTIMISM,
      cost: {
        isNative: true,
        amount: parseUnits('0.00044', 18),
      },
    },
    srcChainId: chain?.id!,
    sender: sender!,
    slippage: 1, // 1%
    srcToken: srcToken.address, // native gas token
    dstToken: '0x0000000000000000000000000000000000000000', // ETH
    dstChainId: ChainId.OPTIMISM,
  };

  const { data: totalSupplyData } = useContractRead({
    ...{
      address: NFT_ADDRESS,
      abi,
      chainId: actionArgs.dstChainId
    },
    functionName: 'totalSupply',
    watch: true,
  });

  useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData);
    }
  }, [totalSupplyData]);

  return (
    <ClientRendered>
      <BoxHooksContextProvider apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}>
        <div className="page">
          <div className="container">
            <div style={{ flex: '1 1 auto' }}>
              <div style={{ padding: '24px 24px 24px 0' }}>
                <h1>NFT Demo Mint</h1>
                <p style={{ margin: '12px 0 24px' }}>
                  {Number(totalMinted)} minted so far!
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <TokenSelectorUsage 
                    chainId={chain?.id!} 
                    address={sender!} 
                    srcToken={srcToken}
                    setSrcToken={setSrcToken}
                  />
                  <ConnectButton />
                </div>
                
                {isConnected && (
                  <DecentMint actionArgs={actionArgs} setIsMinted={setIsMinted} />
                )}
              </div>
            </div>

            <div style={{ flex: '0 0 auto' }}>
              <FlipCard>
                <FrontCard isCardFlipped={isMinted}>
                  <Image
                    layout="responsive"
                    src="/nft.png"
                    width="500"
                    height="500"
                    alt="RainbowKit Demo NFT"
                  />
                  <h1 style={{ marginTop: 24 }}>Rainbow NFT</h1>
                  <ConnectButton />
                </FrontCard>
                <BackCard isCardFlipped={isMinted}>
                  <div style={{ padding: 24 }}>
                    <Image
                      src="/nft.png"
                      width="80"
                      height="80"
                      alt="RainbowKit Demo NFT"
                      style={{ borderRadius: 8 }}
                    />
                  </div>
                </BackCard>
              </FlipCard>
            </div>
          </div>
        </div>
      </BoxHooksContextProvider>
    </ClientRendered>
  );
};

export default Home;
