import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { SiweMessage } from 'siwe';
import { ironOptions } from './../../lib/iron';
import { Address, publicActions } from 'viem';
import { wagmiConfig } from '../_app';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { message, signature } = req.body;
        const siweMessage = new SiweMessage(message);

        const wagmiClient = wagmiConfig.getClient().extend(publicActions);

        const isValid = await wagmiClient.verifyMessage({
          address: siweMessage.address as Address,
          signature,
          message: siweMessage.prepareMessage(),
        });

        if (!isValid) {
          throw new Error('Invalid message');
        }

        req.session.siwe = siweMessage;
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
