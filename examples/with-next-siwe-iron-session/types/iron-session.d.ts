import 'iron-session';
import { type Address } from 'viem';

declare module 'iron-session' {
  interface IronSessionData {
    nonce?: string;
    siwe?: { address: Address };
  }
}
