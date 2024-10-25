import 'iron-session';
import type { SiweMessage } from 'viem/siwe';

declare module 'iron-session' {
  interface IronSessionData {
    nonce?: string;
    siwe?: SiweMessage;
  }
}
