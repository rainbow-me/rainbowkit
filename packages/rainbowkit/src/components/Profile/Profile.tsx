import { BaseProvider, JsonRpcProvider } from '@ethersproject/providers';
import React, { Dispatch, useMemo, useRef } from 'react';
import { useENSWithAvatar } from '../../hooks/useENSWithAvatar';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useToggle } from '../../hooks/useToggle';
import {
  useWalletModal,
  UseWalletModalOptions,
} from '../../hooks/useWalletModal';
import { ChainId } from '../../utils/chains';
import { Badge } from '../Badge/Badge';
import { Box } from '../Box/Box';
import { EmojiIcon } from '../EmojiIcon/EmojiIcon';
import { Modal } from '../Modal/Modal';
import { TxHistoryProps } from '../TxHistory/TxHistory';
import { WalletDialog } from '../WalletDialog/WalletDialog';
import { ConnectButton } from './ConnectButton';
import { DropdownIcon } from './Icons';

export interface AccountInfoProps {
  copyAddress?: boolean | ((props: { address: string }) => JSX.Element);
  /**
   * Ethereum or ENS address
   */
  address: string;
  /**
   * Ethereum address
   */
  accountAddress: string;
  /**
   * Blockchain network ID
   */
  chainId: ChainId;
  /**
   * RPC Provider
   */
  provider: BaseProvider;
  /**
   * Disconnect from current provider
   */
  disconnect: () => void;
  /**
   * Visible state
   */
  isExpanded: boolean;
  /**
   * Toggle visible state
   */
  toggle: () => void;
  /**
   * Avatar URL
   */
  avatar?: string;
  /**
   * Profile icon from ENS avatar (with emoji icon as fallback)
   */
  profileIcon?: string | React.ComponentType<any>;
  /**
   * Dialog window class name
   */
  className?: string;
  /**
   * TxHistory props
   */
  txHistoryProps?: TxHistoryProps;
}

export interface ProfileProps {
  modalOptions: UseWalletModalOptions;
  copyAddress?: boolean | ((props: { address: string }) => JSX.Element);
  ENSProvider?: JsonRpcProvider;
  /**
   * Base URL for IPFS gateway to resolve `ipfs://` links
   */
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
  accountMenu?: typeof WalletDialog;
  txHistoryProps?: TxHistoryProps;
}

export const Profile = ({
  modalOptions,
  copyAddress: CopyAddressComponent,
  ENSProvider,
  ipfsGatewayUrl = 'cloudflare-ipfs.com',
  classNames,
  button: ButtonComponent = ConnectButton,
  accountMenu: AccountMenu = WalletDialog,
  txHistoryProps,
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
    urlResolver: avatar => {
      if (avatar.startsWith('ipfs://')) {
        return `https://${ipfsGatewayUrl}/ipfs/${avatar.slice(7)}`;
      } else return avatar;
    },
  });
  const address = useMemo(
    () => ens?.domain || accountAddress,
    [ens?.domain, accountAddress]
  );

  const [isExpanded, toggle] = useToggle(false);

  const node = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(node, isExpanded ? toggle : undefined);

  const profileIcon = useMemo(() => {
    if (ens.avatar) {
      return ens.avatar;
    } else if (address) {
      const AddressIcon = () => <EmojiIcon address={address} />;
      return AddressIcon;
    } else return undefined;
  }, [ens.avatar, address]);

  return (
    <Box className={classNames?.container} position="relative" width="max">
      {isConnected ? (
        <>
          <Badge
            // @ts-expect-error address could be undefined?
            address={address}
            avatar={ens.avatar}
            className={classNames?.pill || ''}
            onClick={toggle}
            profileIcon={profileIcon}
            // @ts-expect-error provider could be undefined?
            provider={provider}
          >
            <DropdownIcon />
          </Badge>

          {address && accountAddress && chainId && provider && (
            <AccountMenu
              {...{
                accountAddress,
                address,
                chainId,
                isExpanded,
                profileIcon,
                provider,
                ref: node,
                toggle,
                txHistoryProps,
              }}
              className={classNames?.menu || ''}
              copyAddress={CopyAddressComponent}
              disconnect={disconnect}
            />
          )}
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
