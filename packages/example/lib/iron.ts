import { IronSessionOptions } from 'iron-session';

export const ironOptions: IronSessionOptions = {
  cookieName: 'siwe',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  password: process.env.NEXT_IRON_PASSWORD as string,
};
