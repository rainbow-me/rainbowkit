export const importConnector = async (mod: string): Promise<any> =>
  import(`@web3-react/${mod}-connector/dist/${mod}-connector.esm.js`).then(
    (x) => x[`${mod.charAt(0).toUpperCase() + mod.slice(1)}Connector`]
  )
