export const getWalletInfo = (name: string): { name: string; logoURI: string } => {
  switch (name) {
    case 'metamask':
      return {
        name: 'MetaMask',
        logoURI: 'https://bafkreig23o6p5exkyrbhxveqap3krzeinisknloocwc5uijq6wrtrlpl3e.ipfs.dweb.link'
      }
    case 'coinbase':
    case 'walletlink':
      return {
        name: 'Coinbase',
        logoURI: 'https://bafkreihl4wmkbzm44mxu33mbuy3hcrc5g6wmi32ns3y3gfwme6w2hcbdy4.ipfs.dweb.link'
      }
    case 'frame':
      return {
        name: 'Frame',
        logoURI: 'https://bafkreihgrm4ebmo7ybe6vzzhwgdpiv6t4jrljl5t7y7n3keyq6n6susvra.ipfs.dweb.link'
      }
    case 'torus':
      return {
        name: 'Torus',
        logoURI: 'https://bafkreiao4cnnidbqblkmd2xfb2akutm2bjdr5r4xnbuwumzhda3ikxyb7a.ipfs.dweb.link'
      }
    case 'rainbow':
      return {
        name: 'Rainbow',
        logoURI: 'https://bafkreico3pudvsd4j6emdtq4pmyfaat34reoebxyei7tvlpzp5hnec24qa.ipfs.dweb.link'
      }
    case 'trust':
      return {
        name: 'Trust',
        logoURI: 'https://bafkreiaa457sqcvunki6x7uydyjmniox22vclagwqda5qbskwd27to32aq.ipfs.dweb.link'
      }
    case 'gnosis':
      return {
        name: 'Gnosis',
        logoURI: 'https://bafkreifsbu7uy4m25t5hty27x7nfrz3ot3wcvlnqwfujom7ax6qmixgciu.ipfs.dweb.link'
      }
    case 'argent':
      return {
        name: 'Argent',
        logoURI: 'https://bafkreic5w3umuv7hz7drgyp6ymmpiqre4cnd36ftsutrrazgrecpvo5rgq.ipfs.dweb.link'
      }
  }
}
