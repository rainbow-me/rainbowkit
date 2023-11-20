import { Address } from "viem";
import {
  BoxHooksContextProvider,
  ChainId,
  TokenInfo,
  TokenSelector,
} from "@decent.xyz/box-ui";
import { Dispatch, SetStateAction } from "react";

type TokenSelectorUsageProps = {
  chainId: ChainId,
  address: Address,
  srcToken: TokenInfo,
  setSrcToken: Dispatch<SetStateAction<TokenInfo>>,
};

export const TokenSelectorUsage = ({
  chainId,
  address,
  srcToken,
  setSrcToken
}: TokenSelectorUsageProps) => {
  return (
    <div>
      <BoxHooksContextProvider
        apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
      >
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '0.3rem 1rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          color: '#333',
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}>
          <TokenSelector
            selectedToken={srcToken}
            setSelectedToken={setSrcToken}
            chainId={chainId}
            address={address}
          />
        </div>
      </BoxHooksContextProvider>
    </div>
  );
};
