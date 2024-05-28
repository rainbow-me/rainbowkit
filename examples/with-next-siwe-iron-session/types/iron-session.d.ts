import 'iron-session';
import { Address } from 'viem';

declare module 'iron-session' {
  interface IronSessionData {
    nonce?: string;
    siwe?: { address: Address };
  }
}
