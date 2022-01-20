/* eslint-disable no-template-curly-in-string */
export type Chain = {
  name: string;
  chain: string;
  network: string;
  rpc: string[];
  nativeCurrency: { name: string; symbol: string; decimals: number };
  infoURL: string;
  chainId: number;
  ens?: { registry: string };
  explorers?: { name: string; url: string; standard: string }[];
  aliases: string[];
  logoURL?: string;
  slip44?: number;
  faucets?: string[];
  parent?: { chain: string; type: string };
};

export enum ChainId {
  MAINNET = 1,
  OPTIMISM = 10,
  ARBITRUM = 42161,
  BSC = 56,
  POLYGON = 137,
  XDAI = 100,
  AVAX = 43114,
  FUSE = 122,
  ECO = 128,
  FANTOM = 250,
  AOX = 200,
  KLAYTN = 8217,
  CELO = 42220,
  OKEX = 66,
  TOMO = 88,
  CALLISTO = 820,
  CLOVER = 1024,
  EDGE = 2021,
  NEAR = 1313161554,
  ROPSTEN = 3,
  RINKEBY = 4,
  KOVAN = 42,
  GOERLI = 5,
}

export const chains: Chain[] = [
  {
    aliases: ['ethereum', 'mainnet', 'homestead'],
    chain: 'ETH',
    chainId: 1,
    ens: { registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' },
    explorers: [
      { name: 'etherscan', standard: 'EIP3091', url: 'https://etherscan.io' },
    ],
    infoURL: 'https://ethereum.org',
    logoURL:
      'https://ipfs.io/ipfs/QmU1rGfe87iNEC1rComqCREDT9hX86TiysU3mqJ5iSFb6i',
    name: 'Ethereum',
    nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
    network: 'mainnet',
    rpc: [
      'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'wss://mainnet.infura.io/ws/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'https://api.mycryptoapi.com/eth',
      'https://cloudflare-eth.com',
    ],
    slip44: 60,
  },
  {
    aliases: ['optimism'],
    chain: 'ETH',
    chainId: 10,
    explorers: [
      {
        name: 'OP Explorer',
        standard: 'EIP3091',
        url: 'https://optimistic.etherscan.io',
      },
    ],
    infoURL: 'https://optimism.io',
    logoURL:
      'https://ipfs.io/ipfs/bafkreieyg2v6gxaaascecc2chrxwg26fvteyrwktf7epir7acdhkncxtrm',
    name: 'Optimism',
    nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'OETH' },
    network: 'mainnet',
    rpc: ['https://mainnet.optimism.io/'],
  },
  {
    aliases: ['arbitrum'],
    chain: 'ETH',
    chainId: 42161,
    explorers: [
      { name: 'Arbiscan', standard: 'EIP3091', url: 'https://arbiscan.io' },
      {
        name: 'Arbitrum Explorer',
        standard: 'EIP3091',
        url: 'https://explorer.arbitrum.io',
      },
    ],
    infoURL: 'https://arbitrum.io',
    logoURL:
      'https://ipfs.io/ipfs/bafkreicg6e4twffmbrhfoq4bl7tfdkqgeew4pnd5h5lxsgvzckrosg3cra',
    name: 'Arbitrum',
    nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'AETH' },
    network: 'mainnet',
    rpc: [
      // 'https://arbitrum-mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
      'https://arb1.arbitrum.io/rpc',
      'wss://arb1.arbitrum.io/ws',
    ],
  },
  {
    aliases: ['bsc', 'binance'],
    chain: 'BSC',
    chainId: 56,
    explorers: [
      { name: 'bscscan', standard: 'EIP3091', url: 'https://bscscan.com' },
    ],
    infoURL: 'https://www.binance.org',
    logoURL:
      'https://bafkreia6gq4i4jlaouenm6mnl4xpohufbxlmbf7nhhebu3cacbmukljrsi.ipfs.dweb.link',
    name: 'Binance Smart Chain',
    nativeCurrency: {
      decimals: 18,
      name: 'Binance Chain Native Token',
      symbol: 'BNB',
    },
    network: 'mainnet',
    rpc: [
      'https://bsc-dataseed1.binance.org',
      'https://bsc-dataseed2.binance.org',
      'https://bsc-dataseed3.binance.org',
      'https://bsc-dataseed4.binance.org',
      'https://bsc-dataseed1.defibit.io',
      'https://bsc-dataseed2.defibit.io',
      'https://bsc-dataseed3.defibit.io',
      'https://bsc-dataseed4.defibit.io',
      'https://bsc-dataseed1.ninicoin.io',
      'https://bsc-dataseed2.ninicoin.io',
      'https://bsc-dataseed3.ninicoin.io',
      'https://bsc-dataseed4.ninicoin.io',
      'wss://bsc-ws-node.nariox.org',
    ],
  },
  {
    aliases: ['polygon', 'matic'],
    chain: 'Polygon',
    chainId: 137,
    explorers: [
      {
        name: 'polygonscan',
        standard: 'EIP3091',
        url: 'https://polygonscan.com',
      },
    ],
    infoURL: 'https://matic.network/',
    logoURL:
      'https://ipfs.io/ipfs/bafkreidhxhnuwatm7xoiwuniiwycewblmxiu65dkklt3t3fwtx2eumbswu',
    name: 'Polygon',
    nativeCurrency: { decimals: 18, name: 'Matic', symbol: 'MATIC' },
    network: 'mainnet',
    rpc: [
      'https://rpc-mainnet.matic.network',
      'wss://ws-mainnet.matic.network',
      'https://rpc-mainnet.matic.quiknode.pro',
      'https://matic-mainnet.chainstacklabs.com',
    ],
  },
  {
    aliases: ['xdai'],
    chain: 'XDAI',
    chainId: 100,
    infoURL: 'https://forum.poa.network/c/xdai-chain',
    logoURL:
      'https://ipfs.io/ipfs/QmZAKjCruRsqE3njkbEZqNfKeKoD4w389UeYK4L751hcJy',
    name: 'xDAI',
    nativeCurrency: { decimals: 18, name: 'xDAI', symbol: 'xDAI' },
    network: 'mainnet',
    rpc: [
      'https://rpc.xdaichain.com',
      'https://xdai.poanetwork.dev',
      'wss://rpc.xdaichain.com/wss',
      'wss://xdai.poanetwork.dev/wss',
      'http://xdai.poanetwork.dev',
      'https://dai.poa.network',
      'ws://xdai.poanetwork.dev:8546',
    ],
    slip44: 700,
  },
  {
    aliases: ['fantom', 'ftm'],
    chain: 'FTM',
    chainId: 250,
    explorers: [
      { name: 'ftmscan', standard: 'EIP3091', url: 'https://ftmscan.com' },
    ],
    infoURL: 'https://fantom.foundation',
    logoURL:
      'https://bafkreica3l2ne64fu74wdsu4a4mpsn5yshn7isybnwvruduxnkz6bbpb5i.ipfs.dweb.link',
    name: 'Fantom Opera',
    nativeCurrency: { decimals: 18, name: 'Fantom', symbol: 'FTM' },
    network: 'mainnet',
    rpc: ['https://rpc.ftm.tools'],
  },
  {
    aliases: ['avax', 'avalanche'],
    chain: 'AVAX',
    chainId: 43114,
    infoURL: 'https://cchain.explorer.avax.network/',
    logoURL:
      'https://bafkreihcnx7i6a3i44bqzcj6ogvlksthefftkal4q7gbbbudegalzxdap4.ipfs.dweb.link',
    name: 'Avalanche',
    nativeCurrency: { decimals: 18, name: 'Avalanche', symbol: 'AVAX' },
    network: 'mainnet',
    rpc: ['https://api.avax.network/ext/bc/C/rpc'],
  },
  {
    aliases: ['fuse'],
    chain: 'FUSE',
    chainId: 122,
    infoURL: 'https://fuse.io/',
    logoURL:
      'https://bafkreie5s2ig4odw3mvw3ovggughp7w6d3xjbxqefakj5fvzeo4rpeje5m.ipfs.dweb.link',
    name: 'Fuse',
    nativeCurrency: { decimals: 18, name: 'Fuse', symbol: 'FUSE' },
    network: 'mainnet',
    rpc: ['https://rpc.fuse.io'],
  },
  {
    aliases: ['huobi', 'eco'],
    chain: 'Heco',
    chainId: 128,
    explorers: [
      { name: 'hecoinfo', standard: 'EIP3091', url: 'https://hecoinfo.com' },
    ],
    infoURL: 'https://www.hecochain.com',
    logoURL:
      'https://bafkreibbuqctrcydn5ty3n6i7pblegqfxb2ep6vjejqlf3esqsrbispyuq.ipfs.dweb.link',
    name: 'Huobi ECO Chain',
    nativeCurrency: {
      decimals: 18,
      name: 'Huobi ECO Chain Native Token',
      symbol: 'HT',
    },
    network: 'mainnet',
    rpc: [
      'https://http-mainnet.hecochain.com',
      'wss://ws-mainnet.hecochain.com',
    ],
  },
  {
    aliases: ['xdai arbitrum'],
    chain: 'AOX',
    chainId: 200,
    explorers: [
      {
        name: 'blockscout',
        standard: 'EIP3091',
        url: 'https://blockscout.com/xdai/arbitrum',
      },
    ],
    infoURL: 'https://xdaichain.com',
    name: 'Arbitrum on xDai',
    nativeCurrency: { decimals: 18, name: 'xDAI', symbol: 'xDAI' },
    network: 'xdai',
    parent: { chain: 'eip155-100', type: 'L2' },
    rpc: ['https://arbitrum.xdaichain.com/'],
  },
  {
    aliases: ['klaytn', 'klaytn cypress'],
    chain: 'KLAY',
    chainId: 8217,
    infoURL: 'https://www.klaytn.com/',
    logoURL:
      'https://bafkreig7dsk3hnd7ml6cfq5ffgrt3eozisuasrama2x7b2cbuim5lucvoa.ipfs.dweb.link',
    name: 'Klaytn Cypress',
    nativeCurrency: { decimals: 18, name: 'KLAY', symbol: 'KLAY' },
    network: 'cypress',
    rpc: ['https://node-api.klaytnapi.com/v1/klaytn'],
    slip44: 8217,
  },
  {
    aliases: ['celo'],
    chain: 'CELO',
    chainId: 42220,
    infoURL: 'https://docs.celo.org/',
    logoURL:
      'https://bafkreidctyoxzh37mwc7g2hteapfh3ocomdphjkpf64n6kuqq5sakoveum.ipfs.dweb.link',
    name: 'Celo',
    nativeCurrency: { decimals: 18, name: 'CELO', symbol: 'CELO' },
    network: 'Mainnet',
    rpc: ['https://forno.celo.org', 'wss://forno.celo.org/ws'],
  },
  {
    aliases: ['okex'],
    chain: 'okexchain',
    chainId: 66,
    explorers: [
      {
        name: 'OKLink',
        standard: 'EIP3091',
        url: 'https://www.oklink.com/okexchain',
      },
    ],
    infoURL: 'https://www.okex.com/okexchain',
    logoURL:
      'https://bafkreidpeihzclobn5xinf7zfjcmheyohsv72nnys5kyd6oovtlpnotaru.ipfs.dweb.link',
    name: 'OKExChain',
    nativeCurrency: {
      decimals: 18,
      name: 'OKExChain Global Utility Token',
      symbol: 'OKT',
    },
    network: 'mainnet',
    rpc: ['https://exchainrpc.okex.org'],
  },
  {
    aliases: ['tomochain', 'tomo'],
    chain: 'TOMO',
    chainId: 88,
    infoURL: 'https://tomocoin.io',
    logoURL:
      'https://bafkreicjbvapqbs6r44rxb2lzhtqc7n6i67wvzn6gg5a6hfrneanwel5im.ipfs.dweb.link',
    name: 'TomoChain',
    nativeCurrency: { decimals: 18, name: 'TomoChain Ether', symbol: 'TOMO' },
    network: 'mainnet',
    rpc: ['https://rpc.tomochain.com'],
  },
  {
    aliases: ['callisto'],
    chain: 'CLO',
    chainId: 820,
    infoURL: 'https://callisto.network',
    logoURL:
      'https://bafkreiegobffux6t6l6bkbhl6y4bcnutwc2jby2dhgw5wwozwiqr2whpwe.ipfs.dweb.link',
    name: 'Callisto',
    nativeCurrency: { decimals: 18, name: 'Callisto Ether', symbol: 'CLO' },
    network: 'mainnet',
    rpc: ['https://clo-geth.0xinfra.com'],
    slip44: 820,
  },
  {
    aliases: ['clover'],
    chain: 'Clover',
    chainId: 1024,
    infoURL: 'https://clover.finance',
    logoURL:
      'https://bafkreiep5avqj5ls5iebj5v6zyhn56lmrkuxwy435iovmwxkob2xys6roq.ipfs.dweb.link',
    name: 'Clover',
    nativeCurrency: { decimals: 18, name: 'Clover', symbol: 'CLV' },
    network: 'clover mainnet',
    rpc: [
      'https://rpc-ivy.clover.finance',
      'https://rpc-ivy-2.clover.finance',
      'https://rpc-ivy-3.clover.finance',
    ],
  },
  {
    aliases: ['edgeware'],
    chain: 'EDG',
    chainId: 2021,
    infoURL: 'http://edgewa.re',
    logoURL:
      'https://bafkreibznduvl3upt3zpsivd66hfgdgy3m3h74tfmfvlhpa2vpd7ax3e5u.ipfs.dweb.link',
    name: 'Edgeware',
    nativeCurrency: { decimals: 18, name: 'Edge', symbol: 'EDG' },
    network: 'mainnet',
    rpc: ['https://mainnet1.edgewa.re'],
  },
  {
    aliases: ['near', 'aurora'],
    chain: 'NEAR',
    chainId: 1313161554,
    infoURL: 'https://aurora.dev',
    logoURL:
      'https://bafkreie2wmgm56ytj4vpgcknucoqc3dtlzvpr7pqpcj462nudu2w4czj7a.ipfs.dweb.link',
    name: 'Aurora',
    nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'aETH' },
    network: 'mainnet',
    rpc: ['https://rpc.mainnet.aurora.dev:8545'],
  },

  /// TESTNETS
  {
    aliases: ['ropsten'],
    chain: 'ETH',
    chainId: 3,
    ens: { registry: '0x112234455c3a32fd11230c42e7bccd4a84e02010' },
    explorers: [
      {
        name: 'etherscan-ropsten',
        standard: 'EIP3091',
        url: 'https://ropsten.etherscan.io',
      },
    ],
    faucets: ['https://faucet.ropsten.be?${ADDRESS}'],
    infoURL: 'https://github.com/ethereum/ropsten',
    name: 'Ropsten',
    nativeCurrency: { decimals: 18, name: 'Ropsten Ether', symbol: 'ETH' },
    network: 'ropsten',
    rpc: [
      'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'wss://ropsten.infura.io/ws/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    ],
  },
  {
    aliases: ['rinkeby'],
    chain: 'ETH',
    chainId: 4,
    ens: { registry: '0xe7410170f87102df0055eb195163a03b7f2bff4a' },
    explorers: [
      {
        name: 'etherscan-rinkeby',
        standard: 'EIP3091',
        url: 'https://rinkeby.etherscan.io',
      },
    ],
    faucets: ['https://faucet.rinkeby.io'],
    infoURL: 'https://www.rinkeby.io',
    name: 'Rinkeby',
    nativeCurrency: { decimals: 18, name: 'Rinkeby Ether', symbol: 'ETH' },
    network: 'rinkeby',
    rpc: [
      'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'wss://rinkeby.infura.io/ws/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    ],
  },
  {
    aliases: ['goerli'],
    chain: 'ETH',
    chainId: 5,
    ens: { registry: '0x112234455c3a32fd11230c42e7bccd4a84e02010' },
    faucets: [
      'https://goerli-faucet.slock.it/?address=${ADDRESS}',
      'https://faucet.goerli.mudit.blog',
    ],
    infoURL: 'https://goerli.net/#about',
    name: 'Görli',
    nativeCurrency: { decimals: 18, name: 'Görli Ether', symbol: 'ETH' },
    network: 'goerli',
    rpc: [
      'https://rpc.goerli.mudit.blog/',
      'https://rpc.slock.it/goerli ',
      'https://goerli.prylabs.net/',
    ],
  },
  {
    aliases: ['kovan'],
    chain: 'ETH',
    chainId: 42,
    faucets: [
      'https://faucet.kovan.network',
      'https://gitter.im/kovan-testnet/faucet',
    ],
    infoURL: 'https://kovan-testnet.github.io/website',
    name: 'Kovan',
    nativeCurrency: { decimals: 18, name: 'Kovan Ether', symbol: 'ETH' },
    network: 'kovan',
    rpc: [
      'https://kovan.poa.network',
      'http://kovan.poa.network:8545',
      'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'wss://kovan.infura.io/ws/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'ws://kovan.poa.network:8546',
    ],
  },
  /*   {
    name: 'Ontology',
    chain: 'Ontology',
    network: 'mainnet',
    rpc: [
      'https://dappnode1.ont.io:20339',
      'https://dappnode2.ont.io:20339',
      'https://dappnode3.ont.io:20339',
      'https://dappnode4.ont.io:20339'
    ],
    nativeCurrency: { name: 'ONG', symbol: 'ONG', decimals: 9 },
    infoURL: 'https://ont.io/',
    chainId: 58,
    explorers: [{ name: 'explorer', url: 'https://explorer.ont.io/', standard: 'EIP3091' }],
    aliases: ['ont', 'ontology']
  }, */
  {
    aliases: ['okex testnet', 'okex-testnet'],
    chain: 'okexchain',
    chainId: 65,
    explorers: [
      {
        name: 'OKLink',
        standard: 'EIP3091',
        url: 'https://www.oklink.com/okexchain-test',
      },
    ],
    faucets: ['https://www.okex.com/drawdex'],
    infoURL: 'https://www.okex.com/okexchain',
    name: 'OKExChain Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'OKExChain Global Utility Token in testnet',
      symbol: 'OKT',
    },
    network: 'testnet',
    rpc: ['https://exchaintestrpc.okex.org'],
  },
  {
    aliases: ['optimism kovan', 'optimism-testnet', 'optimism-kovan'],
    chain: 'ETH',
    chainId: 69,
    infoURL: 'https://optimism.io',
    name: 'Optimistic Kovan',
    nativeCurrency: { decimals: 18, name: 'Kovan Ether', symbol: 'KOR' },
    network: 'kovan',
    rpc: ['https://kovan.optimism.io/'],
  },
  {
    aliases: ['bsc testnet', 'chapel', 'binance testnet'],
    chain: 'BSC',
    chainId: 97,
    explorers: [
      {
        name: 'bscscan-testnet',
        standard: 'EIP3091',
        url: 'https://testnet.bscscan.com',
      },
    ],
    faucets: ['https://testnet.binance.org/faucet-smart'],
    infoURL: 'https://testnet.binance.org/',
    name: 'BSC Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Binance Chain Native Token',
      symbol: 'tBNB',
    },
    network: 'Chapel',
    rpc: [
      'https://data-seed-prebsc-1-s1.binance.org:8545',
      'https://data-seed-prebsc-2-s1.binance.org:8545',
      'https://data-seed-prebsc-1-s2.binance.org:8545',
      'https://data-seed-prebsc-2-s2.binance.org:8545',
      'https://data-seed-prebsc-1-s3.binance.org:8545',
      'https://data-seed-prebsc-2-s3.binance.org:8545',
    ],
  },

  {
    aliases: ['eco testnet', 'huobi testnet'],
    chain: 'Heco',
    chainId: 256,
    faucets: ['https://scan-testnet.hecochain.com/faucet'],
    infoURL: 'https://testnet.hecoinfo.com',
    name: 'Huobi ECO Chain Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Huobi ECO Chain Test Native Token',
      symbol: 'htt',
    },
    network: 'testnet',
    rpc: [
      'https://http-testnet.hecochain.com',
      'wss://ws-testnet.hecochain.com',
    ],
  },
  {
    aliases: ['optimism goerli'],
    chain: 'ETH',
    chainId: 420,
    infoURL: 'https://optimism.io',
    name: 'Optimistic Goerli',
    nativeCurrency: { decimals: 18, name: 'Görli Ether', symbol: 'GOR' },
    network: 'goerli',
    rpc: ['https://goerli.optimism.io/'],
  },
  {
    aliases: ['klaytn testnet', 'klaytn baobab'],
    chain: 'KLAY',
    chainId: 1001,
    faucets: ['https://baobab.wallet.klaytn.com/access?next=faucet'],
    infoURL: 'https://www.klaytn.com/',
    name: 'Klaytn Baobab',
    nativeCurrency: { decimals: 18, name: 'KLAY', symbol: 'KLAY' },
    network: 'baobab',
    rpc: ['https://node-api.klaytnapi.com/v1/klaytn'],
  },
  {
    aliases: ['ontology testnet'],
    chain: 'Ontology',
    chainId: 5851,
    explorers: [
      {
        name: 'explorer',
        standard: 'EIP3091',
        url: 'https://explorer.ont.io/testnet',
      },
    ],
    faucets: ['https://developer.ont.io/'],
    infoURL: 'https://ont.io/',
    name: 'Ontology Testnet',
    nativeCurrency: { decimals: 9, name: 'ONG', symbol: 'ONG' },
    network: 'testnet',
    rpc: [
      'https://polaris1.ont.io:20339',
      'https://polaris2.ont.io:20339',
      'https://polaris3.ont.io:20339',
      'https://polaris4.ont.io:20339',
    ],
  },

  {
    aliases: [
      'avax testnet',
      'avalanche testnet',
      'avax fuji',
      'avalanche fuji',
      'fuji',
      'fuji testnet',
    ],
    chain: 'AVAX',
    chainId: 43113,
    faucets: ['https://faucet.avax-test.network/'],
    infoURL: 'https://cchain.explorer.avax-test.network',
    name: 'Avalanche Fuji Testnet',
    nativeCurrency: { decimals: 18, name: 'Avalanche', symbol: 'AVAX' },
    network: 'testnet',
    rpc: ['https://api.avax-test.network/ext/bc/C/rpc'],
  },
  {
    aliases: ['celo testnet', 'celo alfajores'],
    chain: 'CELO',
    chainId: 44787,
    faucets: [
      'https://celo.org/developers/faucet',
      'https://cauldron.pretoriaresearchlab.io/alfajores-faucet',
    ],
    infoURL: 'https://docs.celo.org/',
    name: 'Celo Alfajores Testnet',
    nativeCurrency: { decimals: 18, name: 'CELO', symbol: 'CELO' },
    network: 'Alfajores',
    rpc: [
      'https://alfajores-forno.celo-testnet.org',
      'wss://alfajores-forno.celo-testnet.org/ws',
    ],
  },
  {
    aliases: ['celo testnet', 'celo baklava'],
    chain: 'CELO',
    chainId: 62320,
    faucets: [
      'https://docs.google.com/forms/d/e/1FAIpQLSdfr1BwUTYepVmmvfVUDRCwALejZ-TUva2YujNpvrEmPAX2pg/viewform',
      'https://cauldron.pretoriaresearchlab.io/baklava-faucet',
    ],
    infoURL: 'https://docs.celo.org/',
    name: 'Celo Baklava Testnet',
    nativeCurrency: { decimals: 18, name: 'CELO', symbol: 'CELO' },
    network: 'Baklava',
    rpc: ['https://baklava-forno.celo-testnet.org'],
  },
  {
    aliases: ['matic testnet', 'polygon testnet', 'mumbai'],
    chain: 'Polygon',
    chainId: 80001,
    explorers: [
      {
        name: 'polygonscan',
        standard: 'EIP3091',
        url: 'https://mumbai.polygonscan.com/',
      },
    ],
    faucets: ['https://faucet.matic.network/'],
    infoURL: 'https://matic.network/',
    name: 'Polygon Testnet Mumbai',
    nativeCurrency: { decimals: 18, name: 'Matic', symbol: 'tMATIC' },
    network: 'testnet',
    rpc: ['https://rpc-mumbai.matic.today', 'wss://ws-mumbai.matic.today'],
  },
  {
    aliases: [
      'arb testnet',
      'arbitrum testnet',
      'arb rinkeby',
      'arbitrum rinkeby',
    ],
    chain: 'ETH',
    chainId: 421611,
    explorers: [
      {
        name: 'arbitrum-rinkeby',
        standard: 'EIP3091',
        url: 'https://rinkeby-explorer.arbitrum.io',
      },
    ],
    infoURL: 'https://arbitrum.io',
    name: 'Arbitrum Testnet Rinkeby',
    nativeCurrency: {
      decimals: 18,
      name: 'Arbitrum Rinkeby Ether',
      symbol: 'ARETH',
    },
    network: 'rinkeby',
    rpc: ['https://rinkeby.arbitrum.io/rpc', 'wss://rinkeby.arbitrum.io/ws'],
  },
  {
    aliases: ['near testnet', 'aurora testnet'],
    chain: 'NEAR',
    chainId: 1313161555,
    infoURL: 'https://aurora.dev',
    name: 'Aurora TestNet',
    nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'aETH' },
    network: 'testnet',
    rpc: ['https://rpc.testnet.aurora.dev:8545'],
  },
];
