import { createContext, useContext } from 'react';
import { Address } from 'viem';

export type AccountExtraInfo = {
  otherAddresses: Address[];
  onOtherAddressClick: (address: Address) => void;
};

export const AccountExtraInfoContext = createContext<
  AccountExtraInfo | undefined
>(undefined);

export const useAccountExtraInfo = () => {
  return useContext(AccountExtraInfoContext);
};
