export type Chain = {
  name: string
  chain: string
  network: string
  rpc: string[]
  nativeCurrency: { name: string; symbol: string; decimals: number }
  infoURL: string
  chainId: number
  ens?: { registry: string }
  explorers?: { name: string; url: string; standard: string }[]
  aliases: string[]
  logoURL?: string
  slip44?: number
  faucets?: string[]
  parent?: { chain: string; type: string }
}

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
  GOERLI = 5
}

export const chains: Chain[] = [
  {
    name: 'Ethereum',
    chain: 'ETH',
    network: 'mainnet',

    rpc: [
      'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'wss://mainnet.infura.io/ws/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'https://api.mycryptoapi.com/eth',
      'https://cloudflare-eth.com'
    ],
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    infoURL: 'https://ethereum.org',
    chainId: 1,
    slip44: 60,
    ens: { registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' },
    explorers: [{ name: 'etherscan', url: 'https://etherscan.io', standard: 'EIP3091' }],
    aliases: ['ethereum', 'mainnet', 'homestead'],
    logoURL: 'https://ipfs.io/ipfs/QmU1rGfe87iNEC1rComqCREDT9hX86TiysU3mqJ5iSFb6i'
  },
  {
    name: 'Optimism',
    chain: 'ETH',
    network: 'mainnet',
    rpc: ['https://mainnet.optimism.io/'],
    nativeCurrency: { name: 'Ether', symbol: 'OETH', decimals: 18 },
    infoURL: 'https://optimism.io',
    chainId: 10,
    aliases: ['optimism'],
    logoURL: 'https://ipfs.io/ipfs/bafkreieyg2v6gxaaascecc2chrxwg26fvteyrwktf7epir7acdhkncxtrm'
  },
  {
    name: 'Arbitrum',
    chainId: 42161,
    chain: 'ETH',
    network: 'mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'AETH', decimals: 18 },
    rpc: [
      'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
      'https://arb1.arbitrum.io/rpc',
      'wss://arb1.arbitrum.io/ws'
    ],
    explorers: [
      { name: 'Arbiscan', url: 'https://arbiscan.io', standard: 'EIP3091' },
      { name: 'Arbitrum Explorer', url: 'https://explorer.arbitrum.io', standard: 'EIP3091' }
    ],
    infoURL: 'https://arbitrum.io',
    aliases: ['arbitrum'],
    logoURL: 'https://ipfs.io/ipfs/bafkreicg6e4twffmbrhfoq4bl7tfdkqgeew4pnd5h5lxsgvzckrosg3cra'
  },
  {
    name: 'Binance Smart Chain',
    chain: 'BSC',
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
      'wss://bsc-ws-node.nariox.org'
    ],
    nativeCurrency: { name: 'Binance Chain Native Token', symbol: 'BNB', decimals: 18 },
    infoURL: 'https://www.binance.org',
    chainId: 56,
    explorers: [{ name: 'bscscan', url: 'https://bscscan.com', standard: 'EIP3091' }],
    aliases: ['bsc', 'binance'],
    logoURL: 'https://bafkreia6gq4i4jlaouenm6mnl4xpohufbxlmbf7nhhebu3cacbmukljrsi.ipfs.dweb.link'
  },
  {
    name: 'Polygon',
    chain: 'Polygon',
    network: 'mainnet',
    rpc: [
      'https://rpc-mainnet.matic.network',
      'wss://ws-mainnet.matic.network',
      'https://rpc-mainnet.matic.quiknode.pro',
      'https://matic-mainnet.chainstacklabs.com'
    ],
    nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
    infoURL: 'https://matic.network/',
    chainId: 137,
    explorers: [{ name: 'polygonscan', url: 'https://polygonscan.com', standard: 'EIP3091' }],
    aliases: ['polygon', 'matic'],
    logoURL: 'https://ipfs.io/ipfs/bafkreidhxhnuwatm7xoiwuniiwycewblmxiu65dkklt3t3fwtx2eumbswu'
  },
  {
    name: 'xDAI',
    chain: 'XDAI',
    network: 'mainnet',
    rpc: [
      'https://rpc.xdaichain.com',
      'https://xdai.poanetwork.dev',
      'wss://rpc.xdaichain.com/wss',
      'wss://xdai.poanetwork.dev/wss',
      'http://xdai.poanetwork.dev',
      'https://dai.poa.network',
      'ws://xdai.poanetwork.dev:8546'
    ],
    nativeCurrency: { name: 'xDAI', symbol: 'xDAI', decimals: 18 },
    infoURL: 'https://forum.poa.network/c/xdai-chain',
    chainId: 100,
    slip44: 700,
    aliases: ['xdai'],
    logoURL: 'https://ipfs.io/ipfs/QmZAKjCruRsqE3njkbEZqNfKeKoD4w389UeYK4L751hcJy'
  },
  {
    name: 'Fantom Opera',
    chain: 'FTM',
    network: 'mainnet',
    rpc: ['https://rpc.ftm.tools'],
    nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
    infoURL: 'https://fantom.foundation',
    chainId: 250,
    explorers: [{ name: 'ftmscan', url: 'https://ftmscan.com', standard: 'EIP3091' }],
    aliases: ['fantom', 'ftm'],
    logoURL: 'https://bafkreica3l2ne64fu74wdsu4a4mpsn5yshn7isybnwvruduxnkz6bbpb5i.ipfs.dweb.link'
  },
  {
    name: 'Avalanche',
    chain: 'AVAX',
    network: 'mainnet',
    rpc: ['https://api.avax.network/ext/bc/C/rpc'],
    nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
    infoURL: 'https://cchain.explorer.avax.network/',
    chainId: 43114,
    aliases: ['avax', 'avalanche'],
    logoURL: 'https://bafkreihcnx7i6a3i44bqzcj6ogvlksthefftkal4q7gbbbudegalzxdap4.ipfs.dweb.link'
  },
  {
    name: 'Fuse',
    chain: 'FUSE',
    network: 'mainnet',
    rpc: ['https://rpc.fuse.io'],
    nativeCurrency: { name: 'Fuse', symbol: 'FUSE', decimals: 18 },
    infoURL: 'https://fuse.io/',
    chainId: 122,
    aliases: ['fuse'],
    logoURL: 'https://bafkreie5s2ig4odw3mvw3ovggughp7w6d3xjbxqefakj5fvzeo4rpeje5m.ipfs.dweb.link'
  },
  {
    name: 'Huobi ECO Chain',
    chain: 'Heco',
    network: 'mainnet',
    rpc: ['https://http-mainnet.hecochain.com', 'wss://ws-mainnet.hecochain.com'],
    nativeCurrency: { name: 'Huobi ECO Chain Native Token', symbol: 'HT', decimals: 18 },
    infoURL: 'https://www.hecochain.com',
    chainId: 128,
    explorers: [{ name: 'hecoinfo', url: 'https://hecoinfo.com', standard: 'EIP3091' }],
    aliases: ['huobi', 'eco'],
    logoURL: 'https://bafkreibbuqctrcydn5ty3n6i7pblegqfxb2ep6vjejqlf3esqsrbispyuq.ipfs.dweb.link'
  },
  {
    name: 'Arbitrum on xDai',
    chain: 'AOX',
    network: 'xdai',
    rpc: ['https://arbitrum.xdaichain.com/'],
    nativeCurrency: { name: 'xDAI', symbol: 'xDAI', decimals: 18 },
    infoURL: 'https://xdaichain.com',
    chainId: 200,
    explorers: [{ name: 'blockscout', url: 'https://blockscout.com/xdai/arbitrum', standard: 'EIP3091' }],
    parent: { chain: 'eip155-100', type: 'L2' },
    aliases: ['xdai arbitrum']
  },
  {
    name: 'Klaytn Cypress',
    chain: 'KLAY',
    network: 'cypress',
    rpc: ['https://node-api.klaytnapi.com/v1/klaytn'],
    nativeCurrency: { name: 'KLAY', symbol: 'KLAY', decimals: 18 },
    infoURL: 'https://www.klaytn.com/',
    chainId: 8217,
    slip44: 8217,
    aliases: ['klaytn', 'klaytn cypress'],
    logoURL: 'https://bafkreig7dsk3hnd7ml6cfq5ffgrt3eozisuasrama2x7b2cbuim5lucvoa.ipfs.dweb.link'
  },
  {
    name: 'Celo',
    chainId: 42220,
    chain: 'CELO',
    network: 'Mainnet',
    nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
    rpc: ['https://forno.celo.org', 'wss://forno.celo.org/ws'],
    infoURL: 'https://docs.celo.org/',
    aliases: ['celo'],
    logoURL: 'https://bafkreidctyoxzh37mwc7g2hteapfh3ocomdphjkpf64n6kuqq5sakoveum.ipfs.dweb.link'
  },
  {
    name: 'OKExChain',
    chain: 'okexchain',
    network: 'mainnet',
    rpc: ['https://exchainrpc.okex.org'],
    nativeCurrency: { name: 'OKExChain Global Utility Token', symbol: 'OKT', decimals: 18 },
    infoURL: 'https://www.okex.com/okexchain',
    chainId: 66,
    explorers: [{ name: 'OKLink', url: 'https://www.oklink.com/okexchain', standard: 'EIP3091' }],
    aliases: ['okex'],
    logoURL: 'https://bafkreidpeihzclobn5xinf7zfjcmheyohsv72nnys5kyd6oovtlpnotaru.ipfs.dweb.link'
  },
  {
    name: 'TomoChain',
    chain: 'TOMO',
    network: 'mainnet',
    rpc: ['https://rpc.tomochain.com'],
    nativeCurrency: { name: 'TomoChain Ether', symbol: 'TOMO', decimals: 18 },
    infoURL: 'https://tomocoin.io',
    chainId: 88,
    aliases: ['tomochain', 'tomo'],
    logoURL: 'https://bafkreicjbvapqbs6r44rxb2lzhtqc7n6i67wvzn6gg5a6hfrneanwel5im.ipfs.dweb.link'
  },
  {
    name: 'Callisto',
    chain: 'CLO',
    network: 'mainnet',
    rpc: ['https://clo-geth.0xinfra.com'],
    nativeCurrency: { name: 'Callisto Ether', symbol: 'CLO', decimals: 18 },
    infoURL: 'https://callisto.network',
    chainId: 820,
    slip44: 820,
    aliases: ['callisto'],
    logoURL: 'https://bafkreiegobffux6t6l6bkbhl6y4bcnutwc2jby2dhgw5wwozwiqr2whpwe.ipfs.dweb.link'
  },
  {
    name: 'Clover',
    chain: 'Clover',
    network: 'clover mainnet',
    rpc: ['https://rpc-ivy.clover.finance', 'https://rpc-ivy-2.clover.finance', 'https://rpc-ivy-3.clover.finance'],
    nativeCurrency: { name: 'Clover', symbol: 'CLV', decimals: 18 },
    infoURL: 'https://clover.finance',
    chainId: 1024,
    aliases: ['clover'],
    logoURL: 'https://bafkreiep5avqj5ls5iebj5v6zyhn56lmrkuxwy435iovmwxkob2xys6roq.ipfs.dweb.link'
  },
  {
    name: 'Edgeware',
    chain: 'EDG',
    network: 'mainnet',
    rpc: ['https://mainnet1.edgewa.re'],
    nativeCurrency: { name: 'Edge', symbol: 'EDG', decimals: 18 },
    infoURL: 'http://edgewa.re',
    chainId: 2021,
    aliases: ['edgeware'],
    logoURL: 'https://bafkreibznduvl3upt3zpsivd66hfgdgy3m3h74tfmfvlhpa2vpd7ax3e5u.ipfs.dweb.link'
  },
  {
    name: 'Aurora',
    chain: 'NEAR',
    network: 'mainnet',
    rpc: ['https://rpc.mainnet.aurora.dev:8545'],
    nativeCurrency: { name: 'Ether', symbol: 'aETH', decimals: 18 },
    infoURL: 'https://aurora.dev',
    chainId: 1313161554,
    aliases: ['near', 'aurora'],
    logoURL: 'https://bafkreie2wmgm56ytj4vpgcknucoqc3dtlzvpr7pqpcj462nudu2w4czj7a.ipfs.dweb.link'
  },

  /// TESTNETS
  {
    name: 'Ropsten',
    chain: 'ETH',
    network: 'ropsten',
    rpc: [
      'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'wss://ropsten.infura.io/ws/v3/9aa3d95b3bc440fa88ea12eaa4456161'
    ],
    faucets: ['https://faucet.ropsten.be?${ADDRESS}'],
    nativeCurrency: { name: 'Ropsten Ether', symbol: 'ETH', decimals: 18 },
    infoURL: 'https://github.com/ethereum/ropsten',
    chainId: 3,
    ens: { registry: '0x112234455c3a32fd11230c42e7bccd4a84e02010' },
    aliases: ['ropsten'],
    explorers: [{ name: 'etherscan-ropsten', url: 'https://ropsten.etherscan.io', standard: 'EIP3091' }]
  },
  {
    name: 'Rinkeby',
    chain: 'ETH',
    network: 'rinkeby',
    rpc: [
      'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'wss://rinkeby.infura.io/ws/v3/9aa3d95b3bc440fa88ea12eaa4456161'
    ],
    faucets: ['https://faucet.rinkeby.io'],
    nativeCurrency: { name: 'Rinkeby Ether', symbol: 'ETH', decimals: 18 },
    infoURL: 'https://www.rinkeby.io',
    chainId: 4,
    ens: { registry: '0xe7410170f87102df0055eb195163a03b7f2bff4a' },
    explorers: [{ name: 'etherscan-rinkeby', url: 'https://rinkeby.etherscan.io', standard: 'EIP3091' }],
    aliases: ['rinkeby']
  },
  {
    name: 'Görli',
    chain: 'ETH',
    network: 'goerli',
    rpc: ['https://rpc.goerli.mudit.blog/', 'https://rpc.slock.it/goerli ', 'https://goerli.prylabs.net/'],
    faucets: ['https://goerli-faucet.slock.it/?address=${ADDRESS}', 'https://faucet.goerli.mudit.blog'],
    nativeCurrency: { name: 'Görli Ether', symbol: 'ETH', decimals: 18 },
    infoURL: 'https://goerli.net/#about',
    chainId: 5,
    ens: { registry: '0x112234455c3a32fd11230c42e7bccd4a84e02010' },
    aliases: ['goerli']
  },
  {
    name: 'Kovan',
    chain: 'ETH',
    network: 'kovan',
    rpc: [
      'https://kovan.poa.network',
      'http://kovan.poa.network:8545',
      'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'wss://kovan.infura.io/ws/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'ws://kovan.poa.network:8546'
    ],
    faucets: ['https://faucet.kovan.network', 'https://gitter.im/kovan-testnet/faucet'],
    nativeCurrency: { name: 'Kovan Ether', symbol: 'ETH', decimals: 18 },
    infoURL: 'https://kovan-testnet.github.io/website',
    chainId: 42,
    aliases: ['kovan']
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
    name: 'OKExChain Testnet',
    chain: 'okexchain',
    network: 'testnet',
    rpc: ['https://exchaintestrpc.okex.org'],
    faucets: ['https://www.okex.com/drawdex'],
    nativeCurrency: { name: 'OKExChain Global Utility Token in testnet', symbol: 'OKT', decimals: 18 },
    infoURL: 'https://www.okex.com/okexchain',
    chainId: 65,
    explorers: [{ name: 'OKLink', url: 'https://www.oklink.com/okexchain-test', standard: 'EIP3091' }],
    aliases: ['okex testnet', 'okex-testnet']
  },
  {
    name: 'Optimistic Kovan',
    chain: 'ETH',
    network: 'kovan',
    rpc: ['https://kovan.optimism.io/'],
    nativeCurrency: { name: 'Kovan Ether', symbol: 'KOR', decimals: 18 },
    infoURL: 'https://optimism.io',
    chainId: 69,
    aliases: ['optimism kovan', 'optimism-testnet', 'optimism-kovan']
  },
  {
    name: 'BSC Testnet',
    chain: 'BSC',
    network: 'Chapel',
    rpc: [
      'https://data-seed-prebsc-1-s1.binance.org:8545',
      'https://data-seed-prebsc-2-s1.binance.org:8545',
      'https://data-seed-prebsc-1-s2.binance.org:8545',
      'https://data-seed-prebsc-2-s2.binance.org:8545',
      'https://data-seed-prebsc-1-s3.binance.org:8545',
      'https://data-seed-prebsc-2-s3.binance.org:8545'
    ],
    faucets: ['https://testnet.binance.org/faucet-smart'],
    nativeCurrency: { name: 'Binance Chain Native Token', symbol: 'tBNB', decimals: 18 },
    infoURL: 'https://testnet.binance.org/',
    chainId: 97,
    explorers: [{ name: 'bscscan-testnet', url: 'https://testnet.bscscan.com', standard: 'EIP3091' }],
    aliases: ['bsc testnet', 'chapel', 'binance testnet']
  },

  {
    name: 'Huobi ECO Chain Testnet',
    chain: 'Heco',
    network: 'testnet',
    rpc: ['https://http-testnet.hecochain.com', 'wss://ws-testnet.hecochain.com'],
    faucets: ['https://scan-testnet.hecochain.com/faucet'],
    nativeCurrency: { name: 'Huobi ECO Chain Test Native Token', symbol: 'htt', decimals: 18 },
    infoURL: 'https://testnet.hecoinfo.com',
    chainId: 256,
    aliases: ['eco testnet', 'huobi testnet']
  },
  {
    name: 'Optimistic Goerli',
    chain: 'ETH',
    network: 'goerli',
    rpc: ['https://goerli.optimism.io/'],
    nativeCurrency: { name: 'Görli Ether', symbol: 'GOR', decimals: 18 },
    infoURL: 'https://optimism.io',
    chainId: 420,
    aliases: ['optimism goerli']
  },
  {
    name: 'Klaytn Baobab',
    chain: 'KLAY',
    network: 'baobab',
    rpc: ['https://node-api.klaytnapi.com/v1/klaytn'],
    faucets: ['https://baobab.wallet.klaytn.com/access?next=faucet'],
    nativeCurrency: { name: 'KLAY', symbol: 'KLAY', decimals: 18 },
    infoURL: 'https://www.klaytn.com/',
    chainId: 1001,
    aliases: ['klaytn testnet', 'klaytn baobab']
  },
  {
    name: 'Ontology Testnet',
    chain: 'Ontology',
    network: 'testnet',
    rpc: [
      'https://polaris1.ont.io:20339',
      'https://polaris2.ont.io:20339',
      'https://polaris3.ont.io:20339',
      'https://polaris4.ont.io:20339'
    ],
    faucets: ['https://developer.ont.io/'],
    nativeCurrency: { name: 'ONG', symbol: 'ONG', decimals: 9 },
    infoURL: 'https://ont.io/',
    chainId: 5851,
    explorers: [{ name: 'explorer', url: 'https://explorer.ont.io/testnet', standard: 'EIP3091' }],
    aliases: ['ontology testnet']
  },

  {
    name: 'Avalanche Fuji Testnet',
    chain: 'AVAX',
    network: 'testnet',
    rpc: ['https://api.avax-test.network/ext/bc/C/rpc'],
    faucets: ['https://faucet.avax-test.network/'],
    nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
    infoURL: 'https://cchain.explorer.avax-test.network',
    chainId: 43113,
    aliases: ['avax testnet', 'avalanche testnet', 'avax fuji', 'avalanche fuji']
  },
  {
    name: 'Celo Alfajores Testnet',
    chainId: 44787,
    chain: 'CELO',
    network: 'Alfajores',
    nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
    rpc: ['https://alfajores-forno.celo-testnet.org', 'wss://alfajores-forno.celo-testnet.org/ws'],
    faucets: ['https://celo.org/developers/faucet', 'https://cauldron.pretoriaresearchlab.io/alfajores-faucet'],
    infoURL: 'https://docs.celo.org/',
    aliases: ['celo testnet', 'celo alfajores']
  },
  {
    name: 'Celo Baklava Testnet',
    chainId: 62320,
    chain: 'CELO',
    network: 'Baklava',
    nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
    rpc: ['https://baklava-forno.celo-testnet.org'],
    faucets: [
      'https://docs.google.com/forms/d/e/1FAIpQLSdfr1BwUTYepVmmvfVUDRCwALejZ-TUva2YujNpvrEmPAX2pg/viewform',
      'https://cauldron.pretoriaresearchlab.io/baklava-faucet'
    ],
    infoURL: 'https://docs.celo.org/',
    aliases: ['celo testnet', 'celo baklava']
  },
  {
    name: 'Polygon Testnet Mumbai',
    chain: 'Polygon',
    network: 'testnet',
    rpc: ['https://rpc-mumbai.matic.today', 'wss://ws-mumbai.matic.today'],
    faucets: ['https://faucet.matic.network/'],
    nativeCurrency: { name: 'Matic', symbol: 'tMATIC', decimals: 18 },
    infoURL: 'https://matic.network/',
    chainId: 80001,
    explorers: [{ name: 'polygonscan', url: 'https://mumbai.polygonscan.com/', standard: 'EIP3091' }],
    aliases: ['matic testnet', 'polygon testnet', 'mumbai']
  },
  {
    name: 'Arbitrum Testnet Rinkeby',
    chainId: 421611,
    chain: 'ETH',
    network: 'rinkeby',
    nativeCurrency: { name: 'Arbitrum Rinkeby Ether', symbol: 'ARETH', decimals: 18 },
    rpc: ['https://rinkeby.arbitrum.io/rpc', 'wss://rinkeby.arbitrum.io/ws'],
    infoURL: 'https://arbitrum.io',
    explorers: [{ name: 'arbitrum-rinkeby', url: 'https://rinkeby-explorer.arbitrum.io', standard: 'EIP3091' }],
    aliases: ['arb testnet', 'arbitrum testnet', 'arb rinkeby', 'arbitrum rinkeby']
  },
  {
    name: 'Aurora TestNet',
    chain: 'NEAR',
    network: 'testnet',
    rpc: ['https://rpc.testnet.aurora.dev:8545'],
    nativeCurrency: { name: 'Ether', symbol: 'aETH', decimals: 18 },
    infoURL: 'https://aurora.dev',
    chainId: 1313161555,
    aliases: ['near testnet', 'aurora testnet']
  }
]
