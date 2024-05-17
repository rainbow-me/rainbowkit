import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { SiweMessage } from 'siwe';
import { ironOptions } from './../../lib/iron';
import { publicActions } from 'viem';
import { wagmiConfig } from '../_app';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { message, signature, address } = req.body;
        const siweMessage = new SiweMessage(message);
 
        const valid = await wagmiConfig
          .getClient()
          .extend(publicActions)
          .verifyMessage({
            address,
            signature,
            message: siweMessage.prepareMessage(),
          });

        if (!valid) throw { message: "Invalid signature" };

        await req.session.save();
        res.json({ ok: true });
      } catch (_error) {
        res.json({ ok: false });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
