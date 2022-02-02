import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { getWalletInfo } from '../../packages/rainbowkit-old/src/utils/wallets';

const t = suite('getWalletInfo');

t('getWalletInfo', () => {
  assert.equal(
    [
      'metamask',
      'coinbase',
      'walletlink',
      'frame',
      'torus',
      'rainbow',
      'trust',
      'gnosis',
      'argent',
    ].map(x => getWalletInfo(x)),
    [
      {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreig23o6p5exkyrbhxveqap3krzeinisknloocwc5uijq6wrtrlpl3e',
        name: 'MetaMask',
      },
      {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreihl4wmkbzm44mxu33mbuy3hcrc5g6wmi32ns3y3gfwme6w2hcbdy4',
        name: 'Coinbase',
      },
      {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreihl4wmkbzm44mxu33mbuy3hcrc5g6wmi32ns3y3gfwme6w2hcbdy4',
        name: 'Coinbase',
      },
      {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreihgrm4ebmo7ybe6vzzhwgdpiv6t4jrljl5t7y7n3keyq6n6susvra',
        name: 'Frame',
      },
      {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreiao4cnnidbqblkmd2xfb2akutm2bjdr5r4xnbuwumzhda3ikxyb7a',
        name: 'Torus',
      },
      {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreico3pudvsd4j6emdtq4pmyfaat34reoebxyei7tvlpzp5hnec24qa',
        name: 'Rainbow',
      },
      {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreiaa457sqcvunki6x7uydyjmniox22vclagwqda5qbskwd27to32aq',
        name: 'Trust',
      },
      {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreifsbu7uy4m25t5hty27x7nfrz3ot3wcvlnqwfujom7ax6qmixgciu',
        name: 'Gnosis',
      },
      {
        logoURI:
          'https://cloudflare-ipfs.com/ipfs/bafkreic5w3umuv7hz7drgyp6ymmpiqre4cnd36ftsutrrazgrecpvo5rgq',
        name: 'Argent',
      },
    ]
  );
});

t.run();
