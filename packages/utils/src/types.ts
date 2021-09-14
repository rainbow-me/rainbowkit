export type Wallet = { name: string; hidden?: boolean; options?: Record<string, any> }

export type TxHistoryFetcher<Tx extends any = any, P extends any = any, O extends any = any> = (opts: {
  address: string
  provider: P
  options?: O
}) => Promise<Tx[]>
