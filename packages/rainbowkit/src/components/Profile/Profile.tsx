import { JsonRpcProvider } from '@ethersproject/providers';
import React, { Dispatch, useMemo, useRef } from 'react';
import { useENSWithAvatar } from '../../hooks/useENSWithAvatar';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useToggle } from '../../hooks/useToggle';
import {
  useWalletModal,
  UseWalletModalOptions,
} from '../../hooks/useWalletModal';
import { Badge } from '../Badge/Badge';
import { Box } from '../Box/Box';
import { Modal } from '../Modal/Modal';
import {
  WalletDropdown,
  WalletDropdownProps,
} from '../WalletDropdown/WalletDropdown';
import { ConnectButton } from './ConnectButton';
import { DropdownIcon } from './Icons';

export interface ProfileProps {
  modalOptions: UseWalletModalOptions;
  copyAddress?: boolean | ((props: { address: string }) => JSX.Element);
  ENSProvider?: JsonRpcProvider;
  ipfsGatewayUrl?: string;
  classNames?: Partial<{
    pill: string;
    menu: string;
    container: string;
  }>;
  button?: (props: {
    setConnecting: Dispatch<boolean>;
    disconnect: () => void;
    isConnected: boolean;
    isConnecting: boolean;
    toggleDropdown: () => void;
  }) => JSX.Element;
  dropdown?: (props: WalletDropdownProps) => JSX.Element;
}

export const Profile = ({
  modalOptions,
  copyAddress: CopyAddressComponent,
  ENSProvider,
  ipfsGatewayUrl = 'ipfs.infura-ipfs.io',
  classNames,
  button: ButtonComponent = ConnectButton,
  dropdown: DropdownComponent = WalletDropdown,
}: ProfileProps) => {
  const {
    address: accountAddress,
    chainId,
    provider,
    state: { connect, disconnect, isConnected, isConnecting, setConnecting },
  } = useWalletModal(modalOptions);

  const ens = useENSWithAvatar({
    // @ts-expect-error accountAddress could be undefined?
    address: accountAddress,
    // @ts-expect-error ENSProvider could be undefined?
    provider: ENSProvider,
  });
  const address = useMemo(
    () => ens?.domain || accountAddress,
    [ens?.domain, accountAddress]
  );

  const [open, toggle] = useToggle(false);

  const node = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(node, open ? toggle : undefined);

  return (
    <Box className={classNames?.container} position="relative" width="max">
      {isConnected ? (
        <>
          <div ref={node}>
            {/* @ts-expect-error address could be undefined? */}
            <Badge
              {...{ address, ipfsGatewayUrl, provider }}
              className={classNames?.pill || ''}
              onClick={toggle}
              {...ens}
            >
              <DropdownIcon />
            </Badge>

            {/* @ts-expect-error address could be undefined? */}
            <DropdownComponent
              {...{
                accountAddress,
                address,
                chainId,
                isExpanded: open,
                provider,
              }}
              className={classNames?.menu || ''}
              copyAddress={CopyAddressComponent}
              disconnect={disconnect}
            />
          </div>
        </>
      ) : (
        <>
          <ButtonComponent
            {...{
              disconnect,
              isConnected,
              isConnecting,
              setConnecting,
              toggleDropdown: toggle,
            }}
          />
          {isConnecting && (
            <Modal
              {...{ connect, isConnecting, setConnecting }}
              {...modalOptions}
            />
          )}
        </>
      )}
    </Box>
  );
};
