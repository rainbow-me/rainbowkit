import { Dispatch } from 'react'

export type Chain = string | number

export type Wallet = { name: string; hidden?: boolean; options?: Record<string, any> }
