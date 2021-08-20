/**
 *
 * @param mod in PascalCase
 * @returns
 */
export const importConnector = async (mod: string): Promise<any> =>
  import(`@web3-react/${mod.toLowerCase()}-connector/dist/${mod.toLowerCase()}-connector.esm.js`).then(
    (x) => x[`${mod}Connector`]
  )
