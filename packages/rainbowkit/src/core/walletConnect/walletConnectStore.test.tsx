import { describe, expect, it, vi } from 'vitest';
import { base, mainnet } from 'wagmi/chains';
import { connectMutationOptions } from 'wagmi/query';
import { RainbowKitChain } from '../../components/RainbowKitProvider/RainbowKitChainContext';
import { getDefaultConfig } from '../../config/getDefaultConfig';
import {
  getWalletConnectWallet,
  getWalletsFromConnectors,
} from '../../utils/wallets';
import {
  WalletConnectStore,
  createWalletConnectStore,
} from './walletConnectStore';

const PROJECT_ID = '21fef48091f12692cad574a6f7753643';
const APP_NAME = 'My RainbowKit App';
const TIMEOUT = 5000;
const INTERVAL = 500;

const chains: [RainbowKitChain, ...RainbowKitChain[]] = [mainnet, base];

const config = getDefaultConfig({
  chains,
  projectId: PROJECT_ID,
  appName: APP_NAME,
});

const { connectors } = config;

const wallets = getWalletsFromConnectors({ connectors });
const walletConnectWallet = getWalletConnectWallet({
  wallets,
});

if (!walletConnectWallet) {
  throw new Error('WalletConnect wallet not found');
}

const { mutationFn: connectAsync } = connectMutationOptions(config);

const waitForWalletConnectUri = (
  getWalletConnectUri: WalletConnectStore['getWalletConnectUri'],
) => {
  return vi.waitFor(
    () => {
      if (!getWalletConnectUri()) {
        throw new Error('WalletConnect URI generation timed out');
      }
    },
    { timeout: TIMEOUT, interval: INTERVAL },
  );
};

describe('walletConnectStore', () => {
  it('should receive WalletConnect URI upon request', async () => {
    let hasReceivedWalletConnectUri = false;

    const { requestWalletConnectUri, onWalletConnectUri, getWalletConnectUri } =
      createWalletConnectStore();

    onWalletConnectUri((uri) => {
      if (uri) hasReceivedWalletConnectUri = true;
    });

    requestWalletConnectUri({
      config,
      walletConnectWallet,
      chains,
      connectAsync,
    });

    await waitForWalletConnectUri(getWalletConnectUri);

    expect(hasReceivedWalletConnectUri).toBe(true);
    expect(getWalletConnectUri()).toMatch(/^wc:/);
  });

  it('should receive new WalletConnect URIs upon multiple requests', async () => {
    let hasReceivedWalletConnectUri = false;

    const { requestWalletConnectUri, onWalletConnectUri, getWalletConnectUri } =
      createWalletConnectStore();

    const unsubscribe = onWalletConnectUri((uri) => {
      if (uri) hasReceivedWalletConnectUri = true;
    });

    requestWalletConnectUri({
      config,
      walletConnectWallet,
      chains,
      connectAsync,
    });

    await waitForWalletConnectUri(getWalletConnectUri);

    expect(hasReceivedWalletConnectUri).toBe(true);
    expect(getWalletConnectUri()).toMatch(/^wc:/);

    hasReceivedWalletConnectUri = false;
    unsubscribe();

    onWalletConnectUri((uri) => {
      if (uri) hasReceivedWalletConnectUri = true;
    });

    // Request new WalletConnect URI
    requestWalletConnectUri({
      config,
      walletConnectWallet,
      chains,
      connectAsync,
    });

    expect(getWalletConnectUri()).toBeNull();

    await waitForWalletConnectUri(getWalletConnectUri);

    expect(hasReceivedWalletConnectUri).toBe(true);
    expect(getWalletConnectUri()).toMatch(/^wc:/);
  });

  it('should update and get current wallet id', () => {
    const { setCurrentWalletId, getCurrentWalletId } =
      createWalletConnectStore();

    setCurrentWalletId('rainbow');
    expect(getCurrentWalletId()).toBe('rainbow');

    setCurrentWalletId('metamask');
    expect(getCurrentWalletId()).toBe('metamask');

    setCurrentWalletId('trust');
    expect(getCurrentWalletId()).toBe('trust');

    setCurrentWalletId();
    expect(getCurrentWalletId()).toBeNull();
  });
});
