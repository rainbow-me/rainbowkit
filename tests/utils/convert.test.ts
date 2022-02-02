import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import {
  chainIDToExplorer,
  chainIdToName,
  chainIDToToken,
  chainNametoId,
  connectorByWallet,
  walletByConnector,
} from '../../packages/rainbowkit-old/src/utils/convert';

let t = suite('connectorByWallet');

t('returns connector name by wallet name', () => {
  const WALLETS = [
    'metamask',
    'coinbase',
    'walletlink',
    'frame',
    'walletconnect',
    'rainbow',
    'argent',
  ];
  const CONNECTORS = [
    'Injected',
    'WalletLink',
    'WalletLink',
    'Frame',
    'WalletConnect',
    'WalletConnect',
    'WalletConnect',
  ];

  WALLETS.forEach((w, i) => {
    assert.equal(connectorByWallet(w), CONNECTORS[i]);
  });
});

t = suite('walletByConnector');

t('returns wallet name by connector name', () => {
  const CONNECTORS = ['Injected', 'WalletLink', 'Frame', 'WalletConnect'];
  const WALLETS = ['metamask', 'walletlink', 'frame', 'walletconnect'];
  CONNECTORS.forEach((c, i) => {
    const actual = walletByConnector(`${c}Connector`);
    assert.equal(actual, WALLETS[i]);
  });
});

t = suite('chainNametoId');

t('finds chain ID by chain name', () => {
  assert.equal([chainNametoId('ethereum'), chainNametoId('fuji')], [1, 43113]);
});

t('returns 1 if chain is not found', () => {
  assert.equal(chainNametoId('unknown-chain'), 1);
});

t.run();

t = suite('chainIdToName');

t('finds chain name by ID', () => {
  assert.equal(
    [chainIdToName(1), chainIdToName(43113)],
    ['Ethereum', 'Avalanche Fuji Testnet']
  );
});

t('returns "Ethereum" if not found', () => {
  assert.equal(chainIdToName(666), 'Ethereum');
});

t.run();

t = suite('chainIDToToken');

t('returns token symbol for a chain ID', () => {
  assert.equal(chainIDToToken(137), 'MATIC');
});

t('returns token symbol for a chain ID', () => {
  assert.equal(chainIDToToken(666), 'ETH');
});

t.run();

t = suite('chainIDToExplorer');

t('returns explorer name and URL by chain ID', () => {
  assert.equal(chainIDToExplorer(137), {
    name: 'polygonscan',
    standard: 'EIP3091',
    url: 'https://polygonscan.com',
  });
});

t('returns etherscan if chain ID is not found', () => {
  assert.equal(chainIDToExplorer(666), {
    name: 'etherscan',
    standard: 'EIP3091',
    url: 'https://etherscan.io',
  });
});

t('returns etherscan if chain ID is 0', () => {
  assert.equal(chainIDToExplorer(0), {
    name: 'etherscan',
    standard: 'EIP3091',
    url: 'https://etherscan.io',
  });
});

t.run();
