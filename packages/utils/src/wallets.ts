export const getWalletInfo = (name: string) => {
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
        logoURI: 'https://bafkreiext3sw6h2iwayx24xe6fnvnhm5ueewdiq3eyiambugpgspiigtvi.ipfs.dweb.link'
      }
  }
}
