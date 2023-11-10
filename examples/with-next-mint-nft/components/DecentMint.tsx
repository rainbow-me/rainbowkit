import { useEffect, useState } from 'react';
import {
  useBoxAction,
  UseBoxActionArgs,
  EvmTransaction,
  getChainExplorerTxLink,
  useBridgeReceipt,
} from '@decent.xyz/box-hooks';

import {
  EstimateGasParameters,
  Hex,
  TransactionReceipt,
} from 'viem';

import {
  getAccount,
  getPublicClient,
  sendTransaction,
  waitForTransaction,
} from '@wagmi/core';

export const DecentMint = ({
  actionArgs, setIsMinted
}: {
  actionArgs: UseBoxActionArgs, setIsMinted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { actionResponse, isLoading, error } = useBoxAction(actionArgs);
  const [hash, setHash] = useState<Hex>();
  const [mintText, setMintText] = useState('Mint');
  const bridgeId = actionResponse?.bridgeId;
  const { srcChainId, dstChainId } = actionArgs;
  const [srcTxReceipt, setSrcTxReceipt] = useState<TransactionReceipt>();
  const { receipt: _dstTxReceipt } = useBridgeReceipt({
    bridgeId,
    srcChainId,
    dstChainId,
    srcTxHash: hash,
  });
  const dstTxReceipt = _dstTxReceipt as TransactionReceipt;

  useEffect(() => {
    if ((srcChainId === dstChainId && srcTxReceipt) || (srcTxReceipt && dstTxReceipt)) {
      setMintText('Minted!');
      setIsMinted(true);
    }
  }, [dstChainId, dstTxReceipt, setIsMinted, srcChainId, srcTxReceipt]);

  return (
    <div>
      <button
        style={{ marginTop: 24 }}
        className={actionResponse ? 'button' : 'disabled-button'}
        disabled={isLoading || !!error}
        onClick={async () => {
          setMintText('Minting...')
          try {
            const account = getAccount();
            const publicClient = getPublicClient();
            const tx = actionResponse?.tx as EvmTransaction;
            const gas = await publicClient.estimateGas({
              account,
              ...tx,
            } as unknown as EstimateGasParameters);
            const { hash } = await sendTransaction({
              ...tx,
              gas,
            });
            setHash(hash);
            // catch viem polygon error
            try {
              const receipt = await waitForTransaction({ hash });
              setSrcTxReceipt(receipt);
            } catch (e) {}
          } catch (e) {
            console.error(e);
            setMintText('Mint');
          }
        }}
      >
        {mintText}
      </button>
      {hash && (
        <div style={{ marginTop: 12 }}>
          <a
            href={getChainExplorerTxLink(srcChainId, hash)}
            className='link'
          >
            {`View ${srcChainId !== dstChainId ? 'src tx' : ''} on explorer`}
          </a>
        </div>
      )}
      {srcTxReceipt && srcChainId !== dstChainId && (
        <div style={{ marginTop: 6 }}>
          {dstTxReceipt?.transactionHash && (
            <div>
              <a
                href={getChainExplorerTxLink(
                  dstChainId,
                  dstTxReceipt?.transactionHash
                )}
                className="link"
              >
                View dst tx on explorer
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};