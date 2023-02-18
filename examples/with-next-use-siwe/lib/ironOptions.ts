import { IronSessionOptions } from 'iron-session';

if (!process.env.IRON_SESSION_PASSWORD)
  throw new Error('IRON_SESSION_PASSWORD must be set');

const ironOptions: IronSessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD,
  cookieName: 'session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    address?: string | undefined;
    nonce?: string | undefined;
  }
}

export default ironOptions;
